import { chromium, Browser, Page } from '@playwright/test';
import { SUBJECTS } from '../src/data/subjects';

interface TextAuditFinding {
  type: string;
  viewport: string;
  context: string;
  selector: string;
  textSnippet: string;
  details: string;
  severity: 'high' | 'medium' | 'low';
}

const VIEWPORTS = [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1440x900', width: 1440, height: 900 },
  { name: '1280x720', width: 1280, height: 720 },
  { name: '1024x768', width: 1024, height: 768 },
  { name: '768x1024', width: 768, height: 1024 },
  { name: '390x844', width: 390, height: 844 },
];

// Helper to compute WCAG contrast ratio
function getContrastRatio(rgb1: [number, number, number], rgb2: [number, number, number]): number {
  const lum = (rgb: [number, number, number]) => {
    const a = rgb.map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };
  const l1 = lum(rgb1);
  const l2 = lum(rgb2);
  const brighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (brighter + 0.05) / (darker + 0.05);
}

function parseRgb(colorStr: string): [number, number, number] | null {
  const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return null;
  return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
}

async function auditPageDOM(page: Page, viewportName: string, contextName: string): Promise<TextAuditFinding[]> {
  const findings = await page.evaluate(({ vName, cName }) => {
    const list: any[] = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
    const elements: HTMLElement[] = [];
    let node: Node | null;
    while ((node = walker.nextNode())) {
      const el = node as HTMLElement;
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).visibility !== 'hidden' && window.getComputedStyle(el).display !== 'none') {
        elements.push(el);
      }
    }

    // 1. Check KaTeX errors
    const katexErrors = document.querySelectorAll('.katex-error');
    for (let i = 0; i < katexErrors.length; i++) {
      const el = katexErrors[i];
      list.push({
        type: 'katex-error',
        viewport: vName,
        context: cName,
        selector: el.className,
        textSnippet: (el.textContent || '').slice(0, 60),
        details: 'KaTeX parse error element in DOM',
        severity: 'high',
      });
    }

    // 2. Audit each visible element
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      const tag = el.tagName.toLowerCase();
      if (['script', 'style', 'path', 'line', 'polygon', 'circle'].indexOf(tag) !== -1) continue;

      const style = window.getComputedStyle(el);
      let text = '';
      if (el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE) {
        text = (el.childNodes[0].textContent || '').trim();
      } else if (el.children.length === 0) {
        text = (el.textContent || '').trim();
      }

      if (!text) continue;

      const classNameStr = typeof el.className === 'string' ? el.className : (el.getAttribute('class') || '');
      const classTokens = classNameStr.split(/\s+/).filter(Boolean);
      const selector = tag + (classTokens.length > 0 ? '.' + classTokens.slice(0, 2).join('.') : '');

      const fontSize = parseFloat(style.fontSize) || 16;
      const isBadge = classTokens.indexOf('badge') !== -1 || classTokens.indexOf('chip') !== -1 || el.getAttribute('role') === 'status';

      const isMath = el.closest('.katex') !== null || el.closest('.katex-mathml') !== null || ['math', 'mi', 'mo', 'mn', 'mfrac', 'mrow', 'annotation', 'mtext'].indexOf(tag) !== -1;
      if (isMath) {
        continue;
      }

      // (a) Font size below 14px (badges 12px allowed)
      if (isBadge) {
        if (fontSize < 12) {
          list.push({
            type: 'font-size-too-small',
            viewport: vName,
            context: cName,
            selector: selector,
            textSnippet: text.slice(0, 40),
            details: 'Badge font size is ' + fontSize.toFixed(1) + 'px (minimum allowed is 12px)',
            severity: 'medium',
          });
        }
      } else {
        if (fontSize < 13.5) {
          list.push({
            type: 'font-size-too-small',
            viewport: vName,
            context: cName,
            selector: selector,
            textSnippet: text.slice(0, 40),
            details: 'Text font size is ' + fontSize.toFixed(1) + 'px (minimum allowed is 14px)',
            severity: 'high',
          });
        }
      }

      // (b) Italic reading text
      if (style.fontStyle === 'italic' && ['p', 'span', 'li', 'div', 'article', 'section', 'em'].indexOf(tag) !== -1) {
        if (text.length > 3) {
          list.push({
            type: 'italic-reading-text',
            viewport: vName,
            context: cName,
            selector: selector,
            textSnippet: text.slice(0, 40),
            details: 'Reading text has italic style: "' + text.slice(0, 40) + '"',
            severity: 'medium',
          });
        }
      }

      // (c) Raw markdown or LaTeX symbols
      if (text.indexOf('**') !== -1 || text.indexOf('###') !== -1 || text.indexOf('$$\\') !== -1 || text.indexOf('\\begin') !== -1 || text.indexOf('\\boxed{') !== -1 || text.indexOf('\\frac') !== -1) {
        list.push({
          type: 'raw-markdown-or-latex',
          viewport: vName,
          context: cName,
          selector: selector,
          textSnippet: text.slice(0, 60),
          details: 'Contains visible unparsed markdown or LaTeX syntax',
          severity: 'high',
        });
      }

      // (d) Strings undefined, NaN, [object Object]
      if (/\b(?:NaN|\[object Object\])\b/.test(text) || /\bundefined\b(?!\s+(?:behaviour|behavior|reference|state|values|result|slope|symbol|variable))/i.test(text)) {
        list.push({
          type: 'corrupted-string',
          viewport: vName,
          context: cName,
          selector: selector,
          textSnippet: text.slice(0, 60),
          details: 'Contains Javascript artifact (undefined, NaN, or [object Object])',
          severity: 'high',
        });
      }

      // (e) Mojibake
      if (/[\u00C0-\u00FF][\u0080-\u00BF]|â€™|Ã|Γëñ|ΓÇô|ΓùÅ|Γåô|Γåæ|├ù/.test(text)) {
        list.push({
          type: 'mojibake',
          viewport: vName,
          context: cName,
          selector: selector,
          textSnippet: text.slice(0, 60),
          details: 'Contains mojibake encoding artifact',
          severity: 'high',
        });
      }

      // (f) Text clipped (skip intentionally visually-hidden screen reader elements)
      if (classTokens.indexOf('sr-only') === -1 && (style.overflow === 'hidden' || style.overflowX === 'hidden' || style.overflow === 'clip') && el.scrollWidth > el.clientWidth + 2) {
        list.push({
          type: 'text-clipped',
          viewport: vName,
          context: cName,
          selector: selector,
          textSnippet: text.slice(0, 40),
          details: 'Element text is clipped (scrollWidth: ' + el.scrollWidth + 'px > clientWidth: ' + el.clientWidth + 'px)',
          severity: 'medium',
        });
      }

      // (g) Wrapped or truncated button/tab/chip
      if ((['button', 'tab'].indexOf(tag) !== -1 || el.getAttribute('role') === 'tab' || isBadge) && style.whiteSpace !== 'nowrap') {
        const lh = parseFloat(style.lineHeight) || fontSize;
        const lines = Math.round(el.clientHeight / lh);
        if (lines > 2 && text.length < 30) {
          list.push({
            type: 'wrapped-button-or-tab',
            viewport: vName,
            context: cName,
            selector: selector,
            textSnippet: text.slice(0, 40),
            details: 'Button/tab label unexpectedly wrapped across ' + lines + ' lines',
            severity: 'low',
          });
        }
      }

      // (h) WCAG Contrast
      const m = style.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      const fg = m ? [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])] : null;
      
      // Traverse ancestors to compute composite background color considering alpha transparency
      let curEl: HTMLElement | null = el as HTMLElement;
      let compositeBg = [246, 240, 225]; // base parchment
      const layers: { r: number; g: number; b: number; a: number }[] = [];
      while (curEl && curEl !== document.documentElement) {
        const curStyle = window.getComputedStyle(curEl);
        const bgM = curStyle.backgroundColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/);
        if (bgM) {
          const a = bgM[4] !== undefined ? parseFloat(bgM[4]) : 1;
          if (a > 0.01) {
            layers.unshift({
              r: parseInt(bgM[1]),
              g: parseInt(bgM[2]),
              b: parseInt(bgM[3]),
              a: a,
            });
            if (a >= 0.98) break;
          }
        }
        curEl = curEl.parentElement;
      }
      for (let i = 0; i < layers.length; i++) {
        const layer = layers[i];
        compositeBg = [
          Math.round(layer.a * layer.r + (1 - layer.a) * compositeBg[0]),
          Math.round(layer.a * layer.g + (1 - layer.a) * compositeBg[1]),
          Math.round(layer.a * layer.b + (1 - layer.a) * compositeBg[2]),
        ];
      }
      const bg = compositeBg;

      if (fg && bg) {
        let l1 = 0;
        let l2 = 0;
        for (let ch = 0; ch < 3; ch++) {
          let v1 = fg[ch] / 255;
          let v2 = bg[ch] / 255;
          v1 = v1 <= 0.03928 ? v1 / 12.92 : Math.pow((v1 + 0.055) / 1.055, 2.4);
          v2 = v2 <= 0.03928 ? v2 / 12.92 : Math.pow((v2 + 0.055) / 1.055, 2.4);
          const weight = ch === 0 ? 0.2126 : ch === 1 ? 0.7152 : 0.0722;
          l1 += v1 * weight;
          l2 += v2 * weight;
        }
        const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        if (ratio < 4.5 && fontSize < 18) {
          list.push({
            type: 'low-contrast',
            viewport: vName,
            context: cName,
            selector: selector,
            textSnippet: text.slice(0, 40),
            details: 'Contrast ratio is ' + ratio.toFixed(2) + ':1 (< 4.5:1 required by WCAG AA, fg: ' + JSON.stringify(fg) + ', bg: ' + JSON.stringify(bg) + ')',
            severity: 'medium',
          });
        }
      }
    }

    return list;
  }, { vName: viewportName, cName: contextName });

  return findings || [];
}

