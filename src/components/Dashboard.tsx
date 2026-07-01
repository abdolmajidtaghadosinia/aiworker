import type { CSSProperties } from "react";
import { useApp } from "../state/store";
import { DocsUploadPanel } from "./DocsUploadPanel";
import { ChatPanel } from "./ChatPanel";
import { FormPanel } from "./FormPanel";
import { TopicsAndRecent } from "./TopicsAndRecent";
import { ChatIcon, CheckIcon, DocFormIcon } from "./icons";

const tabBtnBase: CSSProperties = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  padding: "12px 14px",
  borderRadius: 10,
  border: "none",
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 800,
  transition: "all .15s",
};

export function Dashboard() {
  const { state, actions } = useApp();
  const isTabChat = state.activeTab !== "form";

  const tabChatStyle: CSSProperties = {
    ...tabBtnBase,
    background: isTabChat ? "#fff" : "transparent",
    color: isTabChat ? "#13265c" : "#6c7689",
    boxShadow: isTabChat ? "0 2px 8px rgba(20,40,80,.12)" : "none",
  };
  const tabFormStyle: CSSProperties = {
    ...tabBtnBase,
    background: !isTabChat ? "#fff" : "transparent",
    color: !isTabChat ? "#13265c" : "#6c7689",
    boxShadow: !isTabChat ? "0 2px 8px rgba(20,40,80,.12)" : "none",
  };

  return (
    <>
      <div className="dashboard-main-grid">
        <DocsUploadPanel />

        <section
          className="panel-min-height"
          style={{
            background: "#fff",
            border: "1px solid #e3e8f1",
            borderRadius: 18,
            boxShadow: "var(--shadow-sm)",
            display: "flex",
            flexDirection: "column",
            minHeight: 560,
            overflow: "hidden",
            transition: "box-shadow .25s ease",
          }}
        >
          {state.ready && (
            <div
              style={{
                padding: "13px 18px",
                background: "linear-gradient(135deg,#e6b450,#cf9a32)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 9, color: "#3a2a06", fontWeight: 800, fontSize: "13.5px" }}>
                <CheckIcon />
                سند حقوقی شما آماده شد
              </div>
              <button
                onClick={actions.toResult}
                style={{
                  background: "#10204c",
                  color: "#f1d79a",
                  border: "none",
                  borderRadius: 9,
                  padding: "8px 16px",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                مشاهده و دانلود ←
              </button>
            </div>
          )}

          <div className="dashboard-tabs-row">
            <button onClick={() => actions.setTab("chat")} style={{ ...tabChatStyle, minWidth: 160 }}>
              <ChatIcon />
              گفتگو با دستیار هوشمند
            </button>
            <button onClick={() => actions.setTab("form")} style={{ ...tabFormStyle, minWidth: 160 }}>
              <DocFormIcon />
              تکمیل مستقیم فرم
            </button>
          </div>

          {isTabChat ? <ChatPanel /> : <FormPanel />}
        </section>
      </div>

      <TopicsAndRecent />
    </>
  );
}
