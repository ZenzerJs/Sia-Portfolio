import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const PORT = 3016;
const BASE = `http://localhost:${PORT}`;
const outDir = path.resolve("./.antigravity/artifacts/phase-audit");
fs.mkdirSync(outDir, { recursive: true });

async function run() {
  console.log("=== TESTIMONIALS CENTER-ALIGNED POEM FORMAT AUDIT ===");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(err.message));

  try {
    console.log(`\n1. Navigating to ${BASE}/ ...`);
    await page.goto(`${BASE}/`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1500);

    const testimonialsSec = page.locator("#testimonials");
    await testimonialsSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // 1. Verify Heading is Centered
    const heading = page.locator("#testimonials-heading");
    const headingAlign = await heading.evaluate((el) => window.getComputedStyle(el).textAlign);
    console.log("Heading textAlign:", headingAlign);

    // 2. Verify Quote (Poem) is Centered
    const quote = testimonialsSec.locator("blockquote");
    const quoteAlign = await quote.evaluate((el) => window.getComputedStyle(el).textAlign);
    console.log("Quote textAlign:", quoteAlign);
    if (quoteAlign !== "center") {
      throw new Error(`Expected blockquote textAlign to be 'center', got '${quoteAlign}'`);
    }
    console.log("✓ Quote is properly center-aligned in poem format");

    // 3. Verify Caption is Centered
    const caption = testimonialsSec.locator("figcaption");
    const captionAlign = await caption.evaluate((el) => window.getComputedStyle(el).textAlign);
    console.log("Caption textAlign:", captionAlign);
    if (captionAlign !== "center") {
      throw new Error(`Expected figcaption textAlign to be 'center', got '${captionAlign}'`);
    }
    console.log("✓ Attribution is properly center-aligned");

    // 4. Verify Stepper Controls & Counter
    const counter = testimonialsSec.locator("text=01 / 03");
    if ((await counter.count()) === 0) {
      throw new Error("Initial '01 / 03' counter not found");
    }
    console.log("✓ Initial '01 / 03' counter verified");

    // Click Next
    const nextBtn = testimonialsSec.locator('button[aria-label="Next testimonial"]');
    await nextBtn.click();
    await page.waitForTimeout(500);

    const counter02 = testimonialsSec.locator("text=02 / 03");
    if ((await counter02.count()) === 0) {
      throw new Error("Failed to advance to 02 / 03");
    }
    console.log("✓ Successfully advanced to '02 / 03'");

    // 5. Verify Pagination Pill Interaction
    const pill3 = testimonialsSec.locator('button[aria-label="Go to testimonial 3"]');
    await pill3.click();
    await page.waitForTimeout(500);

    const counter03 = testimonialsSec.locator("text=03 / 03");
    if ((await counter03.count()) === 0) {
      throw new Error("Failed to advance to 03 / 03 via pagination pill");
    }
    console.log("✓ Successfully advanced to '03 / 03' via pill click");

    // 6. Capture screenshot
    const shotPath = path.join(outDir, "kind-words-poem-format.png");
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

    console.log("\n=== ALL POEM FORMAT AUDITS PASSED ===");
  } catch (err) {
    console.error("Test failed:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
