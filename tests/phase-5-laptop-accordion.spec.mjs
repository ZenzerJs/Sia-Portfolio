import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const PORT = 3016;
const BASE = `http://localhost:${PORT}`;
const screenshotsDir = path.resolve("./.antigravity/artifacts/phase-5/screenshots");
const testsDir = path.resolve("./.antigravity/artifacts/phase-5/tests");

fs.mkdirSync(screenshotsDir, { recursive: true });
fs.mkdirSync(testsDir, { recursive: true });

let logOutput = "";
function log(msg) {
  console.log(msg);
  logOutput += msg + "\n";
}

async function run() {
  log("=== PHASE 5 TEST: LAPTOP CTA & ACCORDION GALLERY INTEGRATION ===");
  const browser = await chromium.launch({ headless: true });
  let allPassed = true;

  // 1. Desktop Test
  {
    log("\n--- Desktop Viewport (1440x900) ---");
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();

    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);

    // Audit Laptop CTAs in #work
    const workLinks = await page.locator('#work a[href="/work"]');
    const workLinkCount = await workLinks.count();
    log(`  Found ${workLinkCount} link(s) to /work in #work section`);
    if (workLinkCount === 1) {
      log("  ✓ Exactly one primary CTA exists on the laptop component");
    } else {
      log(`  ✗ ERROR: Expected exactly 1 CTA link in #work, found ${workLinkCount}`);
      allPassed = false;
    }

    // Scroll to Laptop
    await page.locator("#work").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const laptopShot = path.join(screenshotsDir, "desktop-laptop-showreel.png");
    await page.screenshot({ path: laptopShot });
    log(`  ✓ Captured laptop screenshot: ${path.basename(laptopShot)}`);

    // Click Laptop Screen Link and check navigation
    await workLinks.first().evaluate((el) => el.click());
    await page.waitForFunction(() => window.location.pathname === "/work", { timeout: 7000 });
    log(`  ✓ Laptop CTA navigation succeeded! Navigated to: ${page.url()}`);

    // Return to home page
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);

    // Audit AccordionGallery
    const gallery = page.locator("#gallery .accordion-gallery");
    const panels = page.locator("#gallery .ag-panel");
    const panelCount = await panels.count();
    log(`  Found ${panelCount} panels in AccordionGallery`);
    if (panelCount === 8) {
      log("  ✓ All 8 35mm photo assets loaded into AccordionGallery");
    } else {
      log(`  ✗ ERROR: Expected 8 panels, found ${panelCount}`);
      allPassed = false;
    }

    await page.locator("#gallery").scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    const initialGalleryShot = path.join(screenshotsDir, "desktop-accordion-default.png");
    await page.screenshot({ path: initialGalleryShot });
    log(`  ✓ Captured accordion default state: ${path.basename(initialGalleryShot)}`);

    // Hover over panel index 4
    await panels.nth(4).hover();
    await page.waitForTimeout(700);

    const expandedGalleryShot = path.join(screenshotsDir, "desktop-accordion-hover.png");
    await page.screenshot({ path: expandedGalleryShot });
    log(`  ✓ Captured accordion expanded state: ${path.basename(expandedGalleryShot)}`);

    await ctx.close();
  }

  // 2. Mobile Test
  {
    log("\n--- Mobile Viewport (375x812) ---");
    const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const page = await ctx.newPage();

    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);

    await page.locator("#gallery").scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    const mobileGalleryShot = path.join(screenshotsDir, "mobile-accordion.png");
    await page.screenshot({ path: mobileGalleryShot });
    log(`  ✓ Captured mobile accordion screenshot: ${path.basename(mobileGalleryShot)}`);

    await ctx.close();
  }

  await browser.close();

  fs.writeFileSync(path.join(testsDir, "test-results.log"), logOutput, "utf-8");
  log("\n=== PHASE 5 TEST RUN COMPLETE ===");
  if (!allPassed) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
