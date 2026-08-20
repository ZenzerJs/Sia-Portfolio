import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const PORT = 3016;
const BASE = `http://localhost:${PORT}`;
const screenshotsDir = path.resolve("./.antigravity/artifacts/phase-3/screenshots");
const testsDir = path.resolve("./.antigravity/artifacts/phase-3/tests");

fs.mkdirSync(screenshotsDir, { recursive: true });
fs.mkdirSync(testsDir, { recursive: true });

let logOutput = "";
function log(msg) {
  console.log(msg);
  logOutput += msg + "\n";
}

const auditTerms = [
  { uk: "specialising", us: "specializing" },
  { uk: "human-centred", us: "human-centered" },
  { uk: "Our Neighbourhood", us: "Our Neighborhood" },
  { uk: "organisation", us: "organization" },
  { uk: "Analysing", us: "Analyzing" },
  { uk: "behaviour", us: "behavior" },
  { uk: "The Organisation", us: "The Organization" },
  { uk: "Performance Optimisation", us: "Performance Optimization" },
  { uk: "analytical rigour", us: "analytical rigor" },
];

async function run() {
  log("=== PHASE 3 TEST: GLOBAL UK ENGLISH AUDIT ===");
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  const routes = [
    "/",
    "/about",
    "/work",
    "/work/mass-culture-dna",
    "/work/fifa-2026-challenge",
    "/work/mastercard-sustainability",
  ];

  let allPassed = true;

  for (const route of routes) {
    log(`\nAuditing route: ${route}`);
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    const bodyText = await page.evaluate(() => document.body.innerText);

    for (const term of auditTerms) {
      if (bodyText.includes(term.us)) {
        log(`  ✗ ERROR: Found US spelling "${term.us}" on ${route}`);
        allPassed = false;
      }
    }

    const slug = route === "/" ? "home" : route.replace(/\//g, "-").replace(/^-/, "");
    const shotPath = path.join(screenshotsDir, `spotcheck-${slug}.png`);
    await page.screenshot({ path: shotPath, fullPage: false });
    log(`  ✓ Captured spot-check screenshot: ${path.basename(shotPath)}`);
  }

  await browser.close();

  fs.writeFileSync(path.join(testsDir, "test-results.log"), logOutput, "utf-8");
  log("\n=== PHASE 3 TEST RUN COMPLETE ===");
  if (!allPassed) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
