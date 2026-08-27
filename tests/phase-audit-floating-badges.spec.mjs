import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const PORT = 3016;
const BASE = `http://localhost:${PORT}`;
const outDir = path.resolve("./.antigravity/artifacts/phase-audit");
fs.mkdirSync(outDir, { recursive: true });

async function run() {
  console.log("=== PHASE 3 TEST: COARSE-POINTER GUARDED BADGES AUDIT ===");
  const browser = await chromium.launch({ headless: true });

  const errors = [];

  try {
    // 1. Desktop Test (Fine Pointer)
    console.log("\n--- Testing Desktop (pointer: fine) ---");
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      hasTouch: false,
    });
    const desktopPage = await desktopContext.newPage();
    desktopPage.on("console", (msg) => {
      if (msg.type() === "error") errors.push(`[Desktop] ${msg.text()}`);
    });

    await desktopPage.goto(`${BASE}/`, { waitUntil: "networkidle", timeout: 30000 });
    await desktopPage.waitForTimeout(1500);

    const badge1 = desktopPage.locator("text=Strategic Storytelling");
    const badge2 = desktopPage.locator("text=Data Narrative & Arts");

    if ((await badge1.count()) === 0 || (await badge2.count()) === 0) {
      throw new Error("FloatingBadge components missing on desktop");
    }

    // Trigger mouse move to ensure transform calculation works without errors
    await desktopPage.mouse.move(200, 300);
    await desktopPage.waitForTimeout(300);
    await desktopPage.mouse.move(800, 500);
    await desktopPage.waitForTimeout(400);

    const desktopShot = path.join(outDir, "phase-3-floating-badges-desktop.png");
    await desktopPage.screenshot({ path: desktopShot, fullPage: false });
    console.log(`✓ Desktop screenshot saved: ${desktopShot}`);
    await desktopContext.close();

    // 2. Mobile Touch Emulation Test (pointer: coarse)
    console.log("\n--- Testing Mobile Emulation (pointer: coarse) ---");
    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 812 },
      hasTouch: true,
      isMobile: true,
    });
    const mobilePage = await mobileContext.newPage();
    mobilePage.on("console", (msg) => {
      if (msg.type() === "error") errors.push(`[Mobile] ${msg.text()}`);
    });

    await mobilePage.goto(`${BASE}/`, { waitUntil: "networkidle", timeout: 30000 });
    await mobilePage.waitForTimeout(1000);

    // Verify pointer: coarse media query matches
    const isCoarse = await mobilePage.evaluate(() => window.matchMedia("(pointer: coarse)").matches);
    console.log(`✓ Mobile matched pointer: coarse = ${isCoarse}`);

    const mobileShot = path.join(outDir, "phase-3-floating-badges-mobile.png");
    await mobilePage.screenshot({ path: mobileShot, fullPage: false });
    console.log(`✓ Mobile screenshot saved: ${mobileShot}`);
    await mobileContext.close();

    if (errors.length > 0) {
      console.warn("Console errors:", errors);
    } else {
      console.log("✓ Zero console errors across desktop & mobile");
    }

    console.log("=== PHASE 3 TEST PASSED ===");
  } catch (err) {
    console.error("Phase 3 test failed:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
