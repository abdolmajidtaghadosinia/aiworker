import { useApp } from "../state/store";
import { build } from "../lib/calc";
import { fa, toNum, todayJalali } from "../lib/format";
import { CLAIM_LABEL, DOC_TYPE } from "../lib/data";
import { buildDocumentContent } from "../lib/doc";
import { ArrowRightIcon } from "./icons";

export function ResultPage() {
  const { state, actions, refs } = useApp();
  const d = state.data;
  const f = state.form;

  const built = build(d);
  const docItemsChat = built.items.map((it) => ({ t: it.t, sub: it.sub, amtfa: `${fa(it.amt)} تومان` }));

  const preview = toNum(d.salary) && d.claims && d.claims.length ? build(d) : null;
  const employerVal = f.employer === null ? d.employer || "" : f.employer;
  const amountVal = f.amount === null ? (preview ? fa(preview.total) : "") : f.amount;
  const nameVal = f.name === null ? d.name || "" : f.name;

  const usingChatCalc = built.items.length > 0;
  const finalTotalNum = usingChatCalc ? built.total : toNum(amountVal);
  const finalItems = usingChatCalc
    ? docItemsChat
    : toNum(amountVal) > 0
      ? [{ t: f.docType || "مطالبات کارگری", sub: "مبلغ ثبت‌شده از طریق فرم مستقیم", amtfa: `${fa(toNum(amountVal))} تومان` }]
      : [];
  const finalName = d.name && d.name.trim() ? d.name : nameVal || "—";
  const finalEmployer = d.employer && d.employer.trim() ? d.employer : employerVal || "—";
  const hasDetailed = !!(d.years && toNum(d.salary));

  const docType = f.docType || DOC_TYPE.PETITION;
  const docTotalFa = `${fa(finalTotalNum)} تومان`;
  const claimsList = (d.claims || []).map((x) => CLAIM_LABEL[x]).filter(Boolean).join("، ") || "حقوق و مزایای قانونی";

  const dc = buildDocumentContent({
    docType,
    name: finalName,
    employer: finalEmployer,
    yearsFa: fa(Number(d.years) || 0),
    salaryFa: fa(toNum(d.salary)),
    contract: d.contract || "—",
    hasDetailed,
    claimsList,
    totalFa: docTotalFa,
    hasClaims: finalTotalNum > 0,
    dismissalDate: f.dismissalDate,
    insurancePeriod: f.insurancePeriod,
    noticeDeadlineDays: f.noticeDeadlineDays,
  });

  return (
    <div className="result-page-wrap" style={{ maxWidth: 1180, margin: "0 auto", padding: "24px 26px 60px" }}>
      <div className="no-print result-toolbar">
        <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
          <button
            onClick={actions.back}
            className="hover-ghost-btn"
            style={{ width: 42, height: 42, borderRadius: 11, background: "#fff", border: "1px solid #e3e8f1", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#41506b" }}
          >
            <ArrowRightIcon />
          </button>
          <div>
            <h1 className="page-heading" style={{ margin: "0 0 3px", fontSize: 24, fontWeight: 800, color: "#13265c" }}>سند شما آماده است</h1>
            <p style={{ margin: 0, fontSize: 14, color: "#6c7689" }}>بازبینی کن، در صورت نیاز ویرایش کن و فایل رسمی رو بگیر.</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
          <button onClick={actions.toEdit} className="hover-ghost-btn" style={{ background: "#fff", border: "1px solid #e3e8f1", borderRadius: 11, padding: "11px 16px", fontSize: 14, fontWeight: 600, color: "#41506b", cursor: "pointer" }}>
            ویرایش پاسخ‌ها
          </button>
          <button onClick={actions.sendExpert} className="hover-ghost-btn" style={{ background: "#fff", border: "1px solid #e3e8f1", borderRadius: 11, padding: "11px 16px", fontSize: 14, fontWeight: 600, color: "#41506b", cursor: "pointer" }}>
            ارسال به کارشناس
          </button>
          <button onClick={actions.printDoc} className="hover-ghost-btn" style={{ background: "#fff", border: "1px solid #e3e8f1", borderRadius: 11, padding: "11px 16px", fontSize: 14, fontWeight: 600, color: "#41506b", cursor: "pointer" }}>
            چاپ
          </button>
          <button
            onClick={actions.download}
            disabled={state.pdfGenerating}
            className="hover-brighten-soft"
            style={{
              background: "linear-gradient(135deg,#e6b450,#cf9a32)",
              border: "none",
              borderRadius: 11,
              padding: "11px 20px",
              fontSize: 14,
              fontWeight: 800,
              color: "#3a2a06",
              cursor: state.pdfGenerating ? "default" : "pointer",
              opacity: state.pdfGenerating ? 0.7 : 1,
              boxShadow: "0 6px 16px rgba(207,154,50,.26)",
            }}
          >
            {state.pdfGenerating ? "در حال ساخت PDF…" : "دانلود PDF"}
          </button>
        </div>
      </div>

      <div className="result-grid">
        <div ref={refs.docRef} className="result-doc-paper" style={{ background: "#fff", border: "1px solid #e3e8f1", borderRadius: 10, boxShadow: "0 6px 28px rgba(20,40,80,.09)", lineHeight: 2.05, fontSize: 15, color: "#1d2b3f" }}>
          <div style={{ textAlign: "center", fontSize: 13, color: "#6c7689", marginBottom: 16 }}>بسمه تعالی</div>
          <div style={{ textAlign: "center", fontWeight: 800, fontSize: 19, lineHeight: 1.6, marginBottom: 6, color: "#13265c" }}>
            {dc.recipientTitle}
            <br />
            {dc.recipientSub}
          </div>
          <div style={{ height: 3, width: 90, background: "linear-gradient(90deg,#e6b450,#cf9a32)", borderRadius: 2, margin: "12px auto 18px" }}></div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px", color: "#9aa3b6", borderBottom: "2px solid #13265c", paddingBottom: 14, marginBottom: 18 }}>
            <span>تاریخ تنظیم: {todayJalali()}</span>
            <span>شمارهٔ پرونده: (پس از ثبت تخصیص می‌یابد)</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 20, fontSize: "14.5px" }}>
            <div>
              <strong style={{ display: "inline-block", minWidth: 150, color: "#1d3b8b" }}>{dc.plaintiffLabel}:</strong> {finalName} — کارگر
            </div>
            <div>
              <strong style={{ display: "inline-block", minWidth: 150, color: "#1d3b8b" }}>{dc.defendantLabel}:</strong> {finalEmployer} — کارفرما
            </div>
            <div>
              <strong style={{ display: "inline-block", minWidth: 150, color: "#1d3b8b" }}>موضوع:</strong> {dc.subject}
            </div>
          </div>

          <div style={{ fontWeight: 800, fontSize: "15.5px", marginBottom: 8, color: "#1d3b8b" }}>شرح {docType}</div>
          <p style={{ margin: "0 0 16px", textAlign: "justify" }}>{dc.body}</p>

          <div style={{ fontWeight: 800, fontSize: "15.5px", margin: "22px 0 10px", color: "#1d3b8b" }}>{dc.tableTitle}</div>
          <div style={{ border: "1px solid #e3e8f1", borderRadius: 8, overflow: "hidden" }}>
            {finalItems.map((it, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 14, padding: "13px 16px", borderBottom: "1px solid #eef1f7" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "14.5px" }}>{it.t}</div>
                  <div style={{ fontSize: "12.5px", color: "#9aa3b6", marginTop: 2 }}>{it.sub}</div>
                </div>
                <div style={{ fontWeight: 700, fontSize: "14.5px", whiteSpace: "nowrap", alignSelf: "center" }}>{it.amtfa}</div>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", gap: 14, padding: "15px 16px", background: "#fbf3e0" }}>
              <div style={{ fontWeight: 800, fontSize: 15, color: "#b9842b" }}>جمع کل مطالبات</div>
              <div style={{ fontWeight: 800, fontSize: 16, color: "#b9842b", whiteSpace: "nowrap" }}>{docTotalFa}</div>
            </div>
          </div>

          <div style={{ fontWeight: 800, fontSize: "15.5px", margin: "22px 0 10px", color: "#1d3b8b" }}>مستندات قانونی</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {dc.articles.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start", fontSize: 14 }}>
                <span style={{ color: "#cf9a32", fontWeight: 800, flex: "none" }}>•</span>
                <span>{a}</span>
              </div>
            ))}
          </div>

          <div style={{ fontWeight: 800, fontSize: "15.5px", margin: "22px 0 8px", color: "#1d3b8b" }}>خواستهٔ نهایی</div>
          <p style={{ margin: "0 0 28px", textAlign: "justify" }}>{dc.finalRequest}</p>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 34, fontSize: 14 }}>
            <div>
              {dc.signatureLabel}: <strong>{finalName}</strong>
            </div>
            <div style={{ color: "#9aa3b6" }}>تاریخ و امضا: ......................</div>
          </div>
        </div>

        <div className="no-print result-side-notes" style={{ position: "sticky", top: 20, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ background: "#fdf3e0", border: "1px solid #f1ddb8", borderRadius: 14, padding: 16 }}>
            <div style={{ fontWeight: 800, fontSize: "14.5px", color: "#b9842b", marginBottom: 7 }}>نکتهٔ مهم دربارهٔ مهلت</div>
            <div style={{ fontSize: 13, color: "#8a6a2b", lineHeight: 1.95 }}>
              {docType === DOC_TYPE.NOTICE
                ? `اگر کارفرما ظرف مهلت مقرر در اظهارنامه پاسخ ندهد، می‌تونی مستقیم دادخواست را در هیأت تشخیص ادارهٔ کار ثبت کنی.`
                : docType === DOC_TYPE.DISMISSAL
                  ? "برای اعتراض به رأی هیأت تشخیص، فقط ۱۵ روز از تاریخ ابلاغ رأی فرصت داری؛ هرچه زودتر اقدام کن."
                  : "هرچه زودتر دادخواست رو ثبت کنی، حقت بهتر حفظ می‌شه. پروندهٔ مطالبات در هیأت تشخیص ادارهٔ کار رسیدگی می‌شود."}
            </div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #e3e8f1", borderRadius: 14, padding: 16 }}>
            <div style={{ fontWeight: 800, fontSize: "14.5px", marginBottom: 10, color: "#13265c" }}>مدارک پیشنهادی برای پیوست</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", gap: 8, fontSize: 13, color: "#41506b" }}>
                <span style={{ color: "#1d8a5c", fontWeight: 800 }}>✓</span>قرارداد کار یا مدرک رابطهٔ کاری
              </div>
              <div style={{ display: "flex", gap: 8, fontSize: 13, color: "#41506b" }}>
                <span style={{ color: "#1d8a5c", fontWeight: 800 }}>✓</span>فیش حقوقی یا سابقهٔ بیمه
              </div>
              <div style={{ display: "flex", gap: 8, fontSize: 13, color: "#41506b" }}>
                <span style={{ color: "#1d8a5c", fontWeight: 800 }}>✓</span>هرگونه مکاتبه، پیامک یا شاهد
              </div>
            </div>
          </div>
          <div style={{ background: "#f5f7fb", border: "1px dashed #c3d0ea", borderRadius: 14, padding: 15, fontSize: 12, color: "#8a93a7", lineHeight: 1.9 }}>
            این پیش‌نویس به‌صورت خودکار توسط دستیار تهیه شده و جایگزین مشاورهٔ حقوقی نیست. پیش از ثبت، با کارشناس خانهٔ کارگر بررسی کن.
          </div>
        </div>
      </div>
    </div>
  );
}
