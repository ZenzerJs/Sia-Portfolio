import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const suites = [
  { name: "Phase 1: Solid Background & Overlay Reset", file: "tests/phase-1-background.spec.mjs" },
  { name: "Phase 2: Header Cleanup & Hero Statement", file: "tests/phase-2-header-hero.spec.mjs" },
  { name: "Phase 3: Global UK English Copy Audit", file: "tests/phase-3-uk-copy.spec.mjs" },
  { name: "Phase 4: Page Re-ordering & Process Teardown", file: "tests/phase-4-hierarchy-process.spec.mjs" },
  { name: "Phase 5: Laptop CTA & AccordionGallery Integration", file: "tests/phase-5-laptop-accordion.spec.mjs" },
  { name: "Phase 6: Route Transitions & Scroll Restoration", file: "tests/phase-6-scroll-transitions.spec.mjs" },
  { name: "Phase 7: Case Study Asset & Route Audit", file: "tests/phase-7-case-studies.spec.mjs" },
  { name: "Phase 8: Connect Pop-out Modal Integration", file: "tests/phase-8-connect-modal.spec.mjs" },
];

console.log("=================================================");
console.log("    MASTER FULL-PASS VERIFICATION TEST RUNNER   ");
console.log("=================================================\n");

let passedCount = 0;
const results = [];

for (const suite of suites) {
  console.log(`\n▶ RUNNING: ${suite.name} (${suite.file})...`);
  try {
    const output = execSync(`node ${suite.file}`, { stdio: "inherit" });
    passedCount++;
    results.push({ name: suite.name, status: "PASSED" });
  } catch (err) {
    console.error(`✗ FAILED: ${suite.name}`);
    results.push({ name: suite.name, status: "FAILED" });
  }
}

console.log("\n=================================================");
console.log("                FINAL TEST MATRIX               ");
console.log("=================================================");
for (const res of results) {
  console.log(`[${res.status === "PASSED" ? "✓" : "✗"}] ${res.name}: ${res.status}`);
}
console.log(`\nTotal: ${passedCount}/${suites.length} Suites Passed`);
console.log("=================================================");

if (passedCount !== suites.length) {
  process.exit(1);
}
