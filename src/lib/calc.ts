import type { ChatData, ClaimItem } from "../types";
import { fa, toNum } from "./format";

export interface BuildResult {
  items: ClaimItem[];
  total: number;
}

export function build(data: ChatData): BuildResult {
  const s = toNum(data.salary);
  const y = Number(data.years) || 0;
  const um = Number(data.unpaidMonths) || 0;
  const daily = Math.round(s / 30);
  const hourly = Math.round(s / 192);
  const c = data.claims || [];
  const items: ClaimItem[] = [];

  if (c.includes("sanavat")) {
    items.push({
      t: "سنوات و مزایای پایان کار",
      sub: `مادهٔ ۲۴ — یک ماه آخرین مزد برای هر سال خدمت (${fa(y)} سال)`,
      amt: Math.round(s * y),
    });
  }
  if (c.includes("eidi")) {
    items.push({
      t: "عیدی و پاداش سال آخر",
      sub: "قانون عیدی مصوب ۱۳۷۰ — معادل دو ماه مزد",
      amt: Math.round(s * 2),
    });
  }
  if (c.includes("morakhasi")) {
    items.push({
      t: "مانده مرخصی استفاده‌نشده",
      sub: "مادهٔ ۶۴ — برآورد ۹ روز مزد",
      amt: Math.round(daily * 9),
      est: true,
    });
  }
  if (c.includes("ezafe")) {
    items.push({
      t: "اضافه‌کاری پرداخت‌نشده",
      sub: "مادهٔ ۵۹ — برآورد ۸۰ ساعت با نرخ ۱۴۰٪",
      amt: Math.round(hourly * 1.4 * 80),
      est: true,
    });
  }
  if (c.includes("maoq")) {
    items.push({
      t: "حقوق معوق",
      sub: `مادهٔ ۳۷ — ${fa(um)} ماه حقوق پرداخت‌نشده`,
      amt: Math.round(s * um),
    });
  }

  const total = items.reduce((a, b) => a + b.amt, 0);
  return { items, total };
}
