import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const PORT = 3016;
const BASE = `http://localhost:${PORT}`;
const screenshotsDir = path.resolve("./.antigravity/artifacts/phase-4/screenshots");
const testsDir = path.resolve("./.antigravity/artifacts/phase-4/tests");

fs.mkdirSync(screenshotsDir, { recursive: true });
fs.mkdirSync(testsDir, { recursive: true });

let logOutput = "";
function log(msg) {
  console.log(msg);
  logOutput += msg + "\n";
}

async function run() {
  log("=== PHASE 4 TEST: PAGE RE-ORDERING & PROCESS TEARDOWN AUDIT ===");
  const browser = await chromium.launch({ headless: true });
  const viewports = [
    { name: "desktop", width: 1440, height: 900 },
    { name: "mobile", width: 375, height: 812 },
  ];

  let allPassed = true;

  for (const vp of viewports) {
    log(`\nTesting Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await ctx.newPage();

    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);

    // 1. Assert Process section teardown
    const processCount = await page.locator("#process, .process, .process__stack, .process__disks").count();
    if (processCount === 0) {
      log("  ✓ Process section and all disk components are completely removed from DOM");
    } else {
      log(`  ✗ ERROR: Found ${processCount} residual process elements in DOM`);
      allPassed = false;
    }

    // 2. Assert DOM Hierarchy order
    const expectedOrder = [
      "#home",
      "#expertise",
      "#work",
      ".marquee--tools",
      "#campaigns",
      "#gallery",
      "#testimonials",
      "#contact",
    ];

    const orderIndices = await page.evaluate((selectors) => {
      return selectors.map((sel) => {
        const el = document.querySelector(sel);
        if (!el) return -1;
        // Compute position index in document body
        const allElements = Array.from(document.querySelectorAll("*"));
        return allElements.indexOf(el);
      });
    }, expectedOrder);

    log("  Evaluating DOM sequence indices:");
    let sequenceValid = true;
    for (let i = 0; i < expectedOrder.length; i++) {
      log(`    [${i + 1}] ${expectedOrder[i]} -> DOM Index: ${orderIndices[i]}`);
      if (orderIndices[i] === -1) {
        log(`    ✗ ERROR: Element not found: ${expectedOrder[i]}`);
        sequenceValid = false;
        allPassed = false;
      }
      if (i > 0 && orderIndices[i] <= orderIndices[i - 1]) {
        log(`    ✗ ERROR: Out-of-order sequence between ${expectedOrder[i - 1]} and ${expectedOrder[i]}`);
        sequenceValid = false;
        allPassed = false;
      }
    }

    if (sequenceValid) {
      log("  ✓ Section hierarchy matches strict specification: Hero -> Orbit -> Laptop -> Marquee -> Campaigns -> Gallery -> Testimonials -> Contact");
    }

    // Capture screenshots
    const shotPath = path.join(screenshotsDir, `${vp.name}-full-hierarchy.png`);
    await page.screenshot({ path: shotPath, fullPage: true });
    log(`  ✓ Captured full-page screenshot: ${path.basename(shotPath)}`);

    await ctx.close();
  }

  await browser.close();

  fs.writeFileSync(path.join(testsDir, "test-results.log"), logOutput, "utf-8");
  log("\n=== PHASE 4 TEST RUN COMPLETE ===");
  if (!allPassed) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