export async function runTextAudit(): Promise<void> {
  console.log('====================================================');
  console.log('LNJPIT Semester I: Starting Comprehensive Text Audit');
  console.log('====================================================');

  const browser = await chromium.launch({ headless: true });
  const baseURL = 'http://localhost:3000';
  const allFindings: TextAuditFinding[] = [];

  // Sample 3 units per subject: units 0, 1, 2
  const sampleSuites: { subjectId: string; unitIndex: number }[] = [];
  SUBJECTS.forEach((sub) => {
    const maxUnits = Math.min(3, sub.units.length);
    for (let u = 0; u < maxUnits; u++) {
      sampleSuites.push({ subjectId: sub.id, unitIndex: u });
    }
  });

  console.log(`Auditing across ${VIEWPORTS.length} viewports for ${sampleSuites.length} unit samples...`);

  for (const vp of VIEWPORTS) {
    console.log(`\nAuditing Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    for (const sample of sampleSuites) {
      const url = `${baseURL}/?subject=${sample.subjectId}&unit=${sample.unitIndex + 1}`;
      try {
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(600);

        // 1. Audit Explain Tab
        const explainFindings = await auditPageDOM(page, vp.name, `${sample.subjectId}-u${sample.unitIndex + 1}-Explain`);
        allFindings.push(...explainFindings);

        // 2. Audit Notes Tab
        const notesTab = page.locator('#tabs button:has-text("Notes")');
        if (await notesTab.count() && (await notesTab.first().isVisible())) {
          await notesTab.first().click();
          await page.waitForTimeout(200);
          const notesFindings = await auditPageDOM(page, vp.name, `${sample.subjectId}-u${sample.unitIndex + 1}-Notes`);
          allFindings.push(...notesFindings);
        }

        // 3. Audit Topics Tab
        const topicsTab = page.locator('#tabs button:has-text("Topics")');
        if (await topicsTab.count() && (await topicsTab.first().isVisible())) {
          await topicsTab.first().click();
          await page.waitForTimeout(200);
          const topicsFindings = await auditPageDOM(page, vp.name, `${sample.subjectId}-u${sample.unitIndex + 1}-Topics`);
          allFindings.push(...topicsFindings);
        }

        // 4. Audit Quiz Tab
        const quizTab = page.locator('#tabs button:has-text("Quiz")');
        if (await quizTab.count() && (await quizTab.first().isVisible())) {
          await quizTab.first().click();
          await page.waitForTimeout(200);
          const quizFindings = await auditPageDOM(page, vp.name, `${sample.subjectId}-u${sample.unitIndex + 1}-Quiz`);
          allFindings.push(...quizFindings);
        }

        // 5. Audit Exam Tab
        const examTab = page.locator('#tabs button:has-text("Exam")');
        if (await examTab.count() && (await examTab.first().isVisible())) {
          await examTab.first().click();
          await page.waitForTimeout(200);
          const examFindings = await auditPageDOM(page, vp.name, `${sample.subjectId}-u${sample.unitIndex + 1}-Exam`);
          allFindings.push(...examFindings);
        }

        // 6. Audit AI Tutor Tab
        const tutorTab = page.locator('#tabs button:has-text("AI Tutor")');
        if (await tutorTab.count() && (await tutorTab.first().isVisible())) {
          await tutorTab.first().click();
          await page.waitForTimeout(200);
          const tutorFindings = await auditPageDOM(page, vp.name, `${sample.subjectId}-u${sample.unitIndex + 1}-Tutor`);
          allFindings.push(...tutorFindings);
        }

        // 7. Audit 2D Viewer
        const mode2dBtn = page.locator('button:has-text("2D")');
        if (await mode2dBtn.count() && (await mode2dBtn.first().isVisible())) {
          await mode2dBtn.first().click();
          await page.waitForTimeout(200);
          const viewerFindings = await auditPageDOM(page, vp.name, `${sample.subjectId}-u${sample.unitIndex + 1}-2DViewer`);
          allFindings.push(...viewerFindings);
          // Toggle back to 3D
          const mode3dBtn = page.locator('button:has-text("3D")');
          if (await mode3dBtn.count()) await mode3dBtn.first().click();
        }
      } catch (e) {
        console.warn(`Warning auditing ${sample.subjectId} unit ${sample.unitIndex + 1}:`, e);
      }
    }

    // Audit Modals for this Viewport (once per viewport)
    try {
      await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(400);

      // (a) All Notes Modal
      const toolsBtn = page.locator('button:has-text("Tools")');
      if (await toolsBtn.count()) {
        await toolsBtn.click();
        await page.waitForTimeout(200);
      }
      const allNotesBtn = page.locator('button:has-text("All notes"), a:has-text("All notes")');
      if (await allNotesBtn.count() && (await allNotesBtn.first().isVisible())) {
        await allNotesBtn.first().click();
        await page.waitForTimeout(300);
        allFindings.push(...(await auditPageDOM(page, vp.name, 'Modal-AllNotes')));
        await page.keyboard.press('Escape');
        await page.waitForTimeout(200);
      }

      // (b) Formulas Modal
      if (await toolsBtn.count()) {
        await toolsBtn.click();
        await page.waitForTimeout(200);
      }
      const formulasBtn = page.locator('button:has-text("Formulas")');
      if (await formulasBtn.count() && (await formulasBtn.first().isVisible())) {
        await formulasBtn.first().click();
        await page.waitForTimeout(300);
        allFindings.push(...(await auditPageDOM(page, vp.name, 'Modal-Formulas')));
        await page.keyboard.press('Escape');
        await page.waitForTimeout(200);
      }

      // (c) Exam Plan / Schedule Modal
      const scheduleBtn = page.locator('button:has-text("Schedule"), button:has-text("Exam plan")');
      if (await scheduleBtn.count() && (await scheduleBtn.first().isVisible())) {
        await scheduleBtn.first().click();
        await page.waitForTimeout(300);
        allFindings.push(...(await auditPageDOM(page, vp.name, 'Modal-ExamPlan')));
        await page.keyboard.press('Escape');
        await page.waitForTimeout(200);
      }

      // (d) Backup Modal
      if (await toolsBtn.count()) {
        await toolsBtn.click();
        await page.waitForTimeout(200);
      }
      const backupBtn = page.locator('button:has-text("Backup")');
      if (await backupBtn.count() && (await backupBtn.first().isVisible())) {
        await backupBtn.first().click();
        await page.waitForTimeout(300);
        allFindings.push(...(await auditPageDOM(page, vp.name, 'Modal-Backup')));
        await page.keyboard.press('Escape');
        await page.waitForTimeout(200);
      }

      // (e) Command Palette (Search Ctrl+K)
      const searchBtn = page.locator('button:has-text("Search Ctrl+K")');
      if (await searchBtn.count() && (await searchBtn.first().isVisible())) {
        await searchBtn.first().click();
        await page.waitForTimeout(300);
        allFindings.push(...(await auditPageDOM(page, vp.name, 'Modal-CommandPalette')));
        await page.keyboard.press('Escape');
        await page.waitForTimeout(200);
      }
    } catch (e) {
      console.warn('Warning auditing modals:', e);
    }

    await context.close();
  }

  await browser.close();

  // Summary and aggregation
  console.log('\n====================================================');
  console.log('AUDIT-TEXT SUMMARY REPORT');
  console.log('====================================================');
  const typeCounts: Record<string, number> = {};
  allFindings.forEach((f) => {
    typeCounts[f.type] = (typeCounts[f.type] || 0) + 1;
  });

  console.table(typeCounts);

  console.log('\nTOP 10 WORST OFFENDERS / SAMPLES:');
  const top10 = allFindings.slice(0, 10);
  top10.forEach((f, idx) => {
    console.log(`${idx + 1}. [${f.type}] (${f.viewport} | ${f.context})`);
    console.log(`   Selector: ${f.selector}`);
    console.log(`   Snippet: "${f.textSnippet}"`);
    console.log(`   Details: ${f.details}\n`);
  });

  // Save audit results to JSON
  const outPath = 'scripts/audit-text-results.json';
  const fs = await import('fs');
  fs.writeFileSync(outPath, JSON.stringify({ total: allFindings.length, typeCounts, findings: allFindings }, null, 2));
  console.log(`Detailed audit log saved to ${outPath}`);
}

if (require.main === module || process.argv[1]?.includes('audit-text')) {
  runTextAudit().catch((err) => {
    console.error('Fatal in runTextAudit:', err);
    process.exit(1);
  });
}
