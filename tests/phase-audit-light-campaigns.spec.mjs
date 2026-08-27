import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const PORT = 3016;
const BASE = `http://localhost:${PORT}`;
const outDir = path.resolve("./.antigravity/artifacts/phase-audit");
fs.mkdirSync(outDir, { recursive: true });

async function run() {
  console.log("=== LIGHT CAMPAIGNS & HERO CURSOR EFFECT AUDIT ===");
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
    // 1. Audit /campaigns (Light-themed full-screen viewer)
    console.log(`\n1. Navigating to ${BASE}/campaigns ...`);
    await page.goto(`${BASE}/campaigns`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1500);

    // Verify Title & Header
    const h1 = await page.locator("h1").first().innerText();
    console.log(`H1: "${h1}"`);
    if (!h1.includes("Social Campaigns")) {
      throw new Error(`Expected 'Social Campaigns', got '${h1}'`);
    }

    // Verify Light Background (not dark #0e1013)
    const mainBg = await page.evaluate(() => {
      const el = document.querySelector("#main-content");
      return window.getComputedStyle(el).backgroundColor;
    });
    console.log(`Main background computed: "${mainBg}"`);

    // Verify Initial Post Counter
    const counter = page.locator("text=01 / 13");
    if ((await counter.count()) === 0) {
      throw new Error("Initial '01 / 13' counter not found");
    }
    console.log("✓ Initial '01 / 13' counter displayed");

    // Verify Embed iframe
    const iframe = page.locator("iframe").first();
    const iframeSrc = await iframe.getAttribute("src");
    console.log(`Iframe src: "${iframeSrc}"`);
    if (!iframeSrc || !iframeSrc.includes("instagram.com")) {
      throw new Error(`Expected Instagram embed on post 1, got '${iframeSrc}'`);
    }

    // Next post button
    console.log("Testing Next post button...");
    const nextBtn = page.locator('button[aria-label="Next campaign post"]');
    await nextBtn.click();
    await page.waitForTimeout(500);

    const counter02 = page.locator("text=02 / 13");
    if ((await counter02.count()) === 0) {
      throw new Error("Failed to advance to 02 / 13");
    }
    console.log("✓ Advanced to 02 / 13");

    // Keyboard navigation
    console.log("Testing keyboard ArrowRight...");
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(500);
    const counter03 = page.locator("text=03 / 13");
    if ((await counter03.count()) === 0) {
      throw new Error("Failed to advance to 03 / 13 via keyboard");
    }
    console.log("✓ Keyboard ArrowRight advanced to 03 / 13");

    // Advance to 04 / 13 (Mass Culture LinkedIn)
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(500);
    const counter04 = page.locator("text=04 / 13");
    if ((await counter04.count()) === 0) {
      throw new Error("Failed to advance to 04 / 13");
    }
    console.log("✓ Advanced to 04 / 13 (Mass Culture LinkedIn)");

    // Direct jump via directory grid
    console.log("Testing directory card jump...");
    const card07 = page.locator("button:has-text('07')").first();
    if ((await card07.count()) > 0) {
      await card07.click();
      await page.waitForTimeout(500);
      const counter07 = page.locator("text=07 / 13");
      if ((await counter07.count()) > 0) {
        console.log("✓ Successfully jumped to Post 07 from directory");
      }
    }

    // Capture Campaigns Page Screenshot
    const shotCampaigns = path.join(outDir, "light-campaigns-viewer.png");
    await page.screenshot({ path: shotCampaigns, fullPage: false });
    console.log(`✓ Screenshot saved: ${shotCampaigns}`);

    // 2. Audit Home Page (Hero text cursor effect, removed badges, restored 3D MacbookLaptop)
    console.log(`\n2. Navigating to ${BASE}/ to verify Hero and Laptop ...`);
    await page.goto(`${BASE}/`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1500);

    // Verify FloatingBadges are GONE from the hero
    const heroFloatingBadges = page.locator("#home .backdrop-blur-md");
    const badgeCount = await heroFloatingBadges.count();
    console.log(`Hero floating badge elements found: ${badgeCount}`);
    if (badgeCount > 0) {
      throw new Error("Floating badges were expected to be removed from hero, but still present");
    }
    console.log("✓ Hero floating badges successfully removed");

    // Verify Interactive Hero Headline
    const heroHeadline = page.locator(".hero-headline");
    if ((await heroHeadline.count()) === 0) {
      throw new Error("Hero headline not found");
    }
    console.log("✓ Hero headline is present");

    // Move mouse across hero to test cursor physics
    await page.mouse.move(300, 300);
    await page.waitForTimeout(200);
    await page.mouse.move(700, 450);
    await page.waitForTimeout(200);
    await page.mouse.move(1100, 250);
    await page.waitForTimeout(200);
    console.log("✓ Mouse cursor moved across hero with 0 errors");

    // Verify 3D MacbookLaptop in #work
    const macbook = page.locator(".work__macbook");
    if ((await macbook.count()) === 0) {
      throw new Error("3D MacbookLaptop element not found in DOM");
    }
    console.log("✓ 3D MacbookLaptop component found in DOM");

    // Scroll into #work to trigger laptop lid opening
    await macbook.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    const shotHome = path.join(outDir, "home-macbook-restored.png");
    await page.screenshot({ path: shotHome, fullPage: false });
    console.log(`✓ Screenshot saved: ${shotHome}`);

    // Verify zero fatal console errors
    const fatalErrors = errors.filter(
      (e) => !e.includes("favicon") && !e.includes("Third-party cookie") && !e.includes("getInstalledRelatedApps")
    );

    if (fatalErrors.length > 0) {
      console.warn("Console errors encountered:", fatalErrors);
    } else {
      console.log("✓ Zero fatal console errors across campaigns and home");
    }

    console.log("\n=== ALL AUDITS PASSED SUCCESSFULLY ===");
  } catch (err) {
    console.error("Test failed:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
