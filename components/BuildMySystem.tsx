"use client";
import { useMemo, useState } from "react";

export default function BuildMySystem() {
  // Core inputs
  const [systemSizeKw, setSystemSizeKw] = useState(0);
  const [ppw, setPpw] = useState(4.2);

  // Adders
  const [roof, setRoof] = useState(0);
  const [battery, setBattery] = useState(0);
  const [ev, setEv] = useState(0);

  // Tech override gate
  const [pwInput, setPwInput] = useState("");
  const techUnlocked = pwInput === "67";

  const baseCost = useMemo(
    () => +(systemSizeKw * ppw * 1000).toFixed(2),
    [systemSizeKw, ppw]
  );
  const total = baseCost + roof + battery + ev;

  return (
    <div className="mx-auto max-w-5xl p-6 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
      {/* LEFT: temporary inputs (we'll replace with phases later) */}
      <div className="space-y-6">
        <h1 className="text-xl font-semibold">Build My System</h1>

        <section className="rounded-xl border border-white/10 p-4">
          <h2 className="text-sm uppercase tracking-widest text-white/70 mb-4">
            System Inputs (temporary)
          </h2>

          <label className="block text-sm mb-2">System Size (kW)</label>
          <input
            type="number"
            value={systemSizeKw}
            onChange={(e) => setSystemSizeKw(Number(e.target.value))}
            className="w-full rounded-md bg-white/5 p-2 outline-none"
            min={0}
            step="0.1"
          />

          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-white/70">
              Advanced Manual Overrides
            </summary>

            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  value={pwInput}
                  onChange={(e) => setPwInput(e.target.value)}
                  placeholder="Tech password"
                  className="rounded-md bg-white/5 p-2 outline-none"
                />
                <span
                  className={`text-xs ${
                    techUnlocked ? "text-green-400" : "text-white/40"
                  }`}
                >
                  {techUnlocked ? "Unlocked" : "Enter 67"}
                </span>
              </div>

              <fieldset disabled={!techUnlocked} className={!techUnlocked ? "opacity-50" : ""}>
                <label className="block text-sm mb-1">Price per Watt ($)</label>
                <input
                  type="number"
                  value={ppw}
                  onChange={(e) => setPpw(Number(e.target.value))}
                  className="w-full rounded-md bg-white/5 p-2 outline-none"
                  step="0.01"
                />

                <label className="block text-sm mt-3">Roof Replacement ($)</label>
                <input
                  type="number"
                  value={roof}
                  onChange={(e) => setRoof(Number(e.target.value))}
                  className="w-full rounded-md bg-white/5 p-2 outline-none"
                  step="1"
                  min={0}
                />

                <label className="block text-sm mt-3">Battery ($)</label>
                <input
                  type="number"
                  value={battery}
                  onChange={(e) => setBattery(Number(e.target.value))}
                  className="w-full rounded-md bg-white/5 p-2 outline-none"
                  step="1"
                  min={0}
                />

                <label className="block text-sm mt-3">EV Charger ($)</label>
                <input
                  type="number"
                  value={ev}
                  onChange={(e) => setEv(Number(e.target.value))}
                  className="w-full rounded-md bg-white/5 p-2 outline-none"
                  step="1"
                  min={0}
                />
              </fieldset>
            </div>
          </details>
        </section>
      </div>

      {/* RIGHT: sticky summary */}
      <aside className="h-fit rounded-xl border border-white/10 p-4 sticky top-6">
        <h3 className="text-sm uppercase tracking-widest text-white/70 mb-4">
          $ Cost Rollup
        </h3>
        <Row label="System Size" value={`${systemSizeKw.toFixed(2)} kW`} />
        <Row label="Price per Watt" value={`$ ${ppw.toFixed(2)}`} />
        <Row label="System Base Cost" value={fmt(baseCost)} />
        <Row label="Roof Replacement" value={fmt(roof)} />
        <Row label="Battery Storage" value={fmt(battery)} />
        <Row label="EV Charger" value={fmt(ev)} />

        <div className="mt-4 border-t border-white/10 pt-4 flex items-baseline justify-between">
          <div className="text-sm uppercase tracking-widest text-white/70">Total</div>
          <div className="text-2xl font-semibold">{fmt(total)}</div>
        </div>
      </aside>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-2 flex items-center justify-between border-b border-white/5 last:border-b-0">
      <span className="text-sm text-white/70">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );
}

function fmt(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

  );
}
