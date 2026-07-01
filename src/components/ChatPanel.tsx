import type { CSSProperties } from "react";
import { useApp } from "../state/store";
import { QUESTIONS } from "../lib/data";
import { ScaleBadgeIcon, SendIcon } from "./icons";
import type { ChipOption } from "../types";

export function ChatPanel() {
  const { state, refs, actions } = useApp();

  const q = QUESTIONS[state.step] ?? null;
  const active = !!q && !state.typing && !state.ready;

  const isText = active && (q!.type === "text" || q!.type === "number");
  const isChips = active && q!.type === "chips";
  const isMulti = active && q!.type === "multi";
  const inputPh = q ? q.ph ?? "" : "پیام خود را بنویسید…";
  const showQuickFill = !state.ready;

  return (
    <>
      <div
        style={{
          padding: "11px 18px",
          borderBottom: "1px solid #eef1f7",
          display: "flex",
          alignItems: "center",
          gap: 11,
          background: "#fbfcfe",
        }}
      >
        <div
          style={{
            position: "relative",
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "linear-gradient(140deg,#13265c,#0c1a3f)",
            flex: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ScaleBadgeIcon size={21} />
        </div>
        <div style={{ fontSize: "12.5px", color: "#1d8a5c", display: "flex", alignItems: "center", gap: 5, fontWeight: 700 }}>
          <span className="om-live-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#22a866", display: "block" }}></span>
          دستیار آنلاین و آمادهٔ کمک است
        </div>
      </div>
      {state.analyzing && <div className="om-shimmer-bar" style={{ margin: "0 18px" }} />}

      <div
        ref={refs.scrollRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px 18px",
          display: "flex",
          flexDirection: "column",
          gap: 13,
          background: "#f5f7fb",
          minHeight: 360,
        }}
      >
        {state.messages.map((m, i) => {
          const isA = m.role === "a";
          const rowStyle: CSSProperties = {
            display: "flex",
            gap: 10,
            alignItems: "flex-end",
            justifyContent: isA ? "flex-start" : "flex-end",
          };
          const bubbleStyle: CSSProperties = {
            padding: "12px 15px",
            fontSize: "14.5px",
            lineHeight: 1.9,
            borderRadius: isA ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
            background: isA ? "#ffffff" : "linear-gradient(135deg,#22489f,#16306e)",
            color: isA ? "#27365a" : "#ffffff",
            border: isA ? "1px solid #e3e8f1" : "none",
            boxShadow: "0 1px 2px rgba(20,40,80,.05)",
            whiteSpace: "pre-wrap",
          };
          return (
            <div key={i} className="om-fade-in" style={rowStyle}>
              {isA && (
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: "linear-gradient(140deg,#13265c,#0c1a3f)",
                    flex: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ScaleBadgeIcon size={19} />
                </div>
              )}
              <div className="chat-bubble" style={bubbleStyle}>{m.text}</div>
            </div>
          );
        })}
        {state.typing && (
          <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "linear-gradient(140deg,#13265c,#0c1a3f)",
                flex: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ScaleBadgeIcon size={19} />
            </div>
            <div style={{ background: "#fff", border: "1px solid #e3e8f1", borderRadius: "4px 16px 16px 16px", padding: "14px 16px", display: "flex", gap: 5 }}>
              <span className="om-dot" style={{ animationDelay: "0s" }}></span>
              <span className="om-dot" style={{ animationDelay: ".15s" }}></span>
              <span className="om-dot" style={{ animationDelay: ".3s" }}></span>
            </div>
          </div>
        )}
      </div>

      <div style={{ borderTop: "1px solid #eef1f7", padding: "13px 15px", background: "#fff", display: "flex", flexDirection: "column", gap: 10 }}>
        {isText && (
          <div style={{ display: "flex", gap: 9, alignItems: "center" }}>
            <input
              ref={refs.inputRef}
              type="text"
              placeholder={inputPh}
              onKeyDown={actions.onKey}
              className="focus-border"
              style={{
                flex: 1,
                border: "1.5px solid #d6deec",
                borderRadius: 12,
                padding: "12px 14px",
                fontSize: "14.5px",
                outline: "none",
                background: "#fafbfe",
                color: "#15233f",
              }}
            />
            <button
              onClick={actions.submitText}
              className="hover-brighten"
              style={{
                background: "linear-gradient(135deg,#22489f,#16306e)",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                width: 46,
                height: 46,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flex: "none",
              }}
            >
              <SendIcon />
            </button>
          </div>
        )}
        {isChips && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {q!.opts!.map((o) => (
              <button
                key={String(o.v)}
                onClick={() => actions.chooseChip(o)}
                className="hover-outline-blue"
                style={{
                  padding: "10px 17px",
                  borderRadius: 999,
                  border: "1.5px solid #d6deec",
                  background: "#fff",
                  color: "#27365a",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {o.l}
              </button>
            ))}
          </div>
        )}
        {isMulti && (
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {q!.opts!.map((o) => {
                const sel = !!state.pendingMulti.find((p) => p.v === o.v);
                const style: CSSProperties = {
                  padding: "10px 16px",
                  borderRadius: 999,
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 600,
                  transition: "all .15s",
                  border: sel ? "1.5px solid #1d3b8b" : "1.5px solid #d6deec",
                  background: sel ? "linear-gradient(135deg,#22489f,#16306e)" : "#fff",
                  color: sel ? "#fff" : "#27365a",
                };
                return (
                  <button key={String(o.v)} onClick={() => actions.toggleMulti(o as ChipOption)} style={style}>
                    {o.l}
                  </button>
                );
              })}
            </div>
            <button
              onClick={actions.submitMulti}
              className="hover-brighten"
              style={{
                alignSelf: "flex-start",
                background: "linear-gradient(135deg,#22489f,#16306e)",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "11px 26px",
                fontWeight: 700,
                fontSize: "14.5px",
                cursor: "pointer",
              }}
            >
              ادامه ←
            </button>
          </div>
        )}
        {state.ready && (
          <button
            onClick={actions.toResult}
            className="hover-brighten-soft"
            style={{
              width: "100%",
              background: "linear-gradient(135deg,#e6b450,#cf9a32)",
              color: "#3a2a06",
              border: "none",
              borderRadius: 13,
              padding: 15,
              fontSize: "15.5px",
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(207,154,50,.28)",
            }}
          >
            مشاهده و دانلود دادخواست ←
          </button>
        )}
        {showQuickFill && (
          <button
            onClick={actions.fillDemo}
            style={{
              alignSelf: "center",
              background: "none",
              border: "none",
              color: "#9aa3b6",
              fontSize: 12,
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            پر کردن سریع با دادهٔ نمونه (برای نمایش)
          </button>
        )}
      </div>
    </>
  );
}
