import { useApp } from "../state/store";
import { DOC_TYPES_DATA } from "../lib/data";
import { DocFormIcon } from "./icons";

export function DocsPage() {
  const { actions } = useApp();

  return (
    <div>
      <div>
        <h1 className="page-heading" style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800, color: "#13265c" }}>نمونه اسناد</h1>
        <p style={{ margin: "0 0 18px", fontSize: 14, color: "#6c7689" }}>یکی از انواع سند را انتخاب کن تا مستقیم تولیدش کنیم.</p>
      </div>
      <div className="docs-type-grid">
        {DOC_TYPES_DATA.map((dt) => (
          <div
            key={dt.t}
            onClick={() => actions.useDocType(dt.t)}
            className="hover-doc-card"
            style={{ background: "#fff", border: "1px solid #e3e8f1", borderRadius: 16, padding: 20, cursor: "pointer" }}
          >
            <div style={{ width: 40, height: 40, borderRadius: 11, background: "#eef3fc", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
              <DocFormIcon size={20} color="#1d3b8b" />
            </div>
            <div style={{ fontWeight: 800, fontSize: 15, color: "#13265c", marginBottom: 6 }}>{dt.t}</div>
            <div style={{ fontSize: 13, color: "#6c7689", lineHeight: 1.8, marginBottom: 14 }}>{dt.d}</div>
            <div style={{ color: "#1d3b8b", fontWeight: 700, fontSize: 13 }}>تولید این سند ←</div>
          </div>
        ))}
      </div>
    </div>
  );
}
