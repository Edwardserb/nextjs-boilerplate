// components/BuildMySystem.tsx
export default function BuildMySystem() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ margin: 0, fontSize: 24 }}>Build My System</h1>
      <p style={{ opacity: 0.7, marginTop: 4 }}>Scaffold online. UI coming next.</p>

      <div
        style={{
          display: "flex",
          gap: 24,
          alignItems: "flex-start",
          marginTop: 24,
        }}
      >
        {/* LEFT COLUMN */}
        <div style={{ flex: 1, display: "grid", gap: 16 }}>
          <section style={card}>
            <h2 style={h2}>Phase 1 — Utility</h2>
            <div>Utility Provider • Tier • City/Jurisdiction</div>
          </section>

          <section style={card}>
            <h2 style={h2}>Phase 2 — Your Usage</h2>
            <div>Avg Monthly Cost • Avg Monthly kWh • Annual kWh</div>
          </section>

          <section style={card}>
            <h2 style={h2}>Phase 3 — System Inputs</h2>
            <div>Offset Slider • Net Metering • Size/Production/Bill</div>
          </section>

          <section style={card}>
            <h2 style={h2}>Phase 4 — Options & Upgrades</h2>
            <div>Roof • Battery • Panel Upgrade</div>
          </section>

          <section style={card}>
            <h2 style={h2}>Phase 5 — Final Build Summary</h2>
            <div>System Size • Panels • Inverters • Offset • Upgrades</div>
          </section>
        </div>

        {/* RIGHT COLUMN (sticky on desktop) */}
        <aside
          style={{
            width: 380,
            position: "sticky",
            top: 24,
            height: "fit-content",
          }}
        >
          <div style={card}>
            <h3 style={{ marginTop: 0, marginBottom: 12, fontSize: 16 }}>
              $ Cost Rollup
            </h3>
            <dl style={dl}>
              <div style={row}>
                <dt>System Size</dt>
                <dd>0.00 kW</dd>
              </div>
              <div style={row}>
                <dt>Price per Watt</dt>
                <dd>4.20</dd>
              </div>
              <div style={row}>
                <dt>System Base Cost</dt>
                <dd>$0.00</dd>
              </div>
              <div style={row}>
                <dt>Roof Replacement</dt>
                <dd>—</dd>
              </div>
              <div style={row}>
                <dt>Battery Storage</dt>
                <dd>—</dd>
              </div>
              <div style={row}>
                <dt>EV Charger</dt>
                <dd>—</dd>
              </div>
            </dl>
            <div style={{ borderTop: "1px solid #333", marginTop: 12, paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
              <strong>Total</strong>
              <strong>$0.00</strong>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

const card: React.CSSProperties = {
  padding: 16,
  border: "1px solid #2a2a2a",
  borderRadius: 12,
  background: "rgba(255,255,255,0.04)",
};

const h2: React.CSSProperties = { margin: 0, marginBottom: 8, fontSize: 14, letterSpacing: 1 };

const dl: React.CSSProperties = { margin: 0, display: "grid", gap: 8 };

const row: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 16,
};
