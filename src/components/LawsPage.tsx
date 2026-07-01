import { LAWS_DATA } from "../lib/data";

export function LawsPage() {
  return (
    <div>
      <div>
        <h1 className="page-heading" style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800, color: "#13265c" }}>قوانین و مقررات کار</h1>
        <p style={{ margin: "0 0 18px", fontSize: 14, color: "#6c7689" }}>مهم‌ترین مواد قانون کار که این دستیار از آن‌ها استفاده می‌کند.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        {LAWS_DATA.map((lw) => (
          <div key={lw.n} style={{ background: "#fff", border: "1px solid #e3e8f1", borderRadius: 14, padding: "16px 18px", display: "flex", gap: 14, alignItems: "flex-start" }}>
            <span style={{ background: "#13265c", color: "#f1d79a", borderRadius: 10, padding: "6px 11px", fontSize: 12, fontWeight: 800, whiteSpace: "nowrap", flex: "none" }}>
              {lw.n}
            </span>
            <div>
              <div style={{ fontWeight: 700, fontSize: "14.5px", color: "#13265c", marginBottom: 4 }}>{lw.t}</div>
              <div style={{ fontSize: 13, color: "#6c7689", lineHeight: 1.8 }}>{lw.d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
