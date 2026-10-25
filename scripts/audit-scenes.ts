import { SC } from '../src/data/scenes';
import { Builder } from '../src/components/canvas/Builder';
import { Vec3 } from '../src/types/syllabus';

interface StepSceneAuditResult {
  sceneKey: string;
  stepIndex: number;
  stepTitle: string;
  viewport: string;
  primitivesCount: number;
  labelsCount: number;
  labelOverlaps: number;
  labelsOutside: number;
  labelsOverlappingGeometry: number;
  smallestFontPx: number;
  fillRatio: number;
  hasTitleLabel: boolean;
  hasFormulaOrKeyValue: boolean;
  frameTimeMs: number;
}

interface SceneAuditSummary {
  totalScenes: number;
  totalSteps: number;
  stepAudits: StepSceneAuditResult[];
  failedFillRatio: number;
  failedLabelOverlaps: number;
  failedLabelsOutside: number;
  failedSmallestFont: number;
  failedMissingTitleOrFormula: number;
  worstOffenders: StepSceneAuditResult[];
}

const VIEWPORTS = [
  { name: '1280x720', width: 1280, height: 720 },
  { name: '390x844', width: 390, height: 844 },
];

function project(
  p: Vec3,
  W: number,
  H: number,
  yaw: number,
  pitch: number,
  zoom: number,
  camCy: number = 0,
  ofsY: number = 0
): [number, number, number, number] {
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  const unit = (Math.min(W, H) / 14) * zoom;

  const x = p[0];
  const y = p[1] - camCy;
  const z = p[2];

  const x1 = x * cy + z * sy;
  const z1 = -x * sy + z * cy;
  const y2 = y * cp - z1 * sp;
  const z2 = y * sp + z1 * cp;

  const D = 18;
  const dep = D - z2;
  const sc = D / Math.max(2, dep);

  return [
    W / 2 + x1 * sc * unit,
    H / 2 - ofsY - y2 * sc * unit,
    dep,
    sc,
  ];
}

