export type Screen =
  | "auth"
  | "dashboard"
  | "faq"
  | "docs"
  | "laws"
  | "edu"
  | "account"
  | "support"
  | "result";

export type AuthStep = "phone" | "otp";

export type QuestionType = "text" | "number" | "chips" | "multi";

export interface ChipOption {
  v: string | number;
  l: string;
}

export interface Question {
  field: string;
  q: string;
  type: QuestionType;
  ph?: string;
  opts?: ChipOption[];
  when?: (data: ChatData) => boolean;
}

export interface ChatData {
  name?: string;
  name_d?: string;
  employer?: string;
  employer_d?: string;
  years?: number;
  years_d?: string;
  salary?: number;
  salary_d?: string;
  claims?: string[];
  claims_d?: string;
  unpaidMonths?: number;
  unpaidMonths_d?: string;
  contract?: string;
  contract_d?: string;
  docs?: string[];
  docs_d?: string;
}

export interface ChatMessage {
  role: "a" | "u";
  text: string;
}

export interface FormState {
  docType: string;
  name: string | null;
  employer: string | null;
  amount: string | null;
  notes: string;
  dismissalDate: string | null;
  insurancePeriod: string | null;
  noticeDeadlineDays: string | null;
}

export interface ClaimItem {
  t: string;
  sub: string;
  amt: number;
  est?: boolean;
}

export interface FaqCategory {
  key: string;
  label: string;
}

export interface FaqEntry {
  id: string;
  cat: string;
  q: string;
  a: string;
}

export interface DocTypeInfo {
  t: string;
  d: string;
}

export interface LawInfo {
  n: string;
  t: string;
  d: string;
}
