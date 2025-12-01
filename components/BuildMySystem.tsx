'use client';

import React from 'react';

/** Tiny helpers (kept local to avoid breaking anything) */
const fmtMoney = (n: number) =>
  n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export default function BuildMySystem() {
  // --- Inputs (left side) ---
  const [avgMonthlyCost, setAvgMonthlyCost] = React.useState<number>(0);
  const [avgMonthlyKwh, setAvgMonthlyKwh] = React.useState<number>(0);
  const [offsetPct, setOffsetPct] = React.useState<number>(100);
  const [netMetering, setNetMetering] = React.useState<boolean>(true);

  // Optional adders
  const [roofReplacement, setRoofReplacement] = React.useState<number>(0);
  const [batteryCost, setBatteryCost] = React.useState<number>(0);
  const [evChargerCost, setEvChargerCost] = React.useState<number>(0);

  // Tech override: PPW gate
  const [ppwUnlocked, setPpwUnlocked] = React.useState<boolean>(false);
  const [pwInput, setPwInput] = React.useState<string>('');
  const [pricePerWatt, setPricePerWatt] = React.useState<number>(4.20);

  // --- Derived values ---
  const annualKwh = React.useMemo(() => avgMonthlyKwh * 12, [avgMonthlyKwh]);

  /**
   * Super-simple sizing rule of thumb:
   * WA typical production ~ 1,150–1,250 kWh per kW-year.
   * We'll use 1,200 kWh/kW-yr to stay conservative and keep math stable.
   */
  const KWH_PER_KW_YEAR = 1200;

  const systemSizeKw = React.useMemo(() => {
    const need = (annualKwh * clamp(offsetPct, 0, 110)) / 100;
    const kw = need / KWH_PER_KW_YEAR;
    return Math.max(0, Math.round(kw * 100) / 100);
  }, [annualKwh, offsetPct]);

  const baseCost = React.useMemo(() => {
    // PPW is dollars per W; system size is kW → multiply by 1000 to get W
    return systemSizeKw * 1000 * pricePerWatt;
  }, [systemSizeKw, pricePerWatt]);

  const total = React.useMemo(() => {
    return baseCost + roofReplacement + batteryCost + evChargerCost;
  }, [baseCost, roofReplacement, batteryCost, evChargerCost]);

  // --- Handlers ---
  const tryUnlockPpw = () => {
    if (pwInput.trim() === '67') setPpwUnlocked(true);
  };

  // --- UI ---
  return (
    <div className="w-full px-6 py-10">
      <h1 className="text-2xl font-semibold mb-2">Build My System</h1>
      <p className="text-white/60 mb-6">Scaffold online. UI coming next.</p>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* LEFT COLUMN */}
        <div className="w-full lg:flex-1 space-y-6">
          {/* Phase 1 */}
          <section className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-sm uppercase tracking-widest font-bold mb-4">Phase 1 — Utility</h2>
            <div className="text-white/70 text-sm">
              Utility Provider • Tier • City/Jurisdiction
            </div>
          </section>

          {/* Phase 2 */}
          <section className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-sm uppercase tracking-widest font-bold mb-4">Phase 2 — Your Usage</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-white/60">Avg Monthly Cost ($)</label>
                <input
                  type="number"
                  className="mt-1 w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 outline-none"
                  value={avgMonthlyCost}
                  onChange={(e) => setAvgMonthlyCost(Number(e.target.value || 0))}
                  min={0}
                />
              </div>
              <div>
                <label className="text-xs text-white/60">Avg Monthly kWh</label>
                <input
                  type="number"
                  className="mt-1 w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 outline-none"
                  value={avgMonthlyKwh}
                  onChange={(e) => setAvgMonthlyKwh(Number(e.target.value || 0))}
                  min={0}
                />
              </div>
              <div className="flex items-end">
                <div className="text-sm text-white/70">
                  Annual kWh: <span className="text-white">{annualKwh.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Phase 3 */}
          <section className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-sm uppercase tracking-widest font-bold mb-4">Phase 3 — System Inputs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-white/60">System Offset (%)</label>
                <input
                  type="range"
                  min={0}
                  max={110}
                  value={offsetPct}
                  onChange={(e) => setOffsetPct(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-sm text-white/70 mt-1">{offsetPct}%</div>
              </div>
              <div>
                <label className="text-xs text-white/60">Net Metering</label>
                <div className="mt-2 flex gap-3 items-center text-sm">
                  <button
                    className={`px-3 py-1 rounded-md border ${netMetering ? 'bg-white/10 border-white/30' : 'border-white/10'}`}
                    onClick={() => setNetMetering(true)}
                  >
                    Yes
                  </button>
                  <button
                    className={`px-3 py-1 rounded-md border ${!netMetering ? 'bg-white/10 border-white/30' : 'border-white/10'}`}
                    onClick={() => setNetMetering(false)}
                  >
                    No
                  </button>
                </div>
              </div>
              <div className="flex items-end">
                <div className="text-sm text-white/70">
                  Required Size: <span className="text-white">{systemSizeKw.toFixed(2)} kW</span>
                </div>
              </div>
            </div>
          </section>

          {/* Phase 4 */}
          <section className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-sm uppercase tracking-widest font-bold mb-4">Phase 4 — Options & Upgrades</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-white/60">Roof Replacement ($)</label>
                <input
                  type="number"
                  className="mt-1 w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 outline-none"
                  value={roofReplacement}
                  onChange={(e) => setRoofReplacement(Number(e.target.value || 0))}
                  min={0}
                />
              </div>
              <div>
                <label className="text-xs text-white/60">Battery Storage ($)</label>
                <input
                  type="number"
                  className="mt-1 w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 outline-none"
                  value={batteryCost}
                  onChange={(e) => setBatteryCost(Number(e.target.value || 0))}
                  min={0}
                />
              </div>
              <div>
                <label className="text-xs text-white/60">EV Charger ($)</label>
                <input
                  type="number"
                  className="mt-1 w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 outline-none"
                  value={evChargerCost}
                  onChange={(e) => setEvChargerCost(Number(e.target.value || 0))}
                  min={0}
                />
              </div>
            </div>
          </section>

          {/* Phase 5 */}
          <section className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-sm uppercase tracking-widest font-bold mb-2">Phase 5 — Final Build Summary</h2>
            <div className="text-white/70 text-sm">
              System Size • Panels • Inverters • Offset • Upgrades
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN — SUMMARY CARD */}
        <aside className="w-full lg:w-[380px] shrink-0">
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm uppercase tracking-widest font-bold mb-4">$ Cost Rollup</h3>

            <div className="flex items-center justify-between py-2 text-sm">
              <span className="text-white/70">System Size</span>
              <span className="text-white">{systemSizeKw.toFixed(2)} kW</span>
            </div>

            {/* Tech override: PPW with password gate */}
            <div className="py-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Price per Watt</span>
                <span className="text-white">{pricePerWatt.toFixed(2)}</span>
              </div>

              <details className="mt-2">
                <summary className="cursor-pointer text-white/60 hover:text-white/80 text-xs">
                  Advanced Manual Overrides (tech)
                </summary>
                {!ppwUnlocked ? (
                  <div className="mt-3 space-y-2">
                    <label className="text-xs text-white/60">Enter Tech Password</label>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 outline-none"
                        value={pwInput}
                        onChange={(e) => setPwInput(e.target.value)}
                        placeholder="••"
                      />
                      <button
                        onClick={tryUnlockPpw}
                        className="px-3 py-2 rounded-md border border-white/20 bg-white/10 text-sm"
                      >
                        Unlock
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3">
                    <label className="text-xs text-white/60">Price per Watt (editable)</label>
                    <input
                      type="number"
                      step="0.01"
                      min={0}
                      className="mt-1 w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 outline-none"
                      value={pricePerWatt}
                      onChange={(e) => setPricePerWatt(Number(e.target.value || 0))}
                    />
                  </div>
                )}
              </details>
            </div>

            <div className="flex items-center justify-between py-2 text-sm">
              <span className="text-white/70">System Base Cost</span>
              <span className="text-white">{fmtMoney(baseCost)}</span>
            </div>

            <div className="flex items-center justify-between py-2 text-sm">
              <span className="text-white/70">Roof Replacement</span>
              <span className="text-white">{roofReplacement ? fmtMoney(roofReplacement) : '—'}</span>
            </div>

            <div className="flex items-center justify-between py-2 text-sm">
              <span className="text-white/70">Battery Storage</span>
              <span className="text-white">{batteryCost ? fmtMoney(batteryCost) : '—'}</span>
            </div>

            <div className="flex items-center justify-between py-2 text-sm">
              <span className="text-white/70">EV Charger</span>
              <span className="text-white">{evChargerCost ? fmtMoney(evChargerCost) : '—'}</span>
            </div>

            <div className="mt-4 h-px bg-white/10" />

            <div className="flex items-center justify-between pt-4">
              <span className="text-white/70 font-medium">Total</span>
              <span className="text-xl font-semibold">{fmtMoney(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
