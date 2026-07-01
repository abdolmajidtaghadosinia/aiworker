import type { CSSProperties } from "react";
import { useApp } from "../state/store";
import { QUESTIONS } from "../lib/data";
import { fa } from "../lib/format";

const STEP_DEFS = [
  { t: "شرح مشکل" },
  { t: "بارگذاری مدارک" },
  { t: "تحلیل هوشمند" },
  { t: "پاسخ و راهکار" },
];

export function StepTracker() {
  const { state } = useApp();

  const visibleTotal = QUESTIONS.filter((x) => !x.when || x.when(state.data)).length;
  const answered = state.messages.filter((m) => m.role === "u").length;

  let cur: number;
  if (state.ready) cur = 3;
  else if (state.analyzing) cur = 2;
  else cur = answered >= Math.ceil(visibleTotal / 2) ? 1 : 0;

  return (
    <div
      className="step-tracker-sticky"
      style={{
        position: "sticky",
        top: 84,
        zIndex: 45,
        background: "#fff",
        borderBottom: "1px solid #e3e8f1",
        boxShadow: "0 3px 12px rgba(20,40,80,.06)",
      }}
    >
      <div
        className="step-tracker-inner"
        style={{
          maxWidth: 1460,
          margin: "0 auto",
          padding: "13px 26px",
          display: "flex",
          alignItems: "center",
          gap: 20,
          overflowX: "auto",
        }}
      >
        <div className="step-tracker-label" style={{ fontWeight: 800, fontSize: "13.5px", color: "#13265c", whiteSpace: "nowrap", flex: "none" }}>
          مسیر پیگیری شما
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 0, flex: 1, justifyContent: "center", flexWrap: "nowrap" }}>
          {STEP_DEFS.map((x, i) => {
            const done = i < cur;
            const isAct = i === cur;
            let circleStyle: CSSProperties;
            if (isAct) {
              circleStyle = {
                width: 32,
                height: 32,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 13,
                background: "linear-gradient(135deg,#e6b450,#cf9a32)",
                color: "#3a2a06",
                boxShadow: "0 0 0 4px rgba(217,164,65,.18)",
                flex: "none",
                transition: "all .4s cubic-bezier(.22,1,.36,1)",
              };
            } else if (done) {
              circleStyle = {
                width: 32,
                height: 32,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "13.5px",
                background: "linear-gradient(135deg,#22489f,#16306e)",
                color: "#fff",
                flex: "none",
                transition: "all .4s cubic-bezier(.22,1,.36,1)",
              };
            } else {
              circleStyle = {
                width: 32,
                height: 32,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 13,
                background: "#fff",
                border: "2px solid #dbe2ee",
                color: "#9aa3b6",
                flex: "none",
                transition: "all .4s cubic-bezier(.22,1,.36,1)",
              };
            }
            const titleStyle: CSSProperties = {
              fontSize: "12.5px",
              fontWeight: isAct || done ? 800 : 600,
              color: isAct || done ? "#13265c" : "#9aa3b6",
              whiteSpace: "nowrap",
              transition: "color .3s ease",
            };
            const connectorStyle: CSSProperties = {
              width: 30,
              height: 2,
              flex: "none",
              margin: "0 2px",
              background: i < cur ? "linear-gradient(90deg,#22489f,#cf9a32)" : "#e3e8f1",
              transition: "background .4s ease",
            };
            return (
              <div key={x.t} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flex: "none" }}>
                  <div style={circleStyle}>{done ? "✓" : fa(i + 1)}</div>
                  <div style={titleStyle}>{x.t}</div>
                </div>
                {i < STEP_DEFS.length - 1 && <div style={connectorStyle}></div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
