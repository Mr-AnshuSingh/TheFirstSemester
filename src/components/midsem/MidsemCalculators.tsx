'use client';

import React, { useMemo, useState } from 'react';
import { Calculator } from 'lucide-react';
import { MidsemKatexText } from './MidsemKatexRenderer';

export const MidsemCalculators: React.FC = () => {
  const [rlcL, setRlcL] = useState<string>('0.1');
  const [rlcC, setRlcC] = useState<string>('10');
  const [thevV, setThevV] = useState<string>('24');
  const [thevR, setThevR] = useState<string>('6');
  const [thevRl, setThevRl] = useState<string>('6');
  const [fiberN1, setFiberN1] = useState<string>('1.55');
  const [fiberN2, setFiberN2] = useState<string>('1.50');
  const [cacheH, setCacheH] = useState<string>('0.95');
  const [cacheTc, setCacheTc] = useState<string>('2');
  const [cacheTm, setCacheTm] = useState<string>('50');

  const L = parseFloat(rlcL) || 0;
  const C = parseFloat(rlcC) || 0;
  const rlcResonantFreq = useMemo(() => {
    if (L <= 0 || C <= 0) return '0.00';
    return (1 / (2 * Math.PI * Math.sqrt(L * (C * 1e-6)))).toFixed(2);
  }, [L, C]);

  const V = parseFloat(thevV) || 0;
  const Rth = parseFloat(thevR) || 0;
  const Rl = parseFloat(thevRl) || 0;
  const theveninPower = useMemo(() => {
    if (Rth + Rl <= 0) return { il: '0.000', pl: '0.000' };
    const il = V / (Rth + Rl);
    const pl = il * il * Rl;
    return { il: il.toFixed(3), pl: pl.toFixed(3) };
  }, [V, Rth, Rl]);

  const n1 = parseFloat(fiberN1) || 0;
  const n2 = parseFloat(fiberN2) || 0;
  const fiberParams = useMemo(() => {
    if (n1 <= n2 || n1 <= 0 || n2 <= 0) return { na: 'n1 must > n2', thetaA: 'N/A', thetaC: 'N/A' };
    const naVal = Math.sqrt(n1 * n1 - n2 * n2);
    const thetaA = (Math.asin(Math.min(1, naVal)) * 180) / Math.PI;
    const thetaC = (Math.asin(n2 / n1) * 180) / Math.PI;
    return {
      na: naVal.toFixed(4),
      thetaA: `${thetaA.toFixed(2)}°`,
      thetaC: `${thetaC.toFixed(2)}°`,
    };
  }, [n1, n2]);

  const h = parseFloat(cacheH) || 0;
  const tc = parseFloat(cacheTc) || 0;
  const tm = parseFloat(cacheTm) || 0;
  const cacheTavg = useMemo(() => (h * tc + (1 - h) * tm).toFixed(3), [h, tc, tm]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 1. RLC Series Resonance */}
      <div className="border-2 border-ink bg-paper2 rounded-2xl p-5 shadow-sketch space-y-4">
        <div>
          <h2 className="midsem-heading text-3xl text-ink flex items-center gap-2">
            <Calculator className="w-5 h-5 text-accentTeal" aria-hidden="true" />
            <span>RLC Series Resonance Calculator</span>
          </h2>
          <div className="midsem-meta text-dim mt-1">
            Formula: <MidsemKatexText htmlOrText="$f_0 = \frac{1}{2\pi\sqrt{LC}}$" />
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <label htmlFor="calc-rlc-l" className="midsem-meta font-mono font-bold text-ink block mb-1">
              Inductance <MidsemKatexText htmlOrText="$L$" /> (Henries, H)
            </label>
            <input
              id="calc-rlc-l"
              type="number"
              step="0.01"
              value={rlcL}
              onChange={(e) => setRlcL(e.target.value)}
              className="midsem-tap w-full px-3.5 py-2.5 border-2 border-ink rounded-xl bg-paper text-base font-mono text-ink"
            />
          </div>
          <div>
            <label htmlFor="calc-rlc-c" className="midsem-meta font-mono font-bold text-ink block mb-1">
              Capacitance <MidsemKatexText htmlOrText="$C$" /> (Microfarads, µF)
            </label>
            <input
              id="calc-rlc-c"
              type="number"
              step="1"
              value={rlcC}
              onChange={(e) => setRlcC(e.target.value)}
              className="midsem-tap w-full px-3.5 py-2.5 border-2 border-ink rounded-xl bg-paper text-base font-mono text-ink"
            />
          </div>
          <div className="p-3.5 bg-paper3 rounded-xl border-2 border-ink flex items-center justify-between gap-2">
            <span className="midsem-meta font-mono text-dim font-bold">Resonant Frequency <MidsemKatexText htmlOrText="$f_0$" />:</span>
            <span data-testid="calc-rlc-result" className="midsem-num text-3xl text-accentTeal">
              {rlcResonantFreq} Hz
            </span>
          </div>
        </div>
      </div>

      {/* 2. Thevenin & Maximum Power */}
      <div className="border-2 border-ink bg-paper2 rounded-2xl p-5 shadow-sketch space-y-4">
        <div>
          <h2 className="midsem-heading text-3xl text-ink flex items-center gap-2">
            <Calculator className="w-5 h-5 text-accentRed" aria-hidden="true" />
            <span>Thevenin &amp; Max Power Calculator</span>
          </h2>
          <div className="midsem-meta text-dim mt-1">
            Formula: <MidsemKatexText htmlOrText="$P_{\max} = \frac{V_{th}^2}{4 R_{th}}$ when $R_L = R_{th}$" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="calc-thev-v" className="midsem-meta font-mono font-bold text-ink block mb-1">
                <MidsemKatexText htmlOrText="$V_{th}$" /> (Volts, V)
              </label>
              <input
                id="calc-thev-v"
                type="number"
                value={thevV}
                onChange={(e) => setThevV(e.target.value)}
                className="midsem-tap w-full px-3.5 py-2.5 border-2 border-ink rounded-xl bg-paper text-base font-mono text-ink"
              />
            </div>
            <div>
              <label htmlFor="calc-thev-r" className="midsem-meta font-mono font-bold text-ink block mb-1">
                <MidsemKatexText htmlOrText="$R_{th}$" /> (Ohms, Ω)
              </label>
              <input
                id="calc-thev-r"
                type="number"
                value={thevR}
                onChange={(e) => setThevR(e.target.value)}
                className="midsem-tap w-full px-3.5 py-2.5 border-2 border-ink rounded-xl bg-paper text-base font-mono text-ink"
              />
            </div>
          </div>
          <div>
            <label htmlFor="calc-thev-rl" className="midsem-meta font-mono font-bold text-ink block mb-1">
              Load Resistance <MidsemKatexText htmlOrText="$R_L$" /> (Ohms, Ω)
            </label>
            <input
              id="calc-thev-rl"
              type="number"
              value={thevRl}
              onChange={(e) => setThevRl(e.target.value)}
              className="midsem-tap w-full px-3.5 py-2.5 border-2 border-ink rounded-xl bg-paper text-base font-mono text-ink"
            />
          </div>
          <div className="p-3.5 bg-paper3 rounded-xl border-2 border-ink grid grid-cols-2 gap-3">
            <div>
              <div className="midsem-meta font-mono text-dim">Load Current <MidsemKatexText htmlOrText="$I_L$" />:</div>
              <div data-testid="calc-thev-il" className="midsem-num text-2xl text-ink">
                {theveninPower.il} A
              </div>
            </div>
            <div className="text-right">
              <div className="midsem-meta font-mono text-dim">Load Power <MidsemKatexText htmlOrText="$P_L$" />:</div>
              <div data-testid="calc-thev-pl" className="midsem-num text-2xl text-accentRed">
                {theveninPower.pl} W
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Optical Fiber NA & Acceptance Angle */}
      <div className="border-2 border-ink bg-paper2 rounded-2xl p-5 shadow-sketch space-y-4">
        <div>
          <h2 className="midsem-heading text-3xl text-ink flex items-center gap-2">
            <Calculator className="w-5 h-5 text-accentGold" aria-hidden="true" />
            <span>Optical Fiber NA Calculator</span>
          </h2>
          <div className="midsem-meta text-dim mt-1">
            Formula: <MidsemKatexText htmlOrText="$\text{NA} = \sqrt{n_1^2 - n_2^2}, \;\theta_a = \sin^{-1}(\text{NA})$" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="calc-fiber-n1" className="midsem-meta font-mono font-bold text-ink block mb-1">
                Core Index <MidsemKatexText htmlOrText="$n_1$" /> (dimensionless)
              </label>
              <input
                id="calc-fiber-n1"
                type="number"
                step="0.01"
                value={fiberN1}
                onChange={(e) => setFiberN1(e.target.value)}
                className="midsem-tap w-full px-3.5 py-2.5 border-2 border-ink rounded-xl bg-paper text-base font-mono text-ink"
              />
            </div>
            <div>
              <label htmlFor="calc-fiber-n2" className="midsem-meta font-mono font-bold text-ink block mb-1">
                Cladding Index <MidsemKatexText htmlOrText="$n_2$" /> (dimensionless)
              </label>
              <input
                id="calc-fiber-n2"
                type="number"
                step="0.01"
                value={fiberN2}
                onChange={(e) => setFiberN2(e.target.value)}
                className="midsem-tap w-full px-3.5 py-2.5 border-2 border-ink rounded-xl bg-paper text-base font-mono text-ink"
              />
            </div>
          </div>
          <div className="p-3.5 bg-paper3 rounded-xl border-2 border-ink grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="midsem-badge font-mono text-dim">NA</div>
              <div data-testid="calc-fiber-na" className="midsem-num text-2xl text-accentTeal">{fiberParams.na}</div>
            </div>
            <div>
              <div className="midsem-badge font-mono text-dim">Acceptance <MidsemKatexText htmlOrText="$\theta_a$" /></div>
              <div data-testid="calc-fiber-thetaa" className="midsem-num text-2xl text-ink">{fiberParams.thetaA}</div>
            </div>
            <div>
              <div className="midsem-badge font-mono text-dim">Critical <MidsemKatexText htmlOrText="$\theta_c$" /></div>
              <div className="midsem-num text-2xl text-accentGold">{fiberParams.thetaC}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Cache Memory Average Access Time */}
      <div className="border-2 border-ink bg-paper2 rounded-2xl p-5 shadow-sketch space-y-4">
        <div>
          <h2 className="midsem-heading text-3xl text-ink flex items-center gap-2">
            <Calculator className="w-5 h-5 text-accentTeal" aria-hidden="true" />
            <span>Cache Memory Access Time</span>
          </h2>
          <div className="midsem-meta text-dim mt-1">
            Formula: <MidsemKatexText htmlOrText="$T_{\text{avg}} = h \cdot t_c + (1 - h) \cdot t_m$" />
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <label htmlFor="calc-cache-h" className="midsem-meta font-mono font-bold text-ink block mb-1">
              Hit Ratio <MidsemKatexText htmlOrText="$h$" /> (0 to 1, ratio)
            </label>
            <input
              id="calc-cache-h"
              type="number"
              step="0.01"
              min="0"
              max="1"
              value={cacheH}
              onChange={(e) => setCacheH(e.target.value)}
              className="midsem-tap w-full px-3.5 py-2.5 border-2 border-ink rounded-xl bg-paper text-base font-mono text-ink"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="calc-cache-tc" className="midsem-meta font-mono font-bold text-ink block mb-1">
                Cache Access <MidsemKatexText htmlOrText="$t_c$" /> (ns)
              </label>
              <input
                id="calc-cache-tc"
                type="number"
                step="0.5"
                value={cacheTc}
                onChange={(e) => setCacheTc(e.target.value)}
                className="midsem-tap w-full px-3.5 py-2.5 border-2 border-ink rounded-xl bg-paper text-base font-mono text-ink"
              />
            </div>
            <div>
              <label htmlFor="calc-cache-tm" className="midsem-meta font-mono font-bold text-ink block mb-1">
                Main Memory <MidsemKatexText htmlOrText="$t_m$" /> (ns)
              </label>
              <input
                id="calc-cache-tm"
                type="number"
                step="1"
                value={cacheTm}
                onChange={(e) => setCacheTm(e.target.value)}
                className="midsem-tap w-full px-3.5 py-2.5 border-2 border-ink rounded-xl bg-paper text-base font-mono text-ink"
              />
            </div>
          </div>
          <div className="p-3.5 bg-paper3 rounded-xl border-2 border-ink flex items-center justify-between gap-2">
            <span className="midsem-meta font-mono text-dim font-bold">Average Access Time <MidsemKatexText htmlOrText="$T_{\text{avg}}$" />:</span>
            <span data-testid="calc-cache-result" className="midsem-num text-3xl text-accentTeal">
              {cacheTavg} ns
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
