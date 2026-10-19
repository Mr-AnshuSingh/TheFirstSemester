export type SubjectId = 'beee' | 'phy' | 'math' | 'ai' | 'cfet' | 'uhv' | 'pps' | 'eic';

export interface Unit {
  /** Unit title */
  t: string;
  /** Contact hours or Lab Experiment range (e.g. '8h', 'LE 1–3') */
  h: string;
  /** Syllabus topics (prefixed with '★ ' if exam favourite) */
  topics: string[];
  /** Plain-English explanation of the unit */
  s: string;
  /** Key moves / formulas to learn cold */
  k: string[];
}

export interface SvgDiagram {
  /** Raw notebook-styled SVG markup */
  svg: string;
  /** Caption explaining the 2D exam sketch */
  c: string;
}

export interface ExamStrategy {
  /** Almost-guaranteed exam questions */
  q: string[];
  /** How to answer for full marks */
  a: string[];
  /** Common traps that cost marks */
  x: string[];
}

export interface Subject {
  id: SubjectId;
  code: string;
  name: string;
  co: string;
  sub: string;
  fac: string;
  cr: number;
  tag: string;
  why: string;
  eff: number;
  ret: number;
  tint: string;
  bg: string;
  call: string;
  num?: string;
  topN?: number;
  units: Unit[];
  dg: SvgDiagram[];
  ex: ExamStrategy;
  fm: string[];
  hook: string;
}

export interface SceneStep {
  /** Step headline */
  t: string;
  /** Detailed step description */
  d: string;
  /** Whether items in this step are rendered exclusively during this step */
  only?: boolean;
}

export interface CameraConfig {
  yaw?: number;
  pitch?: number;
  zoom?: number;
  cy?: number;
}

export type Vec3 = [number, number, number];

export interface DrawOptions {
  c?: string;
  f?: string | null;
  w?: number;
  a?: number | string;
  d?: number[];
  sz?: number;
  b?: number | boolean;
  dx?: number;
  dy?: number;
  n?: 'x' | 'y' | 'z';
  seg?: number;
  nostroke?: boolean;
}

export interface SceneBuilderAPI {
  s(stepIndex: number): SceneBuilderAPI;
  L(pts: Vec3[], o?: DrawOptions): SceneBuilderAPI;
  A(p: Vec3, q: Vec3, o?: DrawOptions): SceneBuilderAPI;
  T(p: Vec3, str: string, o?: DrawOptions): SceneBuilderAPI;
  P(pts: Vec3[], o?: DrawOptions): SceneBuilderAPI;
  D(p: Vec3, r: number, o?: DrawOptions): SceneBuilderAPI;
  C(c: Vec3, r: number, o?: DrawOptions): SceneBuilderAPI;
  F(fn: (u: number) => Vec3, u0: number, u1: number, o?: DrawOptions): SceneBuilderAPI;
  X(c: Vec3, sz: Vec3, o?: DrawOptions): SceneBuilderAPI;
  Y(c: Vec3, r: number, h: number, o?: DrawOptions): SceneBuilderAPI;
  W(fn: (x: number, z: number) => number, xr: [number, number], zr: [number, number], n: number, o?: DrawOptions): SceneBuilderAPI;
  dyn(fn: (time: number, b: SceneBuilderAPI) => void): SceneBuilderAPI;
}

export interface SceneDefinition {
  cam?: CameraConfig;
  steps: SceneStep[];
  build: (B: SceneBuilderAPI) => void;
}

export type WorkedExampleMap = Record<string, string>;

export interface TimetableCell {
  k: SubjectId | 'lib' | 'x';
  l: string;
  g?: 'G1' | 'G2' | 'G1 & G2';
  h?: number;
}

export interface TimetableData {
  slots: string[];
  days: string[];
  full: string[];
  grid: TimetableCell[][];
}

export interface WeekCountdownItem {
  w: string;
  t: string;
  d: string[];
}

export interface PpsTraceFrame {
  line: number;
  explanation: string;
  variables: Record<string, string | number>;
  stdout?: string;
}

export interface PpsExperiment {
  id: string;
  codeNum: string;
  unitIndex: number;
  title: string;
  language: 'C' | 'C++';
  problem: string;
  code: string;
  sampleInput: string;
  expectedOutput: string;
  vivaTip: string;
  traceFrames: PpsTraceFrame[];
}

export interface TutorRequestPayload {
  subjectId: SubjectId;
  unitIndex: number;
  stepIndex: number;
  question: string;
}

export interface TutorResponsePayload {
  answer: string;
  markingSchemeSteps: string[];
  formulaHighlight: string[];
  trapWarning: string;
  contextUsed: {
    subjectName: string;
    subjectCode: string;
    unitTitle: string;
    activeStepTitle: string;
  };
}
