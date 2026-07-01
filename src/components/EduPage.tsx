import { useState } from "react";
import { EDU_DATA } from "../lib/data";
import { BookOpenIcon, ChevronDownIcon } from "./icons";

export function EduPage() {
  const [open, setOpen] = useState<Record<string, boolean>>({ basics: true });

  return (
    <div>
      <div>
        <h1 className="page-heading" style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800, color: "#13265c" }}>آموزش حقوق کار</h1>
        <p style={{ margin: "0 0 18px", fontSize: 14, color: "#6c7689" }}>خلاصهٔ کاربردی مهم‌ترین مباحث قانون کار — روی هر مورد بزن تا باز شود.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        {EDU_DATA.map((ed) => {
          const isOpen = !!open[ed.id];
          return (
            <div
              key={ed.id}
              className="hover-row-lift"
              style={{ background: "#fff", border: isOpen ? "1px solid #c3d0ea" : "1px solid #e3e8f1", borderRadius: 14, overflow: "hidden", boxShadow: isOpen ? "var(--shadow-sm)" : "var(--shadow-xs)" }}
            >
              <div
                onClick={() => setOpen((s) => ({ ...s, [ed.id]: !s[ed.id] }))}
                style={{ padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}
              >
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#f3f5fa", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                  <BookOpenIcon />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#27365a" }}>{ed.title}</div>
                  <div style={{ fontSize: 12, color: "#9aa3b6", marginTop: 3 }}>{ed.summary}</div>
                </div>
                <ChevronDownIcon style={{ transition: "transform .2s ease", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", flex: "none" }} />
              </div>
              <div style={{ maxHeight: isOpen ? 900 : 0, opacity: isOpen ? 1 : 0, overflow: "hidden", transition: "all .25s ease" }}>
                <div style={{ padding: "4px 18px 20px 66px", display: "flex", flexDirection: "column", gap: 10 }}>
                  {ed.body.map((p, i) => (
                    <p key={i} style={{ margin: 0, fontSize: "13.5px", color: "#41506b", lineHeight: 2, textAlign: "justify" }}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
