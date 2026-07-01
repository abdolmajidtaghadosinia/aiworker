import { profileNameFromPhone, useApp } from "../state/store";
import { todayJalali } from "../lib/format";

export function AccountPage() {
  const { state, actions } = useApp();
  const profileName = profileNameFromPhone(state.authPhone);

  return (
    <div>
      <div>
        <h1 className="page-heading" style={{ margin: "0 0 18px", fontSize: 22, fontWeight: 800, color: "#13265c" }}>حساب کاربری</h1>
      </div>
      <div style={{ background: "#fff", border: "1px solid #e3e8f1", borderRadius: 18, padding: 24, maxWidth: 460 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid #eef1f7" }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#e6b450,#cf9a32)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#3a2a06",
              fontWeight: 800,
              fontSize: 20,
            }}
          >
            ک
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: "#13265c" }}>{profileName}</div>
            <div style={{ fontSize: "12.5px", color: "#6c7689", marginTop: 2 }}>حساب کارگری</div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", fontSize: "13.5px", borderBottom: "1px solid #f1f3f8" }}>
          <span style={{ color: "#6c7689" }}>تاریخ عضویت</span>
          <span style={{ fontWeight: 600, color: "#27365a" }}>{todayJalali()}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", fontSize: "13.5px", borderBottom: "1px solid #f1f3f8" }}>
          <span style={{ color: "#6c7689" }}>نوع حساب</span>
          <span style={{ fontWeight: 600, color: "#27365a" }}>رایگان (دمو)</span>
        </div>
        <button
          onClick={actions.logout}
          style={{
            marginTop: 18,
            width: "100%",
            background: "#fff",
            border: "1.5px solid #c0392b",
            color: "#c0392b",
            borderRadius: 12,
            padding: 12,
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          خروج از حساب
        </button>
      </div>
    </div>
  );
}
