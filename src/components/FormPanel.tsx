import { useApp } from "../state/store";
import { build } from "../lib/calc";
import { fa, toNum } from "../lib/format";
import { DOC_TYPE } from "../lib/data";
import { SparkleIcon } from "./icons";

const fieldLabelStyle = { fontSize: "12.5px", fontWeight: 700, color: "#41506b", marginBottom: 6, display: "block" } as const;
const fieldInputStyle = {
  width: "100%",
  border: "1.5px solid #d6deec",
  borderRadius: 11,
  padding: "11px 12px",
  fontSize: 14,
  background: "#fafbfe",
  color: "#15233f",
  outline: "none",
} as const;

export function FormPanel() {
  const { state, refs, actions } = useApp();
  const d = state.data;
  const f = state.form;

  const preview = toNum(d.salary) && d.claims && d.claims.length ? build(d) : null;

  const employerVal = f.employer === null ? d.employer || "" : f.employer;
  const amountVal = f.amount === null ? (preview ? fa(preview.total) : "") : f.amount;
  const nameVal = f.name === null ? d.name || "" : f.name;

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px 22px", display: "flex", flexDirection: "column", background: "#fff", minHeight: 360 }}>
      <div style={{ fontSize: "12.5px", color: "#6c7689", lineHeight: 1.9, marginBottom: 16, background: "#f5f7fb", borderRadius: 10, padding: "11px 13px" }}>
        اگر اطلاعاتت رو از قبل می‌دونی، می‌تونی بدون گفتگو، مستقیم فرم زیر رو پر کنی و سندت رو بسازی.
      </div>

      <div className="form-two-col-grid">
        <div>
          <label style={{ fontSize: "12.5px", fontWeight: 700, color: "#41506b", marginBottom: 6, display: "block" }}>نوع سند</label>
          <select
            value={f.docType}
            onChange={actions.onDocType}
            className="focus-border"
            style={{
              width: "100%",
              border: "1.5px solid #d6deec",
              borderRadius: 11,
              padding: "11px 12px",
              fontSize: 14,
              background: "#fafbfe",
              color: "#15233f",
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option>{DOC_TYPE.PETITION}</option>
            <option>{DOC_TYPE.DISMISSAL}</option>
            <option>{DOC_TYPE.INSURANCE}</option>
            <option>{DOC_TYPE.NOTICE}</option>
          </select>
        </div>
        <div>
          <label style={{ fontSize: "12.5px", fontWeight: 700, color: "#41506b", marginBottom: 6, display: "block" }}>نام و نام خانوادگی</label>
          <input
            ref={refs.nameRef}
            type="text"
            value={nameVal}
            onChange={actions.onName}
            placeholder="نام شما"
            className="focus-border"
            style={{
              width: "100%",
              border: "1.5px solid #d6deec",
              borderRadius: 11,
              padding: "11px 12px",
              fontSize: 14,
              background: "#fafbfe",
              color: "#15233f",
              outline: "none",
            }}
          />
        </div>
      </div>

      <div className="form-two-col-grid" style={{ marginTop: 14 }}>
        <div>
          <label style={{ fontSize: "12.5px", fontWeight: 700, color: "#41506b", marginBottom: 6, display: "block" }}>نام کارفرما / شرکت</label>
          <input
            type="text"
            value={employerVal}
            onChange={actions.onEmployer}
            placeholder="نام کارفرما یا شرکت را وارد کنید"
            className="focus-border"
            style={{
              width: "100%",
              border: "1.5px solid #d6deec",
              borderRadius: 11,
              padding: "11px 12px",
              fontSize: 14,
              background: "#fafbfe",
              color: "#15233f",
              outline: "none",
            }}
          />
        </div>
        <div>
          <label style={{ fontSize: "12.5px", fontWeight: 700, color: "#41506b", marginBottom: 6, display: "block" }}>مبلغ مطالبه (تومان)</label>
          <input
            type="text"
            value={amountVal}
            onChange={actions.onAmount}
            placeholder="مبلغ را وارد کنید"
            className="focus-border"
            style={{
              width: "100%",
              border: "1.5px solid #d6deec",
              borderRadius: 11,
              padding: "11px 12px",
              fontSize: 14,
              background: "#fafbfe",
              color: "#15233f",
              outline: "none",
            }}
          />
        </div>
      </div>
      {preview ? (
        <div style={{ fontSize: "11.5px", color: "#1d8a5c", marginTop: 7, fontWeight: 600 }}>
          برآورد محاسبه‌شده بر پایهٔ قانون کار (از گفتگو)
        </div>
      ) : (
        <div style={{ fontSize: "11.5px", color: "#9aa3b6", marginTop: 7, lineHeight: 1.7 }}>
          یا با تکمیل گفتگو، این مبلغ خودکار محاسبه می‌شود.
        </div>
      )}

      {f.docType === DOC_TYPE.DISMISSAL && (
        <div style={{ marginTop: 14 }}>
          <label style={fieldLabelStyle}>تاریخ اخراج</label>
          <input
            type="text"
            value={f.dismissalDate || ""}
            onChange={actions.onDismissalDate}
            placeholder="مثلاً: ۱۴۰۵/۰۲/۱۵"
            className="focus-border"
            style={fieldInputStyle}
          />
        </div>
      )}

      {f.docType === DOC_TYPE.INSURANCE && (
        <div style={{ marginTop: 14 }}>
          <label style={fieldLabelStyle}>بازهٔ عدم واریز حق بیمه</label>
          <input
            type="text"
            value={f.insurancePeriod || ""}
            onChange={actions.onInsurancePeriod}
            placeholder="مثلاً: مهر تا اسفند ۱۴۰۴"
            className="focus-border"
            style={fieldInputStyle}
          />
        </div>
      )}

      {f.docType === DOC_TYPE.NOTICE && (
        <div style={{ marginTop: 14 }}>
          <label style={fieldLabelStyle}>مهلت پرداخت (روز)</label>
          <input
            type="text"
            value={f.noticeDeadlineDays || ""}
            onChange={actions.onNoticeDeadlineDays}
            placeholder="۱۰"
            className="focus-border"
            style={fieldInputStyle}
          />
        </div>
      )}

      <div style={{ marginTop: 14 }}>
        <label style={{ fontSize: "12.5px", fontWeight: 700, color: "#41506b", marginBottom: 6, display: "block" }}>توضیحات تکمیلی</label>
        <textarea
          value={f.notes}
          onChange={actions.onNotes}
          placeholder="توضیحات خود را وارد کنید"
          rows={3}
          className="focus-border"
          style={{
            width: "100%",
            border: "1.5px solid #d6deec",
            borderRadius: 11,
            padding: "11px 12px",
            fontSize: 14,
            background: "#fafbfe",
            color: "#15233f",
            outline: "none",
            resize: "none",
          }}
        ></textarea>
      </div>

      <button
        onClick={actions.generateDoc}
        className="hover-brighten"
        style={{
          marginTop: 18,
          width: "100%",
          background: "linear-gradient(135deg,#22489f,#16306e)",
          color: "#fff",
          border: "none",
          borderRadius: 13,
          padding: 15,
          fontSize: 15,
          fontWeight: 800,
          cursor: "pointer",
          boxShadow: "0 8px 20px rgba(29,59,139,.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <SparkleIcon />
        تولید سند حقوقی
      </button>
    </div>
  );
}
