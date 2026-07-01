const FA_DIGIT_MAP: Record<string, string> = {
  "۰": "0",
  "۱": "1",
  "۲": "2",
  "۳": "3",
  "۴": "4",
  "۵": "5",
  "۶": "6",
  "۷": "7",
  "۸": "8",
  "۹": "9",
  "٠": "0",
  "١": "1",
  "٢": "2",
  "٣": "3",
  "٤": "4",
  "٥": "5",
  "٦": "6",
  "٧": "7",
  "٨": "8",
  "٩": "9",
};

const EN_TO_FA_DIGIT_MAP: Record<string, string> = {
  "0": "۰",
  "1": "۱",
  "2": "۲",
  "3": "۳",
  "4": "۴",
  "5": "۵",
  "6": "۶",
  "7": "۷",
  "8": "۸",
  "9": "۹",
};

export function fa(n: number | string): string {
  try {
    return Number(n).toLocaleString("fa-IR");
  } catch {
    return String(n);
  }
}

export function toNum(s: number | string | null | undefined): number {
  if (typeof s === "number") return s;
  if (s == null) return 0;
  const x = String(s)
    .replace(/[۰-۹٠-٩]/g, (c) => FA_DIGIT_MAP[c] ?? c)
    .replace(/[^0-9]/g, "");
  return Number(x) || 0;
}

export function normDigits(s: string | null | undefined): string {
  if (s == null) return "";
  return String(s)
    .replace(/[۰-۹٠-٩]/g, (c) => FA_DIGIT_MAP[c] ?? c)
    .replace(/[^0-9]/g, "");
}

export function toFaDigits(s: string | number): string {
  return String(s).replace(/[0-9]/g, (c) => EN_TO_FA_DIGIT_MAP[c] ?? c);
}

export function formatPhone(d: string): string {
  if (!d) return "";
  const parts = d.length === 11 ? [d.slice(0, 4), d.slice(4, 7), d.slice(7)] : [d];
  return toFaDigits(parts.join(" "));
}

export function todayJalali(): string {
  const parts = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return toFaDigits(`${get("year")}/${get("month")}/${get("day")}`);
}
