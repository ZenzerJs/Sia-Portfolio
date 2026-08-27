import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const PORT = 3016;
const BASE = `http://localhost:${PORT}`;
const outDir = path.resolve("./.antigravity/artifacts/phase-audit");
fs.mkdirSync(outDir, { recursive: true });

async function run() {
  console.log("=== PHASE 2 TEST: TESTIMONIAL CAROUSEL ARIA & MOTION AUDIT ===");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  try {
    console.log(`Navigating to ${BASE}/#testimonials ...`);
    await page.goto(`${BASE}/#testimonials`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(2000);

    const section = page.locator("#testimonials");
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);

    // 1. Verify polite live region exists and shows initial counter
    const counter = page.locator('#testimonials [aria-live="polite"]');
    if ((await counter.count()) === 0) {
      throw new Error("Missing aria-live='polite' counter region");
    }

    const initialText = await counter.innerText();
    console.log(`Initial Counter: "${initialText.trim()}"`);
    if (!initialText.includes("1 of 3")) {
      throw new Error(`Expected '1 of 3', got '${initialText}'`);
    }

    // 2. Test Pagination Next
    const nextBtn = page.locator('#testimonials button[aria-label="Next testimonial"]');
    await nextBtn.click();
    await page.waitForTimeout(600);

    const textAfterNext = await counter.innerText();
    console.log(`Counter after Next: "${textAfterNext.trim()}"`);
    if (!textAfterNext.includes("2 of 3")) {
      throw new Error(`Expected '2 of 3', got '${textAfterNext}'`);
    }

    // Next again
    await nextBtn.click();
    await page.waitForTimeout(600);
    const text3 = await counter.innerText();
    console.log(`Counter after 2nd Next: "${text3.trim()}"`);
    if (!text3.includes("3 of 3")) {
      throw new Error(`Expected '3 of 3', got '${text3}'`);
    }

    // Wrap around to 1
    await nextBtn.click();
    await page.waitForTimeout(600);
    const textWrap = await counter.innerText();
    console.log(`Counter after wrap: "${textWrap.trim()}"`);
    if (!textWrap.includes("1 of 3")) {
      throw new Error(`Expected '1 of 3' on wrap, got '${textWrap}'`);
    }

    // Test Pagination Prev (wrap to 3)
    const prevBtn = page.locator('#testimonials button[aria-label="Previous testimonial"]');
    await prevBtn.click();
    await page.waitForTimeout(600);
    const textPrev = await counter.innerText();
    console.log(`Counter after Prev wrap: "${textPrev.trim()}"`);
    if (!textPrev.includes("3 of 3")) {
      throw new Error(`Expected '3 of 3' on prev wrap, got '${textPrev}'`);
    }

    const shotPath = path.join(outDir, "phase-2-testimonials.png");
    await page.screenshot({ path: shotPath, fullPage: false });
    console.log(`✓ Screenshot saved: ${shotPath}`);

    if (errors.length > 0) {
      console.warn("Console errors:", errors);
    } else {
      console.log("✓ Zero console errors");
    }

    console.log("=== PHASE 2 TEST PASSED ===");
  } catch (err) {
    console.error("Phase 2 test failed:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