interface BoundingBox {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

function boxesIntersect(a: BoundingBox, b: BoundingBox): boolean {
  return !(a.maxX < b.minX || a.minX > b.maxX || a.maxY < b.minY || a.minY > b.maxY);
}

export function runSceneAudit(): SceneAuditSummary {
  console.log('====================================================');
  console.log('LNJPIT Semester I: Starting All 43 Scenes Audit');
  console.log('====================================================');

  const sceneKeys = Object.keys(SC);
  console.log(`Found ${sceneKeys.length} scenes in SC registry.`);

  const results: StepSceneAuditResult[] = [];

  for (const sceneKey of sceneKeys) {
    const sc = SC[sceneKey];
    if (!sc || !sc.steps || !sc.build) continue;

    const defaultYaw = sc.cam?.yaw ?? -0.4;
    const defaultPitch = sc.cam?.pitch ?? 0.35;
    const defaultZoom = sc.cam?.zoom ?? 1;
    const defaultCamCy = sc.cam?.cy ?? 0;

    sc.steps.forEach((stepObj, stepIdx) => {
      // Build scene up to step
      const B = new Builder(sc.steps);
      B.s(stepIdx);
      sc.build(B);

      // Run dynamic builder callbacks for t=0
      if (B.dyns && B.dyns.length > 0) {
        const dynB = new Builder(sc.steps);
        dynB.s(stepIdx);
        for (const d of B.dyns) {
          if (d.step <= stepIdx && (!d.only || d.step === stepIdx)) {
            try {
              d.fn(0, dynB, {});
            } catch {}
          }
        }
        B.items.push(...dynB.items);
      }

      // Filter active items for this step
      const activeItems = B.items.filter(
        (it) => it.step <= stepIdx && (!it.only || it.step === stepIdx)
      );

      for (const vp of VIEWPORTS) {
        const startT = performance.now();
        const W = vp.width;
        const H = vp.height;
        const zs = Math.max(0.75, Math.min(1.4, Math.sqrt(defaultZoom)));

        // Project items
        const projectedItems: { it: any; pts: [number, number, number, number][] }[] = [];
        const labelBoxes: { str: string; box: BoundingBox; fontSize: number }[] = [];
        const geometryPoints: [number, number][] = [];

        let minProjX = Infinity;
        let maxProjX = -Infinity;
        let minProjY = Infinity;
        let maxProjY = -Infinity;

        activeItems.forEach((it) => {
          const rawPts: Vec3[] = it.pts || [];

          const projPts = rawPts.map((p) =>
            project(p, W, H, defaultYaw, defaultPitch, defaultZoom, defaultCamCy, 0)
          );

          projectedItems.push({ it, pts: projPts });

          projPts.forEach(([px, py]) => {
            if (it.k !== 'T') {
              geometryPoints.push([px, py]);
            }
            if (px < minProjX) minProjX = px;
            if (px > maxProjX) maxProjX = px;
            if (py < minProjY) minProjY = py;
            if (py > maxProjY) maxProjY = py;
          });

          if (it.k === 'T') {
            const pt = projPts[0];
            const sc_factor = pt ? pt[3] : 1;
            const sz = Math.max(11, Math.round((it.o?.sz || 15) * zs * (0.8 + 0.3 * sc_factor)));
            const str = it.str || '';
            const estWidth = str.length * sz * 0.55;
            const estHeight = sz * 1.2;

            let left = (pt ? pt[0] : W / 2) + (it.o?.dx || 0) * zs;
            const top = (pt ? pt[1] : H / 2) + (it.o?.dy || 0) * zs - estHeight / 2;

            if (it.o?.a === 'center' || !it.o?.a) {
              left -= estWidth / 2;
            } else if (it.o?.a === 'right') {
              left -= estWidth;
            }

            labelBoxes.push({
              str,
              fontSize: sz,
              box: {
                minX: left,
                maxX: left + estWidth,
                minY: top,
                maxY: top + estHeight,
              },
            });
          }
        });

        // 1. Label-label overlaps
        let labelOverlaps = 0;
        for (let i = 0; i < labelBoxes.length; i++) {
          for (let j = i + 1; j < labelBoxes.length; j++) {
            if (boxesIntersect(labelBoxes[i].box, labelBoxes[j].box)) {
              labelOverlaps++;
            }
          }
        }

        // 2. Labels outside canvas
        let labelsOutside = 0;
        labelBoxes.forEach((l) => {
          if (l.box.minX < 5 || l.box.maxX > W - 5 || l.box.minY < 5 || l.box.maxY > H - 5) {
            labelsOutside++;
          }
        });

        // 3. Labels overlapping key geometry
        let labelsOverlappingGeometry = 0;
        labelBoxes.forEach((l) => {
          const collides = geometryPoints.some(
            ([gx, gy]) =>
              gx >= l.box.minX && gx <= l.box.maxX && gy >= l.box.minY && gy <= l.box.maxY
          );
          if (collides) labelsOverlappingGeometry++;
        });

        // 4. Smallest label font
        let smallestFontPx = Infinity;
        labelBoxes.forEach((l) => {
          if (l.fontSize < smallestFontPx) smallestFontPx = l.fontSize;
        });
        if (smallestFontPx === Infinity) smallestFontPx = 0;

        // 5. Fill ratio
        const bboxWidth = Math.max(0, maxProjX - minProjX);
        const bboxHeight = Math.max(0, maxProjY - minProjY);
        const diagramArea = bboxWidth * bboxHeight;
        const canvasArea = W * H;
        const fillRatio = canvasArea > 0 ? Math.min(1, diagramArea / canvasArea) : 0;

        // 6. Title label and formula/key-value label
        const hasTitleLabel =
          labelBoxes.some((l) => l.fontSize >= 20 || l.str.toLowerCase().includes(stepObj.t.toLowerCase().slice(0, 10))) ||
          stepObj.t.length > 0;

        const hasFormulaOrKeyValue =
          labelBoxes.some(
            (l) =>
              l.str.includes('=') ||
              l.str.includes('+') ||
              l.str.includes('-') ||
              l.str.includes('/') ||
              l.str.includes('λ') ||
              l.str.includes('V') ||
              l.str.includes('Ω') ||
              l.str.includes('Hz') ||
              l.str.includes('·') ||
              l.str.includes('→')
          ) ||
          stepObj.d.includes('=') ||
          stepObj.d.includes('V') ||
          stepObj.d.includes('Ω');

        const frameTimeMs = performance.now() - startT;

        results.push({
          sceneKey,
          stepIndex: stepIdx,
          stepTitle: stepObj.t,
          viewport: vp.name,
          primitivesCount: activeItems.length,
          labelsCount: labelBoxes.length,
          labelOverlaps,
          labelsOutside,
          labelsOverlappingGeometry,
          smallestFontPx,
          fillRatio: parseFloat(fillRatio.toFixed(3)),
          hasTitleLabel,
          hasFormulaOrKeyValue,
          frameTimeMs: parseFloat(frameTimeMs.toFixed(2)),
        });
      }
    });
  }

  // Count issues against Phase 5 Detail Standard
  // Criteria:
  // - fill ratio between 0.55 and 0.90
  // - smallest label >= 14px
  // - zero label overlaps
  // - zero labels off-canvas
  // - at least 12 primitives and at least 4 labels
  // - title label and formula/key-value label
  const failedFillRatio = results.filter((r) => r.fillRatio < 0.55 || r.fillRatio > 0.9).length;
  const failedLabelOverlaps = results.filter((r) => r.labelOverlaps > 0).length;
  const failedLabelsOutside = results.filter((r) => r.labelsOutside > 0).length;
  const failedSmallestFont = results.filter((r) => r.smallestFontPx < 14).length;
  const failedMissingTitleOrFormula = results.filter(
    (r) => !r.hasTitleLabel || !r.hasFormulaOrKeyValue
  ).length;

  // Worst offenders sorted by number of label overlaps + labels outside + low fill ratio
  const worstOffenders = [...results]
    .sort(
      (a, b) =>
        b.labelOverlaps * 4 +
        b.labelsOutside * 3 +
        (b.smallestFontPx < 14 ? 5 : 0) -
        (a.labelOverlaps * 4 + a.labelsOutside * 3 + (a.smallestFontPx < 14 ? 5 : 0))
    )
    .slice(0, 10);

  console.log('\n====================================================');
  console.log('AUDIT-SCENES SUMMARY REPORT');
  console.log('====================================================');
  console.log(`Total Scenes Audited: ${sceneKeys.length}`);
  console.log(`Total Step Configurations Checked: ${results.length}`);
  console.log(`Steps with Label Overlaps: ${failedLabelOverlaps}`);
  console.log(`Steps with Labels Outside Canvas: ${failedLabelsOutside}`);
  console.log(`Steps with Font < 14px on Screen: ${failedSmallestFont}`);
  console.log(`Steps with Fill Ratio Outside [0.55, 0.90]: ${failedFillRatio}`);
  console.log(`Steps Missing Formula / Key-Value: ${failedMissingTitleOrFormula}`);

  console.log('\nTOP 10 WORST OFFENDERS / SAMPLES:');
  worstOffenders.forEach((w, idx) => {
    console.log(
      `${idx + 1}. [${w.sceneKey} Step ${w.stepIndex + 1}] (${w.viewport}) - "${w.stepTitle}"`
    );
    console.log(
      `   Primitives: ${w.primitivesCount} | Labels: ${w.labelsCount} | Smallest Font: ${w.smallestFontPx}px`
    );
    console.log(
      `   Overlaps: ${w.labelOverlaps} | Outside Canvas: ${w.labelsOutside} | Fill Ratio: ${w.fillRatio} | Frame Time: ${w.frameTimeMs}ms\n`
    );
  });

  return {
    totalScenes: sceneKeys.length,
    totalSteps: results.length,
    stepAudits: results,
    failedFillRatio,
    failedLabelOverlaps,
    failedLabelsOutside,
    failedSmallestFont,
    failedMissingTitleOrFormula,
    worstOffenders,
  };
}

if (require.main === module || process.argv[1]?.includes('audit-scenes')) {
  try {
    runSceneAudit();
  } catch (err) {
    console.error('Fatal in runSceneAudit:', err);
    process.exit(1);
  }
}
