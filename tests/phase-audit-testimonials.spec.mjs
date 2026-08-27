import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const PORT = 3016;
const BASE = `http://localhost:${PORT}`;
const outDir = path.resolve("./.antigravity/artifacts/phase-audit");
fs.mkdirSync(outDir, { recursive: true });

async function run() {
  console.log("=== TESTIMONIALS (KIND WORDS) UI AUDIT ===");
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

    // 1. Verify Header Layout & Dimensions
    const heading = page.locator("#testimonials-heading");
    const headingBox = await heading.boundingBox();
    console.log("Heading bounding box:", headingBox);

    const controls = testimonialsSec.locator('button[aria-label="Next testimonial"]');
    const controlsBox = await controls.boundingBox();
    console.log("Next button bounding box:", controlsBox);

    if (!headingBox || !controlsBox) {
      throw new Error("Could not compute bounding boxes for testimonials header");
    }

    const horizontalDistance = controlsBox.x - (headingBox.x + headingBox.width);
    console.log(`Horizontal gap between 'Kind words' and controls: ${horizontalDistance}px`);
    if (horizontalDistance < 200) {
      throw new Error(`Header items still squished! Distance was only ${horizontalDistance}px`);
    }
    console.log("✓ Header properly spaced with full-width justify-between layout");

    // 2. Verify Stepper Interaction
    const counter = testimonialsSec.locator("text=01 / 03");
    if ((await counter.count()) === 0) {
      throw new Error("Initial '01 / 03' counter not found");
    }
    console.log("✓ Initial '01 / 03' counter verified");

    // Click Next
    await controls.click();
    await page.waitForTimeout(500);

    const counter02 = testimonialsSec.locator("text=02 / 03");
    if ((await counter02.count()) === 0) {
      throw new Error("Failed to advance to 02 / 03");
    }
    console.log("✓ Successfully advanced to '02 / 03'");

    // 3. Verify Pagination Pill Interaction
    const pill3 = testimonialsSec.locator('button[aria-label="Go to testimonial 3"]');
    await pill3.click();
    await page.waitForTimeout(500);

    const counter03 = testimonialsSec.locator("text=03 / 03");
    if ((await counter03.count()) === 0) {
      throw new Error("Failed to advance to 03 / 03 via pagination pill");
    }
    console.log("✓ Successfully advanced to '03 / 03' via pill click");

    // 4. Capture screenshot
    const shotPath = path.join(outDir, "kind-words-fixed.png");
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

    console.log("\n=== ALL TESTIMONIAL AUDITS PASSED ===");
  } catch (err) {
    console.error("Test failed:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
