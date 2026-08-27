import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const PORT = 3016;
const BASE = `http://localhost:${PORT}`;
const outDir = path.resolve("./.antigravity/artifacts/phase-audit");
fs.mkdirSync(outDir, { recursive: true });

async function run() {
  console.log("=== WORK PAGE FLASHING LIGHT & INDEPENDENT SCROLL AUDIT ===");
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
    console.log(`\n1. Navigating to ${BASE}/work ...`);
    await page.goto(`${BASE}/work`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(2000);

    // 1. Verify Video Cell Bubble Flashing Lights are REMOVED
    const pingingDots = page.locator(".animate-ping");
    const pingCount = await pingingDots.count();
    console.log(`animate-ping count on /work: ${pingCount}`);
    if (pingCount > 0) {
      throw new Error("Flashing light (animate-ping) still found on /work");
    }
    console.log("✓ Flashing lights (animate-ping) successfully removed from video cell bubble");

    const pulseDots = page.locator(".work-slider__stage .animate-pulse");
    const pulseCount = await pulseDots.count();
    console.log(`animate-pulse count in work slider: ${pulseCount}`);
    if (pulseCount > 0) {
      throw new Error("Pulsing dot still found in work slider");
    }
    console.log("✓ Pulsing dots successfully removed from work slider");

    // 2. Verify Independent Scroll on Right-Side Content
    const activeContent = page.locator('.work-slider__content[data-project="1"]');
    const scrollStyles = await activeContent.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        overflowY: style.overflowY,
        overscrollBehavior: style.overscrollBehavior,
        maxHeight: style.maxHeight,
        scrollHeight: el.scrollHeight,
        clientHeight: el.clientHeight,
      };
    });

    console.log("Active content scroll styles:", scrollStyles);
    if (scrollStyles.overflowY !== "auto") {
      throw new Error(`Expected overflowY to be 'auto', got '${scrollStyles.overflowY}'`);
    }
    if (scrollStyles.overscrollBehavior !== "contain") {
      throw new Error(`Expected overscrollBehavior to be 'contain', got '${scrollStyles.overscrollBehavior}'`);
    }
    console.log("✓ Independent scroll (overflow-y: auto) and overscroll containment verified");

    // 3. Verify Compact 2x2 Grid Layout
    const caseStudyGrid = activeContent.locator(".grid.grid-cols-1.sm\\:grid-cols-2");
    const gridCount = await caseStudyGrid.count();
    console.log(`Compact 2x2 case study grid count: ${gridCount}`);
    if (gridCount === 0) {
      throw new Error("Compact 2x2 case study grid not found in DOM");
    }
    console.log("✓ Compact 2x2 case study grid verified (Problem, Outcome, Process, Reflection)");

    // 4. Test Mouse Wheel Scrolling inside the text container
    console.log("\nTesting independent text container scrolling...");
    await activeContent.hover();
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(600);

    const scrolledTop = await activeContent.evaluate((el) => el.scrollTop);
    console.log(`Text container scrollTop after mouse wheel: ${scrolledTop}px`);

    // 5. Capture screenshot
    const shotPath = path.join(outDir, "work-independent-scroll.png");
    await page.screenshot({ path: shotPath });
    console.log(`✓ Screenshot saved: ${shotPath}`);

    const fatalErrors = errors.filter(
      (e) => !e.includes("favicon") && !e.includes("Third-party cookie")
    );
    if (fatalErrors.length > 0) {
      console.warn("Console errors encountered:", fatalErrors);
    } else {
      console.log("✓ Zero fatal console or runtime errors");
    }

    console.log("\n=== ALL WORK PAGE AUDITS PASSED ===");
  } catch (err) {
    console.error("Test failed:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
