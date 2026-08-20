import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const PORT = 3016;
const BASE = `http://localhost:${PORT}`;
const screenshotsDir = path.resolve("./.antigravity/artifacts/phase-6/screenshots");
const testsDir = path.resolve("./.antigravity/artifacts/phase-6/tests");

fs.mkdirSync(screenshotsDir, { recursive: true });
fs.mkdirSync(testsDir, { recursive: true });

let logOutput = "";
function log(msg) {
  console.log(msg);
  logOutput += msg + "\n";
}

async function run() {
  log("=== PHASE 6 TEST: ROUTE TRANSITIONS & SCROLL RESTORATION ===");
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  let allPassed = true;

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      log(`  [Browser Error]: ${msg.text()}`);
    }
  });

  // Step 1: Visit Home and scroll down
  log("\n1. Loading Home Page (/)...");
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);

  await page.evaluate(() => window.scrollTo(0, 3000));
  await page.waitForTimeout(500);
  const scrolledHomeY = await page.evaluate(() => window.scrollY);
  log(`  Scrolled Home Y: ${scrolledHomeY}px`);

  // Step 2: Navigate to /about
  log("\n2. Navigating to /about via header link...");
  await page.locator('.site-nav a[href="/about"]').first().click();
  await page.waitForFunction(() => window.location.pathname === "/about", { timeout: 7000 });
  await page.waitForTimeout(1200);

  const aboutScrollY = await page.evaluate(() => window.scrollY);
  log(`  /about scroll position: ${aboutScrollY}px`);
  if (aboutScrollY === 0) {
    log("  ✓ Scroll position successfully reset to (0, 0) on /about");
  } else {
    log(`  ✗ ERROR: Scroll position not reset! (scrollY: ${aboutScrollY})`);
    allPassed = false;
  }
  const aboutShot = path.join(screenshotsDir, "route-about-top.png");
  await page.screenshot({ path: aboutShot });
  log(`  ✓ Captured screenshot: ${path.basename(aboutShot)}`);

  // Step 3: Scroll down on /about, then navigate to /work
  log("\n3. Scrolling down on /about and navigating to /work...");
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(400);
  await page.locator('.site-nav a[href="/work"]').first().click();
  await page.waitForFunction(() => window.location.pathname === "/work", { timeout: 7000 });
  await page.waitForTimeout(1200);

  const workScrollY = await page.evaluate(() => window.scrollY);
  log(`  /work scroll position: ${workScrollY}px`);
  if (workScrollY === 0) {
    log("  ✓ Scroll position successfully reset to (0, 0) on /work");
  } else {
    log(`  ✗ ERROR: Scroll position not reset! (scrollY: ${workScrollY})`);
    allPassed = false;
  }
  const workShot = path.join(screenshotsDir, "route-work-top.png");
  await page.screenshot({ path: workShot });
  log(`  ✓ Captured screenshot: ${path.basename(workShot)}`);

  // Step 4: Scroll down on /work, then navigate to a Case Study
  log("\n4. Navigating to Case Study /work/mass-culture-dna...");
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(400);
  await page.locator('a[href="/work/mass-culture-dna"]').first().click();
  await page.waitForFunction(() => window.location.pathname === "/work/mass-culture-dna", { timeout: 7000 });
  await page.waitForTimeout(1200);

  const csScrollY = await page.evaluate(() => window.scrollY);
  log(`  Case Study scroll position: ${csScrollY}px`);
  if (csScrollY === 0) {
    log("  ✓ Scroll position successfully reset to (0, 0) on Case Study");
  } else {
    log(`  ✗ ERROR: Scroll position not reset! (scrollY: ${csScrollY})`);
    allPassed = false;
  }
  const csShot = path.join(screenshotsDir, "route-casestudy-top.png");
  await page.screenshot({ path: csShot });
  log(`  ✓ Captured screenshot: ${path.basename(csShot)}`);

  // Step 5: Navigate back to Home from Case Study
  log("\n5. Navigating back to Home (/) from Case Study...");
  await page.evaluate(() => window.scrollTo(0, 2500));
  await page.waitForTimeout(400);
  await page.locator('.site-nav a[href="/"]').first().click();
  await page.waitForFunction(() => window.location.pathname === "/", { timeout: 7000 });
  await page.waitForTimeout(1200);

  const returnHomeScrollY = await page.evaluate(() => window.scrollY);
  log(`  Home return scroll position: ${returnHomeScrollY}px`);
  if (returnHomeScrollY === 0) {
    log("  ✓ Scroll position successfully reset to (0, 0) on return to Home");
  } else {
    log(`  ✗ ERROR: Scroll position not reset! (scrollY: ${returnHomeScrollY})`);
    allPassed = false;
  }
  const returnHomeShot = path.join(screenshotsDir, "route-home-returned-top.png");
  await page.screenshot({ path: returnHomeShot });
  log(`  ✓ Captured screenshot: ${path.basename(returnHomeShot)}`);

  await browser.close();

  fs.writeFileSync(path.join(testsDir, "test-results.log"), logOutput, "utf-8");
  log("\n=== PHASE 6 TEST RUN COMPLETE ===");
  if (!allPassed) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
