What “Build My System” must be

Overall vibe: Apple/Tesla-clean. Zero clutter. No mystery animations.

Layout

Left column: a narrow, vertical, 5-phase collapsible wizard.

Right column: a cost roll-up card that stays visible (desktop: fixed; mobile: stacked).

Phases (left)

Your Utility

Utility Provider (dropdown)

Tier Detection (auto badge)

City/Jurisdiction (dropdown)

Helper: “Used to calculate accurate rate multipliers.”

When utility+city set → Phase 2 becomes relevant (no auto-jump needed initially)

Your Usage

Avg Monthly Cost

Avg Monthly Usage

Annual Usage

Monthly Bill

Helper: “Imported from your bill.”

System Inputs

System Offset slider (default 100%)

Net Metering (1:1) toggle

Required System Size (auto)

Projected Solar Production (auto)

Remaining Utility Usage (auto)

Estimated Bill (auto)

Tiny note: “Credits based on your utility’s retail rate.”

Options & Upgrades

Roof Replacement toggle → Price, Roof Type

Battery Storage toggle → Size (kWh), Price, note:
“Included Inverter: ELS-11K Hybrid (11.4 kVA, 17.1 kVA peak, AC-coupling, IP65). LFP chemistry.”

Electrical Panel Upgrade toggle → Price (+ note: “Often required for older homes.”)

Final Build Summary

Bullets: System Size, # Panels (410W mono-PERC), Microinverters (1 per 2 panels), Offset %, Net Metering, Included Upgrades

Yellow note: “Technician will verify roof space for chosen offset.”

Right cost card (desktop fixed, mobile stacked)

Shows: System Size (kW), Base ($/W × kW), add-ons (Roof/Battery/Panel), TOTAL.

It reads from the math engine; no calculations in the component.

Style/behavior rules

24–32px vertical rhythm, AutoLayout/stacked sections.

Overflow visible on ancestors; no transforms on parents of the cost card.

Keep animations minimal and local (inside body wrappers only). No motion.div on containers.

Data wiring (later step)

Pure functions compute: size/production, costs, taxes.

UI writes inputs (offset, toggles, prices). Card reads derived values.

No prop-drilling; use a small facade hook or a tiny store.
