"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={
        "rounded-xl border border-white/10 bg-white/5 backdrop-blur-md " +
        "shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] " + className
      }
    >
      {children}
    </div>
  );
}

function Row({
  label,
  value,
  strong,
  onClick,
}: {
  label: string;
  value: string;
  strong?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between text-left"
      aria-label={onClick ? `Edit ${label}` : undefined}
    >
      <span className="text-white/60">{label}</span>
      <span className={strong ? "font-semibold text-white" : "text-white"}>{value}</span>
    </button>
  );
}

export default function BuildMySystem() {
  // --- Visible summary values (read-only unless tech override unlocked) ---
  const [ppw, setPpw] = useState<number>(4.2); // $/W
  const [roof, setRoof] = useState<number>(0);
  const [battery, setBattery] = useState<number>(0);
  const [ev, setEv] = useState<number>(0);

  // Manual system size override (kW) lives in the tech drawer
  const [systemSizeKw, setSystemSizeKw] = useState<number>(0);

  // --- Tech Overrides gate (password 67) ---
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [unlocked, setUnlocked] = useState<boolean>(false);
  const [pw, setPw] = useState<string>("");

  function tryUnlock() {
    setUnlocked(pw.trim() === "67");
  }

  // --- Derived amounts ---
  const systemBaseCost = useMemo(() => {
    // Base = kW * 1000 * $/W
    const watts = Math.max(systemSizeKw, 0) * 1000;
    return Math.max(0, Math.round(watts * ppw));
  }, [systemSizeKw, ppw]);

  const total = useMemo(() => {
    return systemBaseCost + roof + battery + ev;
  }, [systemBaseCost, roof, battery, ev]);

  // Simple currency
  const fmt = (n: number) =>
    n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const fmtDec = (n: number) =>
    n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-xl font-semibold tracking-wide">Build My System</h1>
        <p className="text-sm text-white/60">Configure your optimal solar array based on real usage.</p>
      </header>

      {/* Desktop row, mobile column */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* LEFT: Phases (still simple placeholders for now) */}
        <div className="w-full lg:flex-1 space-y-6">
          <Card className="p-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-widest">Phase 1 — Utility Bill</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="text-sm">
                <span className="mb-1 block text-white/70">Average Monthly Bill</span>
                <input
                  className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 outline-none"
                  placeholder="$120"
                />
              </label>
              <label className="text-sm">
                <span className="mb-1 block text-white/70">Utility</span>
                <select className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 outline-none">
                  <option>PSE</option>
                  <option>Seattle City Light</option>
                </select>
              </label>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-widest">Phase 2 — Preferences</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <select className="rounded-md border border-white/10 bg-black/30 px-3 py-2">
                <option>Panel: Black on Black</option>
                <option>Panel: Standard</option>
                <option>Panel: Premium</option>
              </select>
              <select className="rounded-md border border-white/10 bg-black/30 px-3 py-2">
                <option>Inverter: Micro</option>
                <option>Inverter: String</option>
              </select>
              <select className="rounded-md border border-white/10 bg-black/30 px-3 py-2">
                <option>Mount: Roof</option>
                <option>Mount: Ground</option>
              </select>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-widest">Phase 3 — Solar Sizing & Offset</h2>
            <label className="text-sm block">
              <span className="mb-2 block text-white/70">Target Offset</span>
              <input type="range" min={0} max={110} defaultValue={100} className="w-full" />
            </label>
            <div className="mt-4 text-sm text-white/70">Net Metering: <span className="text-white">On</span></div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-widest">Phase 4 — Options & Upgrades</h2>
            <div className="space-y-3 text-sm">
              <label className="flex items-center gap-3">
                <input type="checkbox" onChange={(e) => setRoof(e.target.checked ? 12000 : 0)} /> Roof Replacement
                <span className="ml-auto text-white/70">{roof ? fmt(roof) : ""}</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" onChange={(e) => setBattery(e.target.checked ? 9000 : 0)} /> Battery Storage
                <span className="ml-auto text-white/70">{battery ? fmt(battery) : ""}</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" onChange={(e) => setEv(e.target.checked ? 1800 : 0)} /> Electrical Panel Upgrade
                <span className="ml-auto text-white/70">{ev ? fmt(ev) : ""}</span>
              </label>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-widest">Phase 5 — Final Build Summary</h2>
            <ul className="list-disc pl-5 text-sm text-white/80">
              <li>System Size • {fmtDec(systemSizeKw)} kW</li>
              <li>Panels • 410W mono-PERC</li>
              <li>Microinverters • 1 per 2 panels</li>
              <li>Offset % • TBD</li>
              <li>Net Metering • On</li>
            </ul>
            <div className="mt-4 text-xs text-yellow-300/80">
              Technician will verify roof space for chosen offset.
            </div>
          </Card>
        </div>

        {/* RIGHT: Sticky Summary */}
        <aside className="w-full shrink-0 lg:w-[380px] lg:sticky lg:top-6">
          <Card className="p-6">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest">
              $ Cost Rollup
            </h3>
            <div className="space-y-3 text-sm">
              <Row label="System Size" value={`${fmtDec(systemSizeKw)} kW`} />
              {/* PPW is displayed but edited only in the Tech Overrides drawer */}
              <Row
                label="Price per Watt"
                value={`$ ${fmtDec(ppw)}`}
                onClick={() => setDrawerOpen(true)}
              />
              <Row label="System Base Cost" value={fmt(systemBaseCost)} />
              <Row label="Roof Replacement" value={roof ? fmt(roof) : "—"} />
              <Row label="Battery Storage" value={battery ? fmt(battery) : "—"} />
              <Row label="EV Charger" value={ev ? fmt(ev) : "—"} />
              <div className="my-3 h-px bg-white/10" />
              <Row label="TOTAL" value={fmt(total)} strong />
            </div>

            {/* TECH OVERRIDES (password gate) */}
            <div className="mt-6">
              <button
                className="text-sm text-white/70 underline"
                onClick={() => setDrawerOpen((v) => !v)}
              >
                Advanced Manual Overrides
              </button>

              {drawerOpen && (
                <div className="mt-4 rounded-lg border border-white/10 bg-black/30 p-4">
                  {!unlocked ? (
                    <div className="space-y-3">
                      <div className="text-sm text-white/70">Technician access</div>
                      <div className="flex gap-2">
                        <input
                          type="password"
                          value={pw}
                          onChange={(e) => setPw(e.target.value)}
                          className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none"
                          placeholder="Enter password"
                        />
                        <button
                          onClick={tryUnlock}
                          className="rounded-md border border-white/20 bg-white/10 px-3 text-sm hover:bg-white/20"
                        >
                          Unlock
                        </button>
                      </div>
                      <div className="text-xs text-white/50">Hint: 67</div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <label className="col-span-2">
                        <span className="mb-1 block text-white/60">System Size (kW)</span>
                        <input
                          type="number"
                          min={0}
                          step="0.01"
                          value={systemSizeKw}
                          onChange={(e) => setSystemSizeKw(Number(e.target.value || 0))}
                          className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 outline-none"
                        />
                      </label>
                      <label>
                        <span className="mb-1 block text-white/60">Price per Watt ($)</span>
                        <input
                          type="number"
                          min={0}
                          step="0.01"
                          value={ppw}
                          onChange={(e) => setPpw(Number(e.target.value || 0))}
                          className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 outline-none"
                        />
                      </label>
                      <label>
                        <span className="mb-1 block text-white/60">Roof ($)</span>
                        <input
                          type="number"
                          min={0}
                          step="1"
                          value={roof}
                          onChange={(e) => setRoof(Number(e.target.value || 0))}
                          className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 outline-none"
                        />
                      </label>
                      <label>
                        <span className="mb-1 block text-white/60">Battery ($)</span>
                        <input
                          type="number"
                          min={0}
                          step="1"
                          value={battery}
                          onChange={(e) => setBattery(Number(e.target.value || 0))}
                          className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 outline-none"
                        />
                      </label>
                      <label>
                        <span className="mb-1 block text-white/60">EV Charger ($)</span>
                        <input
                          type="number"
                          min={0}
                          step="1"
                          value={ev}
                          onChange={(e) => setEv(Number(e.target.value || 0))}
                          className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 outline-none"
                        />
                      </label>

                      <div className="col-span-2 mt-2 flex items-center justify-between">
                        <span className="text-xs text-white/50">Overrides active</span>
                        <button
                          onClick={() => {
                            setUnlocked(false);
                            setPw("");
                          }}
                          className="rounded-md border border-white/20 bg-white/10 px-3 py-1 text-xs hover:bg-white/20"
                        >
                          Lock
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        </aside>
      </div>

      <footer className="mt-10 text-xs text-white/50">
        <Link href="/ping" className="underline">Ping test</Link>
      </footer>
    </section>
  );
}

    </div>
  );
}
