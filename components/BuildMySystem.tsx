"use client";

import { useMemo, useState } from "react";

type MoneyProps = { value: number };
function Money({ value }: MoneyProps) {
  const f = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
      }),
    []
  );
  return <span>{f.format(value)}</span>;
}

export default function BuildMySystem() {
  // --- STATE (minimal; math stays stubbed for now) ---
  const [systemSizeKw] = useState(0); // will be fed by your phases later
  const [ppw, setPpw] = useState<number>(4.2); // default PPW
  const [overridesOpen, setOverridesOpen] = useState(false);
  const [pin, setPin] = useState("");
  const authorized = pin === "67";

  // derived
  const baseCost = useMemo(() => systemSizeKw * 1000 * ppw, [systemSizeKw, ppw]);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-semibold tracking-tight">Build My System</h1>
      <p className="mt-1 text-sm text-white/60">Scaffold online. UI coming next.</p>

      {/* ROW: left content + right sticky card */}
      <div className="mt-6 flex flex-row items-start gap-8">
        {/* LEFT COLUMN */}
        <div className="min-w-0 flex-1 space-y-4">
          <Card title="Phase 1 — Utility" hint="Utility Provider • Tier • City/Jurisdiction" />
          <Card title="Phase 2 — Your Usage" hint="Avg Monthly Cost • Avg Monthly kWh • Annual kWh" />
          <Card title="Phase 3 — System Inputs" hint="Offset Slider • Net Metering • Size/Production/Bill" />
          <Card title="Phase 4 — Options & Upgrades" hint="Roof • Battery • Panel Upgrade" />
          <Card title="Phase 5 — Final Build Summary" hint="System Size • Panels • Inverters • Offset • Upgrades" />
        </div>

        {/* RIGHT COLUMN (sticky on desktop) */}
        <aside className="hidden w-[380px] shrink-0 lg:block lg:sticky lg:top-6">
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <div className="mb-3 text-sm font-semibold tracking-wide text-green-400">$ COST ROLLUP</div>

            <Row label="System Size" valueRight={`${systemSizeKw.toFixed(2)} kW`} />
            <Row
              label="Price per Watt"
              valueRight={
                // show as read-only here; overrides live in the collapsible
                <span>{ppw.toFixed(2)}</span>
              }
              inset
            />
            <Row label="System Base Cost" valueRight={<Money value={baseCost} />} strong />
            <Divider />
            <Row label="Roof Replacement" valueRight="—" />
            <Row label="Battery Storage" valueRight="—" />
            <Row label="EV Charger" valueRight="—" />
            <Divider />
            <Row label="Total" valueRight={<Money value={baseCost} />} strong xl />

            {/* ADVANCED OVERRIDES */}
            <button
              type="button"
              onClick={() => setOverridesOpen((s) => !s)}
              className="mt-4 w-full select-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-left text-xs text-white/70 hover:bg-white/10"
            >
              ADVANCED MANUAL OVERRIDES {overridesOpen ? "▴" : "▾"}
            </button>

            {overridesOpen && (
              <div className="mt-3 space-y-3 rounded-lg border border-white/10 bg-black/30 p-3">
                {!authorized ? (
                  <div className="space-y-1">
                    <div className="text-[11px] uppercase tracking-wider text-white/50">Tech PIN Required</div>
                    <input
                      type="password"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      placeholder="Enter PIN"
                      className="w-full rounded-md border border-white/10 bg-black/40 px-2 py-2 text-sm outline-none"
                    />
                    <div className="text-[11px] text-white/40">Hint: 2-digit PIN for internal use.</div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-[11px] uppercase tracking-wider text-white/60">Price per Watt</div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-md border border-white/10 bg-black/40 px-2 py-2 text-sm text-white/70">$</span>
                      <input
                        type="number"
                        min={0}
                        step="0.01"
                        value={ppw}
                        onChange={(e) => setPpw(Number(e.target.value))}
                        className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none"
                      />
                    </div>
                    <div className="text-[11px] text-white/40">
                      Overrides stay hidden unless the correct PIN <span className="text-white/60">(67)</span> is entered.
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}

// ---------- tiny presentational bits ----------

function Card({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="text-sm font-semibold tracking-wide">{title}</div>
      <div className="mt-2 text-sm text-white/60">{hint}</div>
    </div>
  );
}

function Row({
  label,
  valueRight,
  inset = false,
  strong = false,
  xl = false,
}: {
  label: string;
  valueRight: React.ReactNode;
  inset?: boolean;
  strong?: boolean;
  xl?: boolean;
}) {
  return (
    <div
      className={[
        "flex items-center justify-between py-2",
        inset ? "pl-4" : "",
        strong ? "font-medium" : "",
        xl ? "text-lg" : "text-sm",
      ].join(" ")}
    >
      <div className="text-white/70">{label}</div>
      <div className="text-white/90">{valueRight}</div>
    </div>
  );
}

function Divider() {
  return <div className="my-2 h-px w-full bg-white/10" />;
}
