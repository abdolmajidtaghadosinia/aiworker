import { useApp } from "../state/store";
import { BellIcon, GearIcon, MenuIcon, ScaleIcon } from "./icons";

const APP_SHELL_SCREENS = new Set(["dashboard", "faq", "docs", "laws", "edu", "account", "support"]);

export function BrandHeader() {
  const { state, actions } = useApp();
  const showHamburger = APP_SHELL_SCREENS.has(state.screen);

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        overflow: "hidden",
        background:
          "radial-gradient(1200px 200px at 80% -40%,rgba(217,164,65,.18),transparent),linear-gradient(110deg,#0a1734,#132a63 60%,#0f2150)",
        boxShadow: "0 2px 14px rgba(10,23,52,.16)",
      }}
    >
      <div className="brand-utility-cluster">
        <span className="demo-badge-label" style={{
          background: "rgba(230,180,80,.16)",
          color: "#f1d79a",
          border: "1px solid rgba(230,180,80,.35)",
          borderRadius: "999px",
          padding: "6px 13px",
          fontSize: "11.5px",
          fontWeight: 700,
          whiteSpace: "nowrap",
        }}>
          نسخهٔ دمو
        </span>
        <button
          onClick={actions.navSoon}
          className="hover-icon-btn"
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            border: "none",
            flex: "none",
          }}
        >
          <GearIcon />
        </button>
        <button
          onClick={actions.navSoon}
          className="hover-icon-btn"
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            border: "none",
            flex: "none",
          }}
        >
          <BellIcon />
        </button>
        {showHamburger && (
          <button
            onClick={actions.toggleSidebar}
            className="hover-icon-btn hamburger-btn"
            aria-label="باز کردن منو"
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: "none",
              flex: "none",
            }}
          >
            <MenuIcon />
          </button>
        )}
      </div>
      <div className="brand-header-inner">
        <div className="brand-logo-wrap" style={{ width: 50, height: 50, flex: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ScaleIcon />
        </div>
        <div style={{ textAlign: "center" }}>
          <div className="brand-title" style={{ fontWeight: 900, fontSize: 21, color: "#fff", letterSpacing: "-.3px" }}>
            دستیار حقوقی هوشمند کارگر
          </div>
          <div className="brand-subtitle" style={{ fontSize: "12.5px", color: "#aebbd8", marginTop: 2 }}>
            هر زمان، در کنار شما برای احقاق حقوقتان
          </div>
        </div>
      </div>
    </div>
  );
}
