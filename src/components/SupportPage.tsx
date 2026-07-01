import { useApp } from "../state/store";

export function SupportPage() {
  const { refs, actions } = useApp();

  return (
    <div>
      <div>
        <h1 className="page-heading" style={{ margin: "0 0 18px", fontSize: 22, fontWeight: 800, color: "#13265c" }}>پشتیبانی</h1>
      </div>
      <div style={{ background: "#fff", border: "1px solid #e3e8f1", borderRadius: 18, padding: 24, maxWidth: 520 }}>
        <div style={{ fontSize: "13.5px", color: "#41506b", lineHeight: 2, marginBottom: 16 }}>
          تیم پشتیبانی خانهٔ کارگر هر روز از ساعت ۸ تا ۲۰ پاسخگوی شماست.
        </div>
        <textarea
          ref={refs.supportRef}
          placeholder="پیام خود را بنویسید…"
          rows={4}
          className="focus-border"
          style={{
            width: "100%",
            border: "1.5px solid #d6deec",
            borderRadius: 11,
            padding: 12,
            fontSize: 14,
            outline: "none",
            background: "#fafbfe",
            color: "#15233f",
            resize: "none",
          }}
        ></textarea>
        <button
          onClick={actions.sendSupport}
          style={{
            marginTop: 14,
            width: "100%",
            background: "linear-gradient(135deg,#22489f,#16306e)",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: 13,
            fontSize: 14,
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          ارسال پیام
        </button>
      </div>
    </div>
  );
}
