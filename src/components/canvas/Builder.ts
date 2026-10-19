import { CameraConfig, DrawOptions, SceneBuilderAPI, SceneDefinition, SceneStep, Vec3 } from '@/types/syllabus';

export const PI = Math.PI;
export const sin = Math.sin;
export const cos = Math.cos;
export const sqrt = Math.sqrt;
export const abs = Math.abs;
export const exp = Math.exp;
export const pow = Math.pow;
export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

export const COL = {
  ink: '#2b2a28',
  red: '#d4572b',
  teal: '#2a7f78',
  gold: '#d49a14',
  blue: '#3567a6',
  green: '#5b8a39',
  gray: '#8d877a',
  pink: '#c8577a',
  paper: '#f6f0e1',
  bg: '#f6f0e1',
} as const;

export const v3 = {
  add: (a: Vec3, b: Vec3): Vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]],
  sub: (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]],
  mul: (a: Vec3, k: number): Vec3 => [a[0] * k, a[1] * k, a[2] * k],
  cross: (a: Vec3, b: Vec3): Vec3 => [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ],
  norm: (a: Vec3): Vec3 => {
    const l = Math.hypot(a[0], a[1], a[2]) || 1;
    return [a[0] / l, a[1] / l, a[2] / l];
  },
  lerp: (a: Vec3, b: Vec3, t: number): Vec3 => [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ],
};

export interface PrimitiveItem {
  k: 'L' | 'A' | 'T' | 'P' | 'D';
  pts: Vec3[];
  str?: string;
  r?: number;
  o: DrawOptions;
  step: number;
  only: boolean;
  id: number;
}

export interface DynamicCallback {
  fn: (time: number, b: Builder, params?: Record<string, number>) => void;
  step: number;
  only: boolean;
}

export class Builder implements SceneBuilderAPI {
  items: PrimitiveItem[] = [];
  steps: SceneStep[];
  step = 0;
  only = false;
  dyns: DynamicCallback[] = [];
  idBase = 0;

  constructor(steps?: SceneStep[]) {
    this.steps = steps || [];
  }

  s(n: number): this {
    this.step = n;
    this.only = !!(this.steps[n] && this.steps[n].only) || (n === 0 && !!(this.steps[1] && this.steps[1].only));
    return this;
  }

  private _p(o: Omit<PrimitiveItem, 'step' | 'only' | 'id'>): this {
    const item: PrimitiveItem = {
      ...o,
      step: this.step,
      only: this.only,
      id: this.items.length + 1 + (this.idBase || 0),
    };
    this.items.push(item);
    return this;
  }

  L(pts: Vec3[], o: DrawOptions = {}): this {
    return this._p({ k: 'L', pts, o });
  }

  A(p: Vec3, q: Vec3, o: DrawOptions = {}): this {
    return this._p({ k: 'A', pts: [p, q], o });
  }

  T(p: Vec3, str: string, o: DrawOptions = {}): this {
    return this._p({ k: 'T', pts: [p], str, o });
  }

  P(pts: Vec3[], o: DrawOptions = {}): this {
    return this._p({ k: 'P', pts, o });
  }

  D(p: Vec3, r: number, o: DrawOptions = {}): this {
    return this._p({ k: 'D', pts: [p], r, o });
  }

  C(c: Vec3, r: number, o: DrawOptions = {}): this {
    const n = o.n || 'y';
    const pts: Vec3[] = [];
    const N = 40;
    for (let i = 0; i <= N; i++) {
      const a = (i / N) * 2 * PI;
      const u = cos(a) * r;
      const v = sin(a) * r;
      pts.push(
        n === 'y'
          ? [c[0] + u, c[1], c[2] + v]
          : n === 'z'
          ? [c[0] + u, c[1] + v, c[2]]
          : [c[0], c[1] + u, c[2] + v]
      );
    }
    return o.f ? this.P(pts, o) : this.L(pts, o);
  }

  F(fn: (u: number) => Vec3, u0: number, u1: number, o: DrawOptions = {}): this {
    const n = o.seg || 48;
    const pts: Vec3[] = [];
    for (let i = 0; i <= n; i++) {
      pts.push(fn(u0 + ((u1 - u0) * i) / n));
    }
    return this.L(pts, o);
  }

