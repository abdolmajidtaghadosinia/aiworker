import { useApp } from "../state/store";

export function Toast() {
  const { state } = useApp();
  if (!state.toast) return null;

  return (
    <div
      className="om-toast no-print"
      style={{
        position: "fixed",
        bottom: 26,
        left: "50%",
        transform: "translateX(-50%)",
        background: "#10204c",
        color: "#fff",
        padding: "13px 22px",
        borderRadius: 12,
        fontSize: 14,
        fontWeight: 600,
        boxShadow: "0 10px 30px rgba(10,23,52,.3)",
        zIndex: 300,
        maxWidth: "calc(100vw - 32px)",
        textAlign: "center",
      }}
    >
      {state.toast}
    </div>
  );
}
