import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const PORT = 3016;
const BASE = `http://localhost:${PORT}`;
const screenshotsDir = path.resolve("./.antigravity/artifacts/phase-7/screenshots");
const testsDir = path.resolve("./.antigravity/artifacts/phase-7/tests");

fs.mkdirSync(screenshotsDir, { recursive: true });
fs.mkdirSync(testsDir, { recursive: true });

let logOutput = "";
function log(msg) {
  console.log(msg);
  logOutput += msg + "\n";
}

const projectSlugs = [
  "mass-culture-dna",
  "fifa-2026-challenge",
  "mastercard-sustainability",
  "cicu-creative-showcase",
  "parks-canada-tmu",
  "good-gift-visual",
];

async function run() {
  log("=== PHASE 7 TEST: CASE STUDY ASSET & ROUTE AUDIT ===");
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  let allPassed = true;
  const failedRequests = [];
  const successfulMedia = [];

  page.on("response", (res) => {
    const url = res.url();
    const status = res.status();
    if (url.startsWith(BASE) && (url.includes("/assets/") || url.includes(".jpg") || url.includes(".png") || url.includes(".mp4") || url.includes(".pdf") || url.includes(".svg"))) {
      if (status >= 400) {
        failedRequests.push({ url, status });
        log(`  ✗ NETWORK ERROR: ${status} for ${url}`);
      } else {
        successfulMedia.push({ url, status });
      }
    }
  });

  for (const slug of projectSlugs) {
    const route = `/work/${slug}`;
    log(`\nAuditing Case Study: ${route}`);
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    // Verify title rendering
    const heading = await page.locator(".cs-hero__title, h1").first().innerText();
    log(`  ✓ Page rendered title: "${heading.trim()}"`);

    // Verify next/previous links exist
    const prevLink = await page.locator('.cs-nav-card--prev').getAttribute("href");
    const nextLink = await page.locator('.cs-nav-card--next').getAttribute("href");
    log(`  ✓ Nav links: Prev [${prevLink}] | Next [${nextLink}]`);

    // Capture screenshot
    const shotPath = path.join(screenshotsDir, `casestudy-${slug}.png`);
    await page.screenshot({ path: shotPath, fullPage: true });
    log(`  ✓ Captured full screenshot: ${path.basename(shotPath)}`);
  }

  // Next Project Loop Test
  log("\n--- Testing Circular Next-Project Navigation ---");
  await page.goto(`${BASE}/work/mass-culture-dna`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  for (let i = 0; i < projectSlugs.length; i++) {
    const currentSlug = projectSlugs[i];
    const expectedNextSlug = projectSlugs[(i + 1) % projectSlugs.length];
    const nextLinkEl = page.locator('.cs-nav-card--next');
    const href = await nextLinkEl.getAttribute("href");
    log(`  [${currentSlug}] -> Next link points to: ${href}`);
    if (href === `/work/${expectedNextSlug}`) {
      log(`  ✓ Correct next slug: /work/${expectedNextSlug}`);
    } else {
      log(`  ✗ ERROR: Expected /work/${expectedNextSlug}, got ${href}`);
      allPassed = false;
    }
    await nextLinkEl.click();
    await page.waitForFunction((slug) => window.location.pathname === `/work/${slug}`, expectedNextSlug, { timeout: 7000 });
    await page.waitForTimeout(600);
  }

  await browser.close();

  log("\n--- Network Asset Summary ---");
  log(`Total local media assets verified: ${successfulMedia.length}`);
  log(`Total failed requests (404/500): ${failedRequests.length}`);

  if (failedRequests.length > 0) {
    allPassed = false;
  }

  fs.writeFileSync(path.join(testsDir, "test-results.log"), logOutput, "utf-8");
  log("\n=== PHASE 7 TEST RUN COMPLETE ===");
  if (!allPassed) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
