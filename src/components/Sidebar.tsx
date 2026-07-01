import type { CSSProperties } from "react";
import { profileNameFromPhone, useApp } from "../state/store";
import {
  BookIcon,
  ChatIcon,
  DocIcon,
  GraduationIcon,
  GridIcon,
  HelpCircleIcon,
  SupportIcon,
  UserCircleIcon,
  XIcon,
} from "./icons";

const navItemBase: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 11,
  padding: "11px 13px",
  borderRadius: 12,
  cursor: "pointer",
  fontSize: 14,
  transition: "all .15s",
};
const navItemActive: CSSProperties = {
  ...navItemBase,
  fontWeight: 700,
  background: "linear-gradient(135deg,rgba(217,164,65,.24),rgba(217,164,65,.08))",
  color: "#f1d79a",
  border: "1px solid rgba(217,164,65,.32)",
};
const navItemInactive: CSSProperties = {
  ...navItemBase,
  fontWeight: 600,
  color: "#c2cce2",
  border: "1px solid transparent",
};

export function Sidebar() {
  const { state, actions } = useApp();
  const isDashboardScreen = state.screen === "dashboard";
  const isFaq = state.screen === "faq";
  const ns = (key: string) => (state.screen === key ? navItemActive : navItemInactive);
  const profileName = profileNameFromPhone(state.authPhone);

  return (
    <>
      <div
        className={`sidebar-backdrop${state.sidebarOpen ? " is-open" : ""}`}
        onClick={actions.closeSidebar}
      />
      <aside
        className={`sidebar${state.sidebarOpen ? " is-open" : ""}`}
        style={{
          width: 248,
          flex: "none",
          position: "sticky",
          top: isDashboardScreen ? 164 : 104,
          background: "linear-gradient(180deg,#10204c,#0c1a3f)",
          borderRadius: 20,
          padding: "16px 14px",
          boxShadow: "0 14px 34px rgba(10,23,52,.22)",
        }}
      >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 11,
          padding: "8px 8px 14px",
          borderBottom: "1px solid rgba(255,255,255,.08)",
          marginBottom: 12,
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 13,
            background: "linear-gradient(135deg,#e6b450,#cf9a32)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#3a2a06",
            fontWeight: 800,
            fontSize: 16,
            flex: "none",
          }}
        >
          ک
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {profileName}
          </div>
          <div style={{ color: "#8fa0c4", fontSize: "11.5px" }}>حساب کارگری</div>
        </div>
        <button
          onClick={actions.closeSidebar}
          className="sidebar-close-btn hover-icon-btn"
          aria-label="بستن منو"
          style={{
            width: 30,
            height: 30,
            borderRadius: 9,
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            border: "none",
            flex: "none",
          }}
        >
          <XIcon size={16} />
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div onClick={actions.navDashboard} className="hover-nav-item" style={isDashboardScreen ? navItemActive : navItemInactive}>
          <GridIcon />
          <span>داشبورد</span>
        </div>
        <div onClick={actions.navChat} className="hover-nav-item" style={navItemInactive}>
          <ChatIcon />
          <span>مشاوره حقوقی با AI</span>
        </div>
        <div onClick={() => actions.navFaq()} className="hover-nav-item" style={isFaq ? navItemActive : navItemInactive}>
          <HelpCircleIcon />
          <span>سوالات متداول</span>
        </div>
        <div onClick={() => actions.nav("docs")} className="hover-nav-item" style={ns("docs")}>
          <DocIcon />
          <span>نمونه اسناد</span>
        </div>
        <div onClick={() => actions.nav("laws")} className="hover-nav-item" style={ns("laws")}>
          <BookIcon />
          <span>قوانین و مقررات کار</span>
        </div>
        <div onClick={() => actions.nav("edu")} className="hover-nav-item" style={ns("edu")}>
          <GraduationIcon />
          <span>آموزش حقوق کار</span>
        </div>
        <div onClick={() => actions.nav("account")} className="hover-nav-item" style={ns("account")}>
          <UserCircleIcon />
          <span>حساب کاربری</span>
        </div>
        <div onClick={() => actions.nav("support")} className="hover-nav-item" style={ns("support")}>
          <SupportIcon />
          <span>پشتیبانی</span>
        </div>
      </div>

      <div
        className="hover-row-lift"
        style={{
          marginTop: 16,
          borderRadius: 16,
          padding: 16,
          background: "linear-gradient(150deg,#e6b450,#cf9a32)",
          boxShadow: "0 8px 20px rgba(207,154,50,.28)",
        }}
      >
        <div style={{ fontWeight: 800, fontSize: "14.5px", color: "#3a2a06" }}>نسخهٔ حرفه‌ای</div>
        <div style={{ fontSize: 12, color: "#5c481a", lineHeight: 1.85, margin: "6px 0 12px" }}>
          مشاورهٔ نامحدود، دانلود اسناد رسمی و مزایای ویژه
        </div>
        <button
          onClick={actions.proClick}
          style={{
            width: "100%",
            background: "#10204c",
            color: "#f1d79a",
            border: "none",
            borderRadius: 10,
            padding: 10,
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          ارتقا به نسخهٔ حرفه‌ای
        </button>
      </div>
      </aside>
    </>
  );
}
