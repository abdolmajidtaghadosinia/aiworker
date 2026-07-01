import { EDU_DATA } from "../lib/data";
import { BookOpenIcon } from "./icons";

export function EduPage() {
  return (
    <div>
      <div>
        <h1 className="page-heading" style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800, color: "#13265c" }}>آموزش حقوق کار</h1>
        <p style={{ margin: "0 0 18px", fontSize: 14, color: "#6c7689" }}>دوره‌های آموزشی کوتاه، به‌زودی در دسترس.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        {EDU_DATA.map((ed) => (
          <div key={ed} style={{ background: "#fff", border: "1px solid #e3e8f1", borderRadius: 14, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#f3f5fa", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
              <BookOpenIcon />
            </div>
            <div style={{ flex: 1, fontWeight: 700, fontSize: 14, color: "#27365a" }}>{ed}</div>
            <span style={{ background: "#f3f5fa", color: "#9aa3b6", borderRadius: 999, padding: "5px 12px", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>
              به‌زودی
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
