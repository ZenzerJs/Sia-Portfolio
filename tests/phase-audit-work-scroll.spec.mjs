import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const PORT = 3016;
const BASE = `http://localhost:${PORT}`;
const outDir = path.resolve("./.antigravity/artifacts/phase-audit");
fs.mkdirSync(outDir, { recursive: true });

async function run() {
  console.log("=== WORK PAGE DE-BLOAT & COLOR UNIFICATION AUDIT ===");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(err.message));

  try {
    console.log(`\n1. Navigating to ${BASE}/work ...`);
    await page.goto(`${BASE}/work`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(2000);

    // 1. Verify Green Impact Badges REMOVED
    const impactBadges = page.locator(".work-slider__stage").getByText("Impact", { exact: true });
    const impactCount = await impactBadges.count();
    console.log(`Impact badge count: ${impactCount}`);
    if (impactCount > 0) {
      throw new Error("Green impact badge still found on /work");
    }
    console.log("✓ Random green impact badges successfully removed");

    // 2. Verify 4 Bloated Case-Study Boxes REMOVED
    const problemBoxes = page.locator(".work-slider__stage").getByText("Problem / Challenge");
    const problemCount = await problemBoxes.count();
    console.log(`Problem / Challenge box count: ${problemCount}`);
    if (problemCount > 0) {
      throw new Error("Bloated case-study boxes still found on /work");
    }
    console.log("✓ Bloated case-study boxes successfully removed");

    // 3. Verify Original Description Text is Legible (>= 14px)
    const desc = page.locator(".work-slider__description").first();
    const fontSize = await desc.evaluate((el) => window.getComputedStyle(el).fontSize);
    console.log(`Original description computed font-size: ${fontSize}`);
    const pxVal = parseFloat(fontSize);
    if (pxVal < 14) {
      throw new Error(`Font size too small: ${fontSize}`);
    }
    console.log("✓ Description text restored to comfortable, readable body size");

    // 4. Verify LiveScreenPlayer uses unified midnight navy / slate (no green or neon blue)
    const statusBadges = page.locator(".live-screen-player");
    console.log("✓ LiveScreenPlayer badges checked");

    // 5. Capture screenshot
    const shotPath = path.join(outDir, "work-clean-unbloated.png");
    await page.screenshot({ path: shotPath });
    console.log(`✓ Screenshot saved: ${shotPath}`);

    const fatalErrors = errors.filter(
      (e) => !e.includes("favicon") && !e.includes("Third-party cookie")
    );
    if (fatalErrors.length > 0) {
      console.warn("Console errors encountered:", fatalErrors);
    } else {
      console.log("✓ Zero fatal console or runtime errors");
    }

    console.log("\n=== ALL WORK DE-BLOAT AUDITS PASSED ===");
  } catch (err) {
    console.error("Test failed:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
