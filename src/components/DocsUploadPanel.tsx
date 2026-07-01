import { useApp } from "../state/store";
import { RECENT_DOCS } from "../lib/data";
import { DocsPreviewIcon, DotsIcon, UploadIcon } from "./icons";

export function DocsUploadPanel() {
  const { actions } = useApp();

  return (
    <section
      className="panel-min-height"
      style={{
        background: "#fff",
        border: "1px solid #e3e8f1",
        borderRadius: 18,
        padding: 18,
        boxShadow: "var(--shadow-sm)",
        display: "flex",
        flexDirection: "column",
        minHeight: 560,
        transition: "box-shadow .25s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <DocsPreviewIcon />
          <h3 style={{ margin: 0, fontSize: "15.5px", fontWeight: 800, color: "#13265c" }}>بارگذاری مدارک و مستندات</h3>
        </div>
        <span
          style={{
            background: "#eef0f3",
            color: "#7a8699",
            borderRadius: 999,
            padding: "4px 10px",
            fontSize: "10.5px",
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}
        >
          غیرفعال در دمو
        </span>
      </div>
      <div
        onClick={actions.uploadClick}
        style={{
          border: "2px dashed #d8dde5",
          borderRadius: 14,
          padding: "26px 16px",
          textAlign: "center",
          cursor: "not-allowed",
          background: "#f7f8fa",
          opacity: 0.75,
        }}
      >
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: "#eceef1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 12px",
          }}
        >
          <UploadIcon />
        </div>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#7a8699" }}>بارگذاری فایل در نسخهٔ دمو غیرفعال است</div>
        <div style={{ fontSize: 12, color: "#a3acba", marginTop: 7, lineHeight: 1.8 }}>
          این قابلیت در نسخهٔ کامل فعال خواهد بود
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", margin: "18px 0 11px" }}>
        <span style={{ fontWeight: 700, fontSize: "13.5px", color: "#41506b" }}>آخرین مدارک شما</span>
        <span onClick={actions.navSoon} style={{ fontSize: 12, color: "#1d3b8b", cursor: "pointer", fontWeight: 600 }}>
          مشاهدهٔ همه
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {RECENT_DOCS.map((d) => (
          <div
            key={d.name}
            style={{ display: "flex", alignItems: "center", gap: 11, border: "1px solid #eef1f7", borderRadius: 12, padding: "10px 12px" }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 9,
                background: d.color,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10.5px",
                fontWeight: 800,
                flex: "none",
              }}
            >
              {d.ext}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {d.name}
              </div>
              <div style={{ fontSize: 11, color: "#9aa3b6", marginTop: 2 }}>{d.ago}</div>
            </div>
            <DotsIcon />
          </div>
        ))}
      </div>
    </section>
  );
}
