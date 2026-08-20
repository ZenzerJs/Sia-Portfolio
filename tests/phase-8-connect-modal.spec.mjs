import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const PORT = 3016;
const BASE = `http://localhost:${PORT}`;
const screenshotsDir = path.resolve("./.antigravity/artifacts/phase-8/screenshots");
const testsDir = path.resolve("./.antigravity/artifacts/phase-8/tests");

fs.mkdirSync(screenshotsDir, { recursive: true });
fs.mkdirSync(testsDir, { recursive: true });

let logOutput = "";
function log(msg) {
  console.log(msg);
  logOutput += msg + "\n";
}

async function run() {
  log("=== PHASE 8 TEST: CONNECT POP-OUT MODAL AUDIT ===");
  const browser = await chromium.launch({ headless: true });
  let allPassed = true;

  // 1. Desktop Modal Test
  {
    log("\n--- Desktop Viewport (1440x900) ---");
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      permissions: ["clipboard-read", "clipboard-write"],
    });
    const page = await ctx.newPage();

    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);

    // Scroll to #contact and open modal
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    const triggerBtn = page.locator('#contact button:has-text("Get in Touch")');
    await triggerBtn.click();
    await page.waitForTimeout(400);

    const modal = page.locator('div[role="dialog"][aria-modal="true"]');
    const isVisible = await modal.isVisible();
    if (isVisible) {
      log("  ✓ Connect modal successfully opened on Home page");
    } else {
      log("  ✗ ERROR: Connect modal failed to open");
      allPassed = false;
    }

    // Verify Title & Elements
    const title = await page.locator("#connect-modal-title").innerText();
    log(`  ✓ Modal title: "${title}"`);

    // Capture open modal screenshot
    const openShot = path.join(screenshotsDir, "desktop-connect-modal-open.png");
    await page.screenshot({ path: openShot });
    log(`  ✓ Captured open modal screenshot: ${path.basename(openShot)}`);

    // Test Copy button
    const copyBtn = modal.locator('button:has-text("Copy")');
    await copyBtn.click();
    await page.waitForTimeout(200);
    const copiedText = await modal.locator('button:has-text("Copied")').innerText();
    log(`  ✓ Copy button triggered feedback: "${copiedText}"`);

    // Test Close via Escape key
    await page.keyboard.press("Escape");
    await page.waitForTimeout(400);
    const afterEscapeVisible = await modal.isVisible();
    if (!afterEscapeVisible) {
      log("  ✓ Modal closed successfully via Escape key");
    } else {
      log("  ✗ ERROR: Modal failed to close on Escape key");
      allPassed = false;
    }

    // Re-open and close via Close button
    await triggerBtn.click();
    await page.waitForTimeout(400);
    await modal.locator('button[aria-label="Close connect modal"]').click();
    await page.waitForTimeout(400);
    const afterCloseBtn = await modal.isVisible();
    if (!afterCloseBtn) {
      log("  ✓ Modal closed successfully via Close button (X)");
    } else {
      log("  ✗ ERROR: Modal failed to close on Close button");
      allPassed = false;
    }

    await ctx.close();
  }

  // 2. Mobile Modal Test
  {
    log("\n--- Mobile Viewport (375x812) ---");
    const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const page = await ctx.newPage();

    await page.goto(`${BASE}/about`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);

    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    const aboutTrigger = page.locator('#contact button:has-text("Get in Touch"), #contact button:has-text("Open Connect Pop-out")');
    await aboutTrigger.first().click();
    await page.waitForTimeout(400);

    const modal = page.locator('div[role="dialog"][aria-modal="true"]');
    const isVisible = await modal.isVisible();
    if (isVisible) {
      log("  ✓ Connect modal opened successfully on /about page");
    } else {
      log("  ✗ ERROR: Modal failed to open on /about");
      allPassed = false;
    }

    const mobileShot = path.join(screenshotsDir, "mobile-connect-modal-open.png");
    await page.screenshot({ path: mobileShot });
    log(`  ✓ Captured mobile modal screenshot: ${path.basename(mobileShot)}`);

    await ctx.close();
  }

  await browser.close();

  fs.writeFileSync(path.join(testsDir, "test-results.log"), logOutput, "utf-8");
  log("\n=== PHASE 8 TEST RUN COMPLETE ===");
  if (!allPassed) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
