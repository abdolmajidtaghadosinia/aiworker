import { useApp } from "../state/store";
import { RECENT_QUESTIONS, TOPIC_DEFS } from "../lib/data";
import { HelpCircleIcon } from "./icons";

export function TopicsAndRecent() {
  const { actions } = useApp();

  return (
    <div className="topics-recent-grid">
      <section style={{ background: "#fff", border: "1px solid #e3e8f1", borderRadius: 18, padding: 20, boxShadow: "var(--shadow-sm)", transition: "box-shadow .25s ease" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 15 }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: "#13265c" }}>موضوعات پرکاربرد</div>
          <span onClick={() => actions.navFaq()} style={{ fontSize: 12, color: "#1d3b8b", cursor: "pointer", fontWeight: 600 }}>
            مشاهده همه
          </span>
        </div>
        <div className="topics-icon-grid">
          {TOPIC_DEFS.map((t) => (
            <div
              key={t.cat}
              onClick={() => actions.navFaq(t.cat)}
              className="hover-topic-card"
              style={{
                border: "1px solid #eef1f7",
                borderRadius: 14,
                padding: "15px 10px",
                textAlign: "center",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 9,
              }}
            >
              <div style={{ width: 42, height: 42, borderRadius: 12, background: "#eef3fc", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1d3b8b" strokeWidth={1.8}>
                  <path d={t.p} />
                </svg>
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#27365a", lineHeight: 1.6 }}>{t.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "#fff", border: "1px solid #e3e8f1", borderRadius: 18, padding: 20, boxShadow: "var(--shadow-sm)", transition: "box-shadow .25s ease" }}>
        <div style={{ fontWeight: 800, fontSize: 15, color: "#13265c", marginBottom: 15 }}>آخرین سؤالات کاربران</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
          {RECENT_QUESTIONS.map((r) => (
            <div
              key={r.q}
              onClick={() => actions.navFaq(r.cat, r.q)}
              className="hover-row-lift"
              style={{ display: "flex", gap: 11, alignItems: "flex-start", borderBottom: "1px solid #f1f3f8", padding: "2px 8px 12px", margin: "0 -8px", borderRadius: 10, cursor: "pointer" }}
            >
              <span style={{ flex: "none", marginTop: 2 }}>
                <HelpCircleIcon size={17} color="#1d3b8b" />
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: "#27365a", lineHeight: 1.8 }}>{r.q}</div>
                <div style={{ fontSize: 11, color: "#9aa3b6", marginTop: 3 }}>{r.ago}</div>
              </div>
            </div>
          ))}
        </div>
        <div onClick={() => actions.navFaq()} style={{ marginTop: 13, textAlign: "center", fontSize: "12.5px", color: "#1d3b8b", cursor: "pointer", fontWeight: 700 }}>
          مشاهده همه سوالات
        </div>
      </section>
    </div>
  );
}
