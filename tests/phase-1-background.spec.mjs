import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const PORT = 3016;
const BASE = `http://localhost:${PORT}`;
const screenshotsDir = path.resolve("./.antigravity/artifacts/phase-1/screenshots");
const testsDir = path.resolve("./.antigravity/artifacts/phase-1/tests");

fs.mkdirSync(screenshotsDir, { recursive: true });
fs.mkdirSync(testsDir, { recursive: true });

let logOutput = "";
function log(msg) {
  console.log(msg);
  logOutput += msg + "\n";
}

async function run() {
  log("=== PHASE 1 TEST: BACKGROUND RESET AUDIT ===");
  const browser = await chromium.launch({ headless: true });
  const viewports = [
    { name: "desktop", width: 1440, height: 900 },
    { name: "mobile", width: 375, height: 812 },
  ];

  const routes = ["/", "/about", "/work", "/work/mass-culture-dna"];
  let allPassed = true;

  for (const vp of viewports) {
    log(`\nTesting Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await ctx.newPage();

    for (const route of routes) {
      log(`  Checking route: ${route}...`);
      await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1000);

      // Check blinds overlay absence
      const blindsCount = await page.locator("#blinds-overlay, .blinds-overlay").count();
      if (blindsCount === 0) {
        log(`    ✓ Blinds overlay is absent on ${route}`);
      } else {
        log(`    ✗ ERROR: Blinds overlay found on ${route}`);
        allPassed = false;
      }

      // Check computed background color
      const bg = await page.evaluate(() => {
        const bodyStyle = window.getComputedStyle(document.body);
        const beforeStyle = window.getComputedStyle(document.body, "::before");
        return {
          bodyBg: bodyStyle.backgroundColor,
          beforeBgImg: beforeStyle.backgroundImage,
        };
      });

      log(`    ✓ Body Background: ${bg.bodyBg}`);
      log(`    ✓ Body::before background-image: ${bg.beforeBgImg}`);

      if (bg.beforeBgImg && bg.beforeBgImg !== "none" && bg.beforeBgImg.includes("gradient")) {
        log(`    ✗ ERROR: Grid overlay gradient still active on body::before`);
        allPassed = false;
      }

      const slug = route === "/" ? "home" : route.replace(/\//g, "-").replace(/^-/, "");
      const shotPath = path.join(screenshotsDir, `${vp.name}-${slug}.png`);
      await page.screenshot({ path: shotPath, fullPage: false });
      log(`    ✓ Captured screenshot: ${path.basename(shotPath)}`);
    }
    await ctx.close();
  }

  await browser.close();

  fs.writeFileSync(path.join(testsDir, "test-results.log"), logOutput, "utf-8");
  log("\n=== PHASE 1 TEST RUN COMPLETE ===");
  if (!allPassed) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
