import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const PORT = 3016;
const BASE = `http://localhost:${PORT}`;
const outDir = path.resolve("./.antigravity/artifacts/phase-audit");
fs.mkdirSync(outDir, { recursive: true });

async function run() {
  console.log("=== PHASE 4 TEST: HERO SHOWREEL SCROLL DOCKING AUDIT ===");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      errors.push(msg.text());
    }
  });

  page.on("pageerror", (err) => {
    errors.push(err.message);
  });

  try {
    console.log(`Navigating to ${BASE}/#work ...`);
    await page.goto(`${BASE}/#work`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1500);

    const showreelSection = page.locator('#work, [aria-label="Selected Work Showreel"]');
    if ((await showreelSection.count()) === 0) {
      throw new Error("Showreel section not found");
    }

    // Verify video poster attribute
    const video = page.locator('#work video');
    if ((await video.count()) === 0) {
      throw new Error("Showreel video element not found");
    }

    const poster = await video.getAttribute("poster");
    console.log(`Video poster: "${poster}"`);
    if (!poster || !poster.includes("showcase-slide-1.jpg")) {
      throw new Error(`Expected poster 'showcase-slide-1.jpg', got '${poster}'`);
    }

    const src = await video.getAttribute("src");
    console.log(`Video src: "${src}"`);
    if (!src || !src.includes("showcase-reel.mp4")) {
      throw new Error(`Expected video src 'showcase-reel.mp4', got '${src}'`);
    }

    // Scroll progressively through the 180vh docking section to test useTransform calculations
    console.log("Scrolling through showreel docking timeline...");
    for (let scrollY = 0; scrollY <= 1500; scrollY += 250) {
      await page.evaluate((y) => window.scrollTo(0, y), scrollY);
      await page.waitForTimeout(150);
    }

    const shotPath = path.join(outDir, "phase-4-showreel-docking.png");
    await page.screenshot({ path: shotPath, fullPage: false });
    console.log(`✓ Screenshot saved: ${shotPath}`);

    // Check for React Hook Invariant crashes
    const hookCrash = errors.find((e) =>
      e.toLowerCase().includes("hook") ||
      e.toLowerCase().includes("invariant") ||
      e.toLowerCase().includes("rendered more hooks")
    );

    if (hookCrash) {
      throw new Error(`React Hook Invariant Crash detected: ${hookCrash}`);
    }

    if (errors.length > 0) {
      console.warn("Console errors encountered:", errors);
    } else {
      console.log("✓ Zero console or runtime errors during scroll docking");
    }

    console.log("=== PHASE 4 TEST PASSED ===");
  } catch (err) {
    console.error("Phase 4 test failed:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