  X(c: Vec3, sz: Vec3, o: DrawOptions = {}): this {
    const [x, y, z] = c;
    const [w, h, d] = [sz[0] / 2, sz[1] / 2, sz[2] / 2];
    const q = (a: number[][]): Vec3[] => a.map((p) => [x + p[0] * w, y + p[1] * h, z + p[2] * d]);
    const f = [
      [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]],
      [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1]],
      [[-1, 1, -1], [1, 1, -1], [1, 1, 1], [-1, 1, 1]],
      [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]],
      [[1, -1, -1], [1, 1, -1], [1, 1, 1], [1, -1, 1]],
      [[-1, -1, -1], [-1, 1, -1], [-1, 1, 1], [-1, -1, 1]],
    ];
    f.forEach((a) => this.P(q(a), Object.assign({ a: 0.22 }, o)));
    return this;
  }

  Y(c: Vec3, r: number, h: number, o: DrawOptions = {}): this {
    const n = 18;
    const [x, y, z] = c;
    for (let i = 0; i < n; i++) {
      const a0 = (i / n) * 2 * PI;
      const a1 = ((i + 1) / n) * 2 * PI;
      this.P(
        [
          [x + cos(a0) * r, y, z + sin(a0) * r],
          [x + cos(a1) * r, y, z + sin(a1) * r],
          [x + cos(a1) * r, y + h, z + sin(a1) * r],
          [x + cos(a0) * r, y + h, z + sin(a0) * r],
        ],
        Object.assign({ a: 0.2, nostroke: true }, o)
      );
    }
    this.C([x, y + h, z], r, Object.assign({ f: o.f, a: 0.3 }, o));
    this.C([x, y, z], r, Object.assign({}, o, { f: null }));
    return this;
  }

  W(
    fn: (x: number, z: number) => number,
    xr: [number, number],
    zr: [number, number],
    n: number,
    o: DrawOptions = {}
  ): this {
    for (let i = 0; i <= n; i++) {
      const x = xr[0] + ((xr[1] - xr[0]) * i) / n;
      const z = zr[0] + ((zr[1] - zr[0]) * i) / n;
      this.L(
        Array.from({ length: n + 1 }, (_, j) => {
          const zz = zr[0] + ((zr[1] - zr[0]) * j) / n;
          return [x, fn(x, zz), zz] as Vec3;
        }),
        Object.assign({ w: 1.2 }, o)
      );
      this.L(
        Array.from({ length: n + 1 }, (_, j) => {
          const xx = xr[0] + ((xr[1] - xr[0]) * j) / n;
          return [xx, fn(xx, z), z] as Vec3;
        }),
        Object.assign({ w: 1.2 }, o)
      );
    }
    return this;
  }

  dyn(fn: (time: number, b: Builder, params?: Record<string, number>) => void): this {
    this.dyns.push({ fn, step: this.step, only: this.only });
    return this;
  }
}

export function plane(B: SceneBuilderAPI, P: Vec3, n: Vec3, s: number, o: DrawOptions = {}) {
  const a: Vec3 = abs(n[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
  const u = v3.norm(v3.cross(n, a));
  const v = v3.norm(v3.cross(n, u));
  B.P(
    [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
    ].map(([i, j]) => [
      P[0] + u[0] * i * s + v[0] * j * s,
      P[1] + u[1] * i * s + v[1] * j * s,
      P[2] + u[2] * i * s + v[2] * j * s,
    ]),
    o
  );
}

export function axes(
  B: SceneBuilderAPI,
  l = 4,
  lab: [string, string, string] = ['x', 'y', 'z'],
  o: DrawOptions = { c: COL.gray }
) {
  B.A([-l, 0, 0], [l, 0, 0], o);
  B.A([0, -l * 0.6, 0], [0, l * 0.8, 0], o);
  B.A([0, 0, -l], [0, 0, l], o);
  B.T([l + 0.2, 0, 0], lab[0], { c: COL.gray });
  B.T([0, l * 0.8 + 0.2, 0], lab[1], { c: COL.gray });
  B.T([0, 0, l + 0.2], lab[2], { c: COL.gray });
}
