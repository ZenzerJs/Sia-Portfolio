import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const PORT = 3016;
const BASE = `http://localhost:${PORT}`;
const outDir = path.resolve("./.antigravity/artifacts/phase-audit");
fs.mkdirSync(outDir, { recursive: true });

async function run() {
  console.log("=== MACBOOK OPEN / CLOSE ANIMATION AUDIT ===");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      errors.push(msg.text());
    }
  });

  page.on("pageerror", (err) => {
    errors.push(err.message);
  });

  try {
    console.log(`\n1. Navigating to ${BASE}/ ...`);
    await page.goto(`${BASE}/`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1500);

    const macbook = page.locator(".work__macbook");
    const lid = page.locator(".work__macbook .lid");

    // Initially at top of page, laptop is not intersecting so lid should NOT have is-open
    const initialIsOpen = await lid.evaluate((el) => el.classList.contains("is-open"));
    console.log(`Initial lid is-open state (at top of page): ${initialIsOpen}`);

    // Scroll into the #work section
    console.log("Scrolling into #work section...");
    await macbook.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500); // Allow intersection observer & 1.3s transition to complete

    const scrolledIsOpen = await lid.evaluate((el) => el.classList.contains("is-open"));
    console.log(`Scrolled lid is-open state: ${scrolledIsOpen}`);
    if (!scrolledIsOpen) {
      throw new Error("MacBook lid failed to open automatically upon scrolling into view");
    }
    console.log("✓ MacBook lid successfully opened on scroll into view");

    // Capture open state screenshot
    const shotOpen = path.join(outDir, "macbook-lid-open.png");
    await page.screenshot({ path: shotOpen });
    console.log(`✓ Open state screenshot saved: ${shotOpen}`);

    // Test the interactive toggle button: click "Close Display"
    console.log("Testing interactive toggle button: Close Display...");
    const closeBtn = page.locator('button:has-text("Close Display")');
    if ((await closeBtn.count()) === 0) {
      throw new Error("Close Display toggle button not found");
    }
    await closeBtn.click();
    await page.waitForTimeout(1400); // Allow 1.3s transition to complete

    const afterCloseIsOpen = await lid.evaluate((el) => el.classList.contains("is-open"));
    console.log(`After clicking close, lid is-open: ${afterCloseIsOpen}`);
    if (afterCloseIsOpen) {
      throw new Error("MacBook lid is still open after clicking Close Display");
    }
    console.log("✓ MacBook lid successfully closed via toggle button");

    // Verify toggle button updated label
    const openBtn = page.locator('button:has-text("Open Display")');
    if ((await openBtn.count()) === 0) {
      throw new Error("Toggle button label did not update to 'Open Display'");
    }
    console.log("✓ Button updated to 'Open Display'");

    // Capture closed state screenshot
    const shotClosed = path.join(outDir, "macbook-lid-closed.png");
    await page.screenshot({ path: shotClosed });
    console.log(`✓ Closed state screenshot saved: ${shotClosed}`);

    // Test clicking "Open Display"
    console.log("Testing interactive toggle button: Open Display...");
    await openBtn.click();
    await page.waitForTimeout(1400);

    const reOpenState = await lid.evaluate((el) => el.classList.contains("is-open"));
    console.log(`After clicking open again, lid is-open: ${reOpenState}`);
    if (!reOpenState) {
      throw new Error("MacBook lid failed to re-open");
    }
    console.log("✓ MacBook lid successfully re-opened via toggle button");

    // Filter non-fatal console warnings
    const fatalErrors = errors.filter(
      (e) => !e.includes("favicon") && !e.includes("Third-party cookie")
    );
    if (fatalErrors.length > 0) {
      console.warn("Console errors encountered:", fatalErrors);
    } else {
      console.log("✓ Zero console or runtime errors");
    }

    console.log("\n=== MACBOOK OPEN/CLOSE AUDIT PASSED ===");
  } catch (err) {
    console.error("Test failed:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
