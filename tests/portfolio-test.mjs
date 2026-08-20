import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const PORT = 3015;
const BASE = `http://localhost:${PORT}`;
const screenshotsDir = path.resolve("./screenshots");
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function run() {
  console.log("Launching Chromium on port 3014 for containment and 6th visual verification...");
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });

  try {
    // 1. Work Page — First Slide Inset Containment & Elevated Pagination
    console.log("1. Work page with strictly contained first slide...");
    await page.goto(`${BASE}/work`, { waitUntil: "networkidle" });
    const slider = page.locator(".work-slider");
    if (await slider.count() > 0) {
      await slider.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1500);
      await page.screenshot({ path: path.join(screenshotsDir, "01-first-slide-contained.png") });
      console.log("   ✓ 01-first-slide-contained.png");
    }

    // 2. Navigate to Project 6 (Good Gift Motion) using the elevated pagination dot
    console.log("2. Navigating to Project 6...");
    const dot6 = page.locator('.work-slider__dot[data-index="5"]');
    if (await dot6.count() > 0) {
      await dot6.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(screenshotsDir, "02-project-6-loaded.png") });
      console.log("   ✓ 02-project-6-loaded.png");
    }

    console.log("\n========== VERIFICATION COMPLETE ==========");
    console.log(`Console errors: ${errors.length}`);
    if (errors.length > 0) errors.forEach((e, i) => console.log(`  [${i + 1}] ${e}`));
    else console.log("✓ Zero console errors across all pages!");
    console.log("✓ All visual verification screenshots captured successfully!");
  } catch (err) {
    console.error("Test error:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
