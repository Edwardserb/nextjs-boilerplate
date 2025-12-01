// lib/bms.ts
import { useState } from "react";

export type BmsState = {
  avgMonthlyCost: number;   // $/mo from Phase 2 (stub for now)
  targetOffsetPct: number;  // 0–110
  ppw: number;              // $/W
};

export function useBmsState(initial?: Partial<BmsState>) {
  // Defaults; we’ll fill from real inputs later.
  const [avgMonthlyCost, setAvgMonthlyCost] = useState(initial?.avgMonthlyCost ?? 150);
  const [targetOffsetPct, setTargetOffsetPct] = useState(initial?.targetOffsetPct ?? 100);
  const [ppw, setPpw] = useState(initial?.ppw ?? 4.2);

  return {
    avgMonthlyCost, setAvgMonthlyCost,
    targetOffsetPct, setTargetOffsetPct,
    ppw, setPpw,
  };
}

/**
 * Super-simple sizing model (placeholder):
 * - assume blended $/kWh = 0.18 (we’ll replace with your utility/jurisdiction data)
 * - annual kWh = (avgMonthlyCost / rate) * 12
 * - system kW ≈ annual kWh / (1,250 kWh per kW-year in WA (conservative))
 * - multiply by targetOffsetPct
 */
export function estimateSystemSizeKw(avgMonthlyCost: number, offsetPct: number, assumedRate = 0.18) {
  const annualKwh = (avgMonthlyCost / assumedRate) * 12;
  const kw = annualKwh / 1250;
  return Math.max(0, kw * (offsetPct / 100));
}
