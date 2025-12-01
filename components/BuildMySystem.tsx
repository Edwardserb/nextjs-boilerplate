"use client";

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

export default function BuildMySystem() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-xl font-semibold tracking-wide">Build My System</h1>
        <p className="text-sm text-white/60">Configure your optimal solar array based on real usage.</p>
      </header>

      {/* Desktop row, mobile column */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* LEFT: Phases */}
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
                <input type="checkbox" /> Roof Replacement
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" /> Battery Storage
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" /> Electrical Panel Upgrade
              </label>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-widest">Phase 5 — Final Build Summary</h2>
            <ul className="list-disc pl-5 text-sm text-white/80">
              <li>System Size • TBD</li>
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
              <Row label="System Size" value="0.00 kW" />
              <Row label="Price per Watt" value="$ 4.20" />
              <Row label="System Base Cost" value="$0.00" />
              <Row label="Roof Replacement" value="—" />
              <Row label="Battery Storage" value="—" />
              <Row label="EV Charger" value="—" />
              <div className="my-3 h-px bg-white/10" />
              <Row label="TOTAL" value="$0.00" strong />
            </div>

            {/* Tech overrides placeholder */}
            <details className="mt-6">
              <summary className="cursor-pointer text-sm text-white/70">Advanced Manual Overrides</summary>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <input className="rounded-md border border-white/10 bg-black/30 px-3 py-2" placeholder="System Size (kW)" />
                <input className="rounded-md border border-white/10 bg-black/30 px-3 py-2" placeholder="Roof ($)" />
                <input className="rounded-md border border-white/10 bg-black/30 px-3 py-2" placeholder="Battery ($)" />
                <input className="rounded-md border border-white/10 bg-black/30 px-3 py-2" placeholder="EV Charger ($)" />
              </div>
            </details>
          </Card>
        </aside>
      </div>

      <footer className="mt-10 text-xs text-white/50">
        <Link href="/ping" className="underline">Ping test</Link>
      </footer>
    </section>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/60">{label}</span>
      <span className={strong ? "font-semibold text-white" : "text-white"}>{value}</span>
    </div>
  );
}
