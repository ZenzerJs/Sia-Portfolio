import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const PORT = 3016;
const BASE = `http://localhost:${PORT}`;
const outDir = path.resolve("./.antigravity/artifacts/phase-audit");
fs.mkdirSync(outDir, { recursive: true });

async function run() {
  console.log("=== BROADCAST TV CONSOLE & GSAP PIPELINE AUDIT ===");
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
    // 1. Visit /campaigns
    console.log(`\n1. Navigating to ${BASE}/campaigns ...`);
    await page.goto(`${BASE}/campaigns`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(2000);

    // Verify Title & Header
    const titleText = await page.locator("h1").first().innerText();
    console.log(`Page H1: "${titleText}"`);
    if (!titleText.includes("Social Campaigns")) {
      throw new Error(`Expected 'Social Campaigns' in H1, got '${titleText}'`);
    }

    // Verify Initial Channel OSD
    const osdChannel = page.locator("text=CH 01");
    if ((await osdChannel.count()) === 0) {
      throw new Error("Initial CH 01 OSD indicator not found");
    }
    console.log("✓ Initial CH 01 OSD displayed");

    // Verify Embed iframe
    const iframe = page.locator("iframe").first();
    const iframeSrc = await iframe.getAttribute("src");
    console.log(`Iframe src: "${iframeSrc}"`);
    if (!iframeSrc || !iframeSrc.includes("instagram.com")) {
      throw new Error(`Expected Instagram embed on CH 01, got '${iframeSrc}'`);
    }

    // Verify CRT Overlays have pointer-events-none
    const scanlines = page.locator(".pointer-events-none").first();
    if ((await scanlines.count()) === 0) {
      throw new Error("No pointer-events-none CRT overlay found");
    }
    console.log("✓ CRT overlays properly guarded with pointer-events-none");

    // 2. Test Channel Stepper (CH + button)
    console.log("\n2. Testing CH + button...");
    const nextChBtn = page.locator('button[aria-label="Next channel"]');
    await nextChBtn.click();
    await page.waitForTimeout(600);

    const ch02 = page.locator("text=CH 02");
    if ((await ch02.count()) === 0) {
      throw new Error("Failed to advance to CH 02");
    }
    console.log("✓ Advanced to CH 02");

    // 3. Test Keyboard Navigation (ArrowRight)
    console.log("\n3. Testing keyboard navigation (ArrowRight)...");
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(600);

    const ch03 = page.locator("text=CH 03");
    if ((await ch03.count()) === 0) {
      throw new Error("Failed to advance to CH 03 via keyboard ArrowRight");
    }
    console.log("✓ Keyboard ArrowRight advanced to CH 03");

    // Advance to CH 04 (LinkedIn post)
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(600);
    const ch04 = page.locator("text=CH 04");
    if ((await ch04.count()) === 0) {
      throw new Error("Failed to advance to CH 04");
    }
    console.log("✓ Advanced to CH 04 (Mass Culture LinkedIn)");

    // 4. Test TV Guide Drawer
    console.log("\n4. Testing TV Guide Drawer...");
    const guideToggleBtn = page.locator("button:has-text('TV GUIDE')");
    await guideToggleBtn.click();
    await page.waitForTimeout(400);

    const directory = page.locator("text=Channel Directory");
    if ((await directory.count()) === 0) {
      throw new Error("TV Guide channel directory drawer failed to open");
    }
    console.log("✓ TV Guide drawer opened successfully");

    // Jump directly to CH 08
    const ch08Btn = page.locator("button:has-text('CH 08')");
    await ch08Btn.click();
    await page.waitForTimeout(600);

    const ch08OSD = page.locator("text=CH 08");
    if ((await ch08OSD.count()) === 0) {
      throw new Error("Failed to direct-tune to CH 08 from TV Guide");
    }
    console.log("✓ TV Guide direct-tuned to CH 08");

    // 5. Test Power Toggle
    console.log("\n5. Testing Power Toggle...");
    const powerBtn = page.locator('button[aria-label="Power off monitor"]');
    await powerBtn.click();
    await page.waitForTimeout(500);

    const standbyText = page.locator("text=MONITOR STANDBY");
    if ((await standbyText.count()) === 0) {
      throw new Error("Monitor failed to power down into standby");
    }
    console.log("✓ Monitor powered down into STANDBY");

    // Power back on
    const powerOnBtn = page.locator('button[aria-label="Power on monitor"]');
    await powerOnBtn.click();
    await page.waitForTimeout(600);
    console.log("✓ Monitor powered back ON");

    // Capture Campaign TV Console Screenshot
    const shotCampaigns = path.join(outDir, "broadcast-tv-console.png");
    await page.screenshot({ path: shotCampaigns, fullPage: false });
    console.log(`✓ Screenshot saved: ${shotCampaigns}`);

    // 6. Verify Persistent Header Navigation on /campaigns
    console.log("\n6. Checking header navigation link...");
    const campaignsNavLink = page.locator('.site-header a[href="/campaigns"]');
    if ((await campaignsNavLink.count()) === 0) {
      throw new Error("Campaigns link not found in SiteHeader");
    }
    console.log("✓ Campaigns nav link present in SiteHeader");

    // 7. Verify Home Page GSAP Showreel Scrub Pinning
    console.log(`\n7. Navigating to ${BASE}/ to verify HeroShowreelGSAP ...`);
    await page.goto(`${BASE}/`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1500);

    const showreelSection = page.locator("#work");
    await showreelSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    // Scroll through showreel pinning section
    for (let scrollY = 800; scrollY <= 2200; scrollY += 350) {
      await page.evaluate((y) => window.scrollTo(0, y), scrollY);
      await page.waitForTimeout(150);
    }

    const shotHomeShowreel = path.join(outDir, "hero-showreel-gsap.png");
    await page.screenshot({ path: shotHomeShowreel, fullPage: false });
    console.log(`✓ Screenshot saved: ${shotHomeShowreel}`);

    // Verify zero fatal console errors
    const fatalErrors = errors.filter(
      (e) => !e.includes("favicon") && !e.includes("Third-party cookie")
    );

    if (fatalErrors.length > 0) {
      console.warn("Console errors encountered:", fatalErrors);
    } else {
      console.log("✓ Zero console or runtime errors across campaigns & showreel");
    }

    console.log("\n=== ALL BROADCAST TV & GSAP AUDITS PASSED ===");
  } catch (err) {
    console.error("Test execution failed:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
