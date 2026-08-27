import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const PORT = 3016;
const BASE = `http://localhost:${PORT}`;
const outDir = path.resolve("./.antigravity/artifacts/phase-audit");
fs.mkdirSync(outDir, { recursive: true });

async function run() {
  console.log("=== PHASE 1 TEST: CASE STUDIES & STRUCTURED METRICS AUDIT ===");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  try {
    console.log(`Navigating to ${BASE}/work ...`);
    await page.goto(`${BASE}/work`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1500);

    // Verify key metric impact badge
    const impactBadges = page.locator("text=Impact");
    const count = await impactBadges.count();
    console.log(`Found ${count} Key Metric impact badges`);
    if (count < 1) {
      throw new Error("No Impact badges found on /work page");
    }

    // Verify Problem / Challenge header
    const challengeHeaders = page.locator("text=Problem / Challenge");
    const challengeCount = await challengeHeaders.count();
    console.log(`Found ${challengeCount} Problem / Challenge blocks`);
    if (challengeCount < 1) {
      throw new Error("No Problem / Challenge blocks found");
    }

    // Verify Process list
    const processHeaders = page.locator("text=Process");
    const processCount = await processHeaders.count();
    console.log(`Found ${processCount} Process blocks`);

    // Verify Outcome and Reflection
    const outcomeCount = await page.locator("text=Outcome").count();
    const reflectionCount = await page.locator("text=Reflection").count();
    console.log(`Found ${outcomeCount} Outcome blocks, ${reflectionCount} Reflection blocks`);

    if (outcomeCount < 1 || reflectionCount < 1) {
      throw new Error("Outcome or Reflection blocks missing");
    }

    const shotPath = path.join(outDir, "phase-1-casestudies.png");
    await page.screenshot({ path: shotPath, fullPage: false });
    console.log(`✓ Screenshot saved: ${shotPath}`);

    if (errors.length > 0) {
      console.warn("Console errors encountered:", errors);
    } else {
      console.log("✓ Zero console errors");
    }

    console.log("=== PHASE 1 TEST PASSED ===");
  } catch (err) {
    console.error("Phase 1 test failed:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
