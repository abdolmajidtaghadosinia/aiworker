import type { CSSProperties } from "react";
import { useApp } from "../state/store";
import { FAQ_CATS, FAQ_DATA } from "../lib/data";
import { ChevronDownIcon, SearchIcon } from "./icons";

export function FaqPage() {
  const { state, actions } = useApp();

  const faqQNorm = (state.faqQuery || "").trim();
  const faqFiltered = FAQ_DATA.filter(
    (it) =>
      (state.faqCategory === "all" || it.cat === state.faqCategory) &&
      (!faqQNorm || it.q.includes(faqQNorm) || it.a.includes(faqQNorm)),
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div>
        <h1 className="page-heading" style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800, color: "#13265c" }}>سوالات متداول</h1>
        <p style={{ margin: 0, fontSize: 14, color: "#6c7689" }}>
          پاسخ سریع به پرتکرارترین پرسش‌های حقوقی کارگران؛ اگر جواب سؤالت اینجا نبود، مستقیم از دستیار بپرس.
        </p>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e3e8f1", borderRadius: 16, padding: 18, boxShadow: "var(--shadow-sm)" }}>
        <div style={{ position: "relative", marginBottom: 16 }}>
          <span style={{ position: "absolute", top: "50%", right: 16, transform: "translateY(-50%)" }}>
            <SearchIcon />
          </span>
          <input
            type="text"
            value={state.faqQuery}
            onChange={actions.onFaqQuery}
            placeholder="جست‌وجو در سوالات متداول…"
            className="focus-border"
            style={{
              width: "100%",
              border: "1.5px solid #d6deec",
              borderRadius: 12,
              padding: "13px 46px 13px 16px",
              fontSize: "14.5px",
              outline: "none",
              background: "#fafbfe",
              color: "#15233f",
            }}
          />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {FAQ_CATS.map((c) => {
            const active = state.faqCategory === c.key;
            const style: CSSProperties = {
              padding: "9px 16px",
              borderRadius: 999,
              fontSize: "13.5px",
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
              border: active ? "1.5px solid #16306e" : "1.5px solid #d6deec",
              background: active ? "linear-gradient(135deg,#22489f,#16306e)" : "#fff",
              color: active ? "#fff" : "#41506b",
            };
            return (
              <button key={c.key} onClick={() => actions.setFaqCategory(c.key)} style={style}>
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {faqFiltered.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {faqFiltered.map((it) => {
            const open = !!state.faqOpen[it.id];
            const catLabel = FAQ_CATS.find((c) => c.key === it.cat)?.label || "";
            return (
              <div
                key={it.id}
                className="hover-row-lift"
                style={{
                  background: "#fff",
                  border: open ? "1px solid #c3d0ea" : "1px solid #e3e8f1",
                  borderRadius: 14,
                  overflow: "hidden",
                  boxShadow: open ? "var(--shadow-sm)" : "var(--shadow-xs)",
                }}
              >
                <div
                  onClick={() => actions.toggleFaq(it.id)}
                  style={{ padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, cursor: "pointer" }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
                    <span style={{ display: "inline-flex", alignSelf: "flex-start", background: "#eef3fc", color: "#1d3b8b", borderRadius: 999, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>
                      {catLabel}
                    </span>
                    <div style={{ fontWeight: 700, fontSize: "14.5px", color: "#13265c" }}>{it.q}</div>
                  </div>
                  <ChevronDownIcon style={{ transition: "transform .2s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)", flex: "none" }} />
                </div>
                <div style={{ maxHeight: open ? 600 : 0, opacity: open ? 1 : 0, overflow: "hidden", transition: "all .25s ease" }}>
                  <div style={{ padding: "13px 18px 18px", borderTop: "1px solid #eef1f7", fontSize: "13.5px", color: "#41506b", lineHeight: 2, textAlign: "justify" }}>
                    {it.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ background: "#fff", border: "1px dashed #d6deec", borderRadius: 16, padding: "36px 20px", textAlign: "center" }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: "#13265c", marginBottom: 6 }}>نتیجه‌ای پیدا نشد</div>
          <div style={{ fontSize: "13.5px", color: "#6c7689", marginBottom: 16 }}>می‌تونی مستقیم سؤالت رو از دستیار هوشمند بپرسی.</div>
          <button
            onClick={actions.navChat}
            style={{ background: "linear-gradient(135deg,#22489f,#16306e)", color: "#fff", border: "none", borderRadius: 11, padding: "11px 22px", fontSize: "13.5px", fontWeight: 700, cursor: "pointer" }}
          >
            گفتگو با دستیار هوشمند
          </button>
        </div>
      )}

      <div style={{ background: "linear-gradient(135deg,#13265c,#0c1a3f)", borderRadius: 16, padding: "22px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18, flexWrap: "wrap" }}>
        <div>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: "15.5px", marginBottom: 5 }}>سؤالت پاسخ داده نشد؟</div>
          <div style={{ color: "#aebbd8", fontSize: 13 }}>با دستیار هوشمند گفتگو کن یا مستقیم سندت رو بساز.</div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            onClick={actions.navChat}
            style={{ background: "linear-gradient(135deg,#e6b450,#cf9a32)", color: "#3a2a06", border: "none", borderRadius: 11, padding: "11px 20px", fontSize: "13.5px", fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" }}
          >
            گفتگو با دستیار
          </button>
          <button
            onClick={actions.navSoon}
            style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.25)", color: "#fff", borderRadius: 11, padding: "11px 20px", fontSize: "13.5px", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}
          >
            تماس با کارشناس
          </button>
        </div>
      </div>
    </div>
  );
}
