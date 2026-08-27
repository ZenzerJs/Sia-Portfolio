import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const PORT = 3016;
const BASE = `http://localhost:${PORT}`;
const outDir = path.resolve("./.antigravity/artifacts/phase-audit");
fs.mkdirSync(outDir, { recursive: true });

async function run() {
  console.log("=== MACBOOK SCROLL-ONLY OPEN / CLOSE AUDIT ===");
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

    // 1. Verify buttons are REMOVED
    const closeBtn = page.locator('button:has-text("Close Display")');
    const exploreBtn = page.locator('button:has-text("Explore All Work")');
    const closeBtnCount = await closeBtn.count();
    const exploreBtnCount = await exploreBtn.count();
    console.log(`Buttons count: Close Display (${closeBtnCount}), Explore (${exploreBtnCount})`);
    if (closeBtnCount > 0 || exploreBtnCount > 0) {
      throw new Error("Manual toggle buttons are still present in DOM, expected them removed");
    }
    console.log("✓ Manual buttons successfully removed from MacBook display");

    const macbook = page.locator(".work__macbook");
    const lid = page.locator(".work__macbook .lid");

    // 2. Initially at top (#home) — lid should be closed
    const initialIsOpen = await lid.evaluate((el) => el.classList.contains("is-open"));
    console.log(`Initial lid is-open state (at top of page): ${initialIsOpen}`);
    if (initialIsOpen) {
      throw new Error("Lid should initially be closed at top of page");
    }
    console.log("✓ MacBook lid initially closed at top");

    // 3. Scroll down into #work (from above) — lid should open
    console.log("\n2. Scrolling down into #work from above...");
    await macbook.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);

    const openFromAbove = await lid.evaluate((el) => el.classList.contains("is-open"));
    console.log(`Lid is-open after scrolling down into view: ${openFromAbove}`);
    if (!openFromAbove) {
      throw new Error("Lid failed to open upon scrolling into view from above");
    }
    console.log("✓ MacBook lid opened smoothly upon entering view from above");

    // Capture screenshot in open state
    const shotOpen = path.join(outDir, "macbook-scroll-open.png");
    await page.screenshot({ path: shotOpen });
    console.log(`✓ Open state screenshot saved: ${shotOpen}`);

    // 4. Scroll past #work down into #gallery — lid should close
    console.log("\n3. Scrolling past #work down into #gallery...");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1500);

    const closedAfterLeavingDown = await lid.evaluate((el) => el.classList.contains("is-open"));
    console.log(`Lid is-open after scrolling past into gallery/footer: ${closedAfterLeavingDown}`);
    if (closedAfterLeavingDown) {
      throw new Error("Lid failed to close after scrolling past the work section");
    }
    console.log("✓ MacBook lid closed smoothly after scrolling past below");

    // 5. Scroll back up into #work (from below) — lid should re-open
    console.log("\n4. Scrolling back up into #work from below...");
    await macbook.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);

    const openFromBelow = await lid.evaluate((el) => el.classList.contains("is-open"));
    console.log(`Lid is-open after scrolling back up into view: ${openFromBelow}`);
    if (!openFromBelow) {
      throw new Error("Lid failed to re-open upon scrolling back into view from below");
    }
    console.log("✓ MacBook lid re-opened smoothly upon entering view from below");

    // 6. Scroll back up to top (#home) — lid should close again
    console.log("\n5. Scrolling back up to top of page (#home)...");
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1500);

    const closedAtTop = await lid.evaluate((el) => el.classList.contains("is-open"));
    console.log(`Lid is-open after scrolling back to top: ${closedAtTop}`);
    if (closedAtTop) {
      throw new Error("Lid failed to close after scrolling back to top");
    }
    console.log("✓ MacBook lid closed smoothly after scrolling back to top");

    const fatalErrors = errors.filter(
      (e) => !e.includes("favicon") && !e.includes("Third-party cookie")
    );
    if (fatalErrors.length > 0) {
      console.warn("Console errors encountered:", fatalErrors);
    } else {
      console.log("✓ Zero console or runtime errors");
    }

    console.log("\n=== ALL MACBOOK SCROLL TESTS PASSED ===");
  } catch (err) {
    console.error("Test failed:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
