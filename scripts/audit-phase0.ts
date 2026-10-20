import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const SCREENSHOTS_DIR = 'C:/Users/iansh/.gemini/antigravity-ide/brain/377bf497-3179-4cc1-af8f-25990da70afd/screenshots';

const RESOLUTIONS = [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1440x900', width: 1440, height: 900 },
  { name: '1280x720', width: 1280, height: 720 },
  { name: '1024x768', width: 1024, height: 768 },
  { name: '768x1024', width: 768, height: 1024 },
  { name: '390x844', width: 390, height: 844 },
];

async function runAudit() {
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const baseURL = 'http://localhost:3000';

  console.log('Starting screenshot audit across 6 resolutions for 4 views...');

  for (const res of RESOLUTIONS) {
    console.log(`\n--- Auditing ${res.name} (${res.width}x${res.height}) ---`);
    const context = await browser.newContext({
      viewport: { width: res.width, height: res.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    // 1. BEEE Unit 1
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await page.waitForSelector('#stage canvas', { timeout: 10000 });
    const beeeChip = page.locator('#subs button.chip').filter({ hasText: 'BEEE' });
    if (await beeeChip.count()) {
      await beeeChip.first().click({ force: true });
    }
    const unit1Btn = page.locator('#units button.un').first();
    if (await unit1Btn.count() && (await unit1Btn.isVisible())) {
      await unit1Btn.click({ force: true });
    }
    await page.waitForTimeout(600);
    const beee1Path = path.join(SCREENSHOTS_DIR, `beee_unit1_${res.name}.png`);
    await page.screenshot({ path: beee1Path, fullPage: false });
    console.log(`Saved: beee_unit1_${res.name}.png`);

    // 2. BEEE Unit 2 live step
    const unit2Btn = page.locator('#units button.un').nth(1);
    if (await unit2Btn.count() && (await unit2Btn.isVisible())) {
      await unit2Btn.click({ force: true });
      await page.waitForTimeout(600);
    }
    // Click live experiment button / badge or dot with force
    const liveBadge = page.locator('button:has-text("Live Experiment Lab")');
    if (await liveBadge.count() && (await liveBadge.isVisible())) {
      await liveBadge.click({ force: true });
    } else {
      const liveStepDot = page.locator('#cap .dots button').nth(5);
      if (await liveStepDot.count()) {
        await liveStepDot.click({ force: true });
      }
    }
    await page.waitForTimeout(800);
    const beee2LivePath = path.join(SCREENSHOTS_DIR, `beee_unit2_live_${res.name}.png`);
    await page.screenshot({ path: beee2LivePath, fullPage: false });
    console.log(`Saved: beee_unit2_live_${res.name}.png`);

    // 3. Physics Unit 1
    const phyChip = page.locator('#subs button.chip').filter({ hasText: 'Physics' });
    if (await phyChip.count()) {
      await phyChip.first().click({ force: true });
      await page.waitForTimeout(600);
    }
    const phyUnit1Btn = page.locator('#units button.un').first();
    if (await phyUnit1Btn.count() && (await phyUnit1Btn.isVisible())) {
      await phyUnit1Btn.click({ force: true });
      await page.waitForTimeout(600);
    }
    const phy1Path = path.join(SCREENSHOTS_DIR, `physics_unit1_${res.name}.png`);
    await page.screenshot({ path: phy1Path, fullPage: false });
    console.log(`Saved: physics_unit1_${res.name}.png`);

    // 4. PPS Unit 1
    const ppsChip = page.locator('#subs button.chip').filter({ hasText: 'PPS' });
    if (await ppsChip.count()) {
      await ppsChip.first().click({ force: true });
      await page.waitForTimeout(600);
    }
    const ppsUnit1Btn = page.locator('#units button.un').first();
    if (await ppsUnit1Btn.count() && (await ppsUnit1Btn.isVisible())) {
      await ppsUnit1Btn.click({ force: true });
      await page.waitForTimeout(600);
    }
    const pps1Path = path.join(SCREENSHOTS_DIR, `pps_unit1_${res.name}.png`);
    await page.screenshot({ path: pps1Path, fullPage: false });
    console.log(`Saved: pps_unit1_${res.name}.png`);

    await context.close();
  }

  // 5. Test AI Tutor with a sample question in offline mode
  console.log('\n--- Testing AI Tutor in Offline Mode ---');
  const tutorContext = await browser.newContext({
    viewport: { width: 1280, height: 720 },
  });
  const page = await tutorContext.newPage();

  // Intercept /api/tutor and simulate offline template response
  await page.route('**/api/tutor', async (route) => {
    const offlinePayload = {
      answer: `[Academic Syllabus Solution · Basics of Electrical & Electronics Engineering (100101) · Unit 1: DC Circuits]

1. Core Principle (Ohm’s law in a loop):
A battery pushes charge round a closed loop through resistors. V = IR: with E = 12 V and R₁ = 4 Ω, R₂ = 2 Ω in series, I = 12/(4 + 2) = 2 A. The same current passes every series element; conventional current flows from the + terminal, through the circuit, back to the - terminal.

2. Concept Explanation:
Voltage is electric pressure; current is the rate charge flows. A closed path lets current return to its source. Ohm’s law says current is proportional to voltage and inversely proportional to resistance. Series resistances add directly; parallel conductances add. KCL says charge cannot vanish at a junction; KVL says potential drops around any closed loop must balance the gains.

3. University Exam Worked Pattern:
Find current in 2Ω resistor using mesh analysis.
Loop 1: 10 - 2(I1 - I2) - 3I1 = 0 => 5I1 - 2I2 = 10
Loop 2: -4I2 - 2(I2 - I1) = 0 => -2I1 + 6I2 = 0 => I1 = 3I2
Substitute: 5(3I2) - 2I2 = 10 => 13I2 = 10 => I2 = 0.769 A
I_2Ω = I1 - I2 = 2I2 = 1.538 A

4. Exam Chant to Remember:
"Current enters +, leaves - on any passive load."`,
      markingSchemeSteps: [
        'State KCL/KVL clearly with mathematical equation (2 marks)',
        'Draw circuit diagram with labeled nodes and reference loop directions (3 marks)',
        'Set up independent mesh/nodal equations (4 marks)',
        'Solve simultaneous equations with correct units and signs (5 marks)',
      ],
      formulaHighlight: [
        'V = I · R',
        'Σ I_in = Σ I_out (KCL at junction)',
        'Σ V_drops = Σ V_sources (KVL in loop)',
      ],
      trapWarning: 'Always write units (V, A, Ω), signs, and a concluding sentence.',
      contextUsed: {
        subjectName: 'Basics of Electrical & Electronics Engineering',
        subjectCode: '100101',
        unitTitle: 'DC Circuits',
        activeStepTitle: 'Ohm’s law in a loop',
      },
      isLiveAi: false,
      source: 'offline_template',
    };
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(offlinePayload),
    });
  });

  await page.goto(baseURL, { waitUntil: 'networkidle' });
  await page.waitForSelector('#tabs', { timeout: 10000 });

  // Click on "AI Tutor" tab
  const tutorTab = page.locator('#tabs button').filter({ hasText: 'AI Tutor' });
  await tutorTab.click();
  await page.waitForTimeout(600);

  // Type sample question into textarea
  const textarea = page.locator('textarea').first();
  await textarea.fill('Explain KVL and KCL with sign convention for university exam');

  // Click Ask Tutor button
  const askBtn = page.locator('button').filter({ hasText: 'Ask Tutor' });
  await askBtn.click();

  // Wait for response card to appear
  await page.waitForSelector('text=Offline Syllabus Grounded', { timeout: 10000 });
  await page.waitForTimeout(1000);

  const tutorOfflinePath = path.join(SCREENSHOTS_DIR, 'ai_tutor_offline_test.png');
  await page.screenshot({ path: tutorOfflinePath, fullPage: false });
  console.log(`Saved: ai_tutor_offline_test.png`);

  await tutorContext.close();
  await browser.close();
  console.log('\nAll 25 audit screenshots captured successfully!');
}

runAudit().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
