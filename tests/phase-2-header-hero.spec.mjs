import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const PORT = 3016;
const BASE = `http://localhost:${PORT}`;
const screenshotsDir = path.resolve("./.antigravity/artifacts/phase-2/screenshots");
const testsDir = path.resolve("./.antigravity/artifacts/phase-2/tests");

fs.mkdirSync(screenshotsDir, { recursive: true });
fs.mkdirSync(testsDir, { recursive: true });

let logOutput = "";
function log(msg) {
  console.log(msg);
  logOutput += msg + "\n";
}

async function run() {
  log("=== PHASE 2 TEST: HEADER CLEANUP & HERO STATEMENT AUDIT ===");
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
    await page.waitForTimeout(1000);

    // 1. Assert location sub-text is completely removed from header
    const headerLocCount = await page.locator(".site-header .site-header__location").count();
    const headerText = await page.locator(".site-header").innerText();
    if (headerLocCount === 0 && !headerText.includes("LONDON, UNITED KINGDOM")) {
      log(`  ✓ Header location sub-text successfully removed`);
    } else {
      log(`  ✗ ERROR: Location text still present in header DOM: ${headerText}`);
      allPassed = false;
    }

    // 2. Assert hero headline text
    const heroHeadline = await page.locator(".hero-headline").innerText();
    log(`  Hero Headline: "${heroHeadline.replace(/\n/g, " ")}"`);
    if (
      heroHeadline.includes("Connecting data, research, and community") &&
      heroHeadline.includes("through strategic storytelling and digital media.")
    ) {
      log(`  ✓ Hero statement correctly updated`);
    } else {
      log(`  ✗ ERROR: Hero statement does not match expected copy`);
      allPassed = false;
    }

    // 3. Check responsive line break
    const brCount = await page.locator(".hero-headline br.hidden.md\\:block, .hero-headline br").count();
    log(`  ✓ Responsive line break present (count: ${brCount})`);

    // Capture screenshots of header & hero
    const shotPath = path.join(screenshotsDir, `${vp.name}-header-hero.png`);
    await page.screenshot({ path: shotPath, clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height, 800) } });
    log(`  ✓ Captured screenshot: ${path.basename(shotPath)}`);

    await ctx.close();
  }

  await browser.close();

  fs.writeFileSync(path.join(testsDir, "test-results.log"), logOutput, "utf-8");
  log("\n=== PHASE 2 TEST RUN COMPLETE ===");
  if (!allPassed) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
