import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type {
  AuthStep,
  ChatData,
  ChatMessage,
  ChipOption,
  FormState,
  Screen,
} from "../types";
import { DEMO_CODE, FAQ_DATA, QUESTIONS } from "../lib/data";
import { build } from "../lib/calc";
import { fa, normDigits, toNum } from "../lib/format";

interface State {
  screen: Screen;
  authStep: AuthStep;
  authPhone: string;
  authCode: string;
  authError: string | null;
  authCountdown: number;
  authVerifying: boolean;
  messages: ChatMessage[];
  step: number;
  data: ChatData;
  pendingMulti: ChipOption[];
  typing: boolean;
  analyzing: boolean;
  ready: boolean;
  toast: string;
  activeTab: "chat" | "form";
  faqQuery: string;
  faqCategory: string;
  faqOpen: Record<string, boolean>;
  form: FormState;
  sidebarOpen: boolean;
  pdfGenerating: boolean;
}

const GREETING =
  "سلام، خوش اومدی. من دستیار حقوقی هوشمند کارگرم و کنارتم تا حقت رو بگیری. چند سؤال کوتاه می‌پرسم و بعد یک سند رسمی برات آماده می‌کنم — رایگان و محرمانه.";

function initialState(): State {
  return {
    screen: "auth",
    authStep: "phone",
    authPhone: "",
    authCode: "",
    authError: null,
    authCountdown: 0,
    authVerifying: false,
    messages: [
      { role: "a", text: GREETING },
      { role: "a", text: QUESTIONS[0].q },
    ],
    step: 0,
    data: { claims: [], docs: [] },
    pendingMulti: [],
    typing: false,
    analyzing: false,
    ready: false,
    toast: "",
    activeTab: "chat",
    faqQuery: "",
    faqCategory: "all",
    faqOpen: {},
    form: {
      docType: "دادخواست مطالبهٔ حقوق",
      name: null,
      employer: null,
      amount: null,
      notes: "",
    },
    sidebarOpen: false,
    pdfGenerating: false,
  };
}

export function profileNameFromPhone(phone: string): string {
  if (!phone) return "کاربر مهمان";
  const parts = phone.length === 11 ? [phone.slice(0, 4), phone.slice(4, 7), phone.slice(7)] : [phone];
  const map: Record<string, string> = { "0": "۰", "1": "۱", "2": "۲", "3": "۳", "4": "۴", "5": "۵", "6": "۶", "7": "۷", "8": "۸", "9": "۹" };
  return parts.join(" ").replace(/[0-9]/g, (c) => map[c] ?? c);
}

function useProvideAppState() {
  const [state, setState] = useState<State>(initialState);
  const cdTimer = useRef<number | undefined>(undefined);
  const toastTimer = useRef<number | undefined>(undefined);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);
  const supportRef = useRef<HTMLTextAreaElement>(null);
  const docRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = window.setTimeout(() => phoneRef.current?.focus(), 150);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => () => {
      if (cdTimer.current) window.clearInterval(cdTimer.current);
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    },
    [],
  );

  function update(patch: Partial<State>) {
    setState((s) => ({ ...s, ...patch }));
  }

  function scrollDown() {
    setTimeout(() => {
      const el = scrollRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    }, 40);
  }

  function showToast(t: string) {
    update({ toast: t });
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => update({ toast: "" }), 2400);
  }

  function nextIndex(from: number, data: ChatData) {
    let i = from + 1;
    while (i < QUESTIONS.length) {
      const w = QUESTIONS[i].when;
      if (!w || w(data)) return i;
      i++;
    }
    return QUESTIONS.length;
  }

  function advance(data: ChatData) {
    const ni = nextIndex(state.step, data);
    if (ni < QUESTIONS.length) {
      update({ typing: true });
      scrollDown();
      setTimeout(() => {
        setState((s) => ({
          ...s,
          typing: false,
          step: ni,
          pendingMulti: [],
          messages: [...s.messages, { role: "a", text: QUESTIONS[ni].q }],
        }));
        scrollDown();
      }, 700);
    } else {
      finalize(data);
    }
  }

  function commit(display: string, value: unknown) {
    const q = QUESTIONS[state.step];
    const data: ChatData = {
      ...state.data,
      [q.field]: value,
      [`${q.field}_d`]: display,
    } as ChatData;
    setState((s) => ({
      ...s,
      data,
      messages: [...s.messages, { role: "u", text: display }],
    }));
    scrollDown();
    advance(data);
  }

  function submitText() {
    const q = QUESTIONS[state.step];
    if (!q) return;
    const el = inputRef.current;
    if (!el) return;
    const raw = el.value.trim();
    if (!raw) return;
    if (q.type === "number") {
      const n = toNum(raw);
      if (!n) return;
      el.value = "";
      commit(`${fa(n)} تومان`, n);
    } else {
      el.value = "";
      commit(raw, raw);
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      submitText();
    }
  }

  function chooseChip(opt: ChipOption) {
    commit(opt.l, opt.v);
  }

  function toggleMulti(opt: ChipOption) {
    setState((s) => {
      const has = s.pendingMulti.find((o) => o.v === opt.v);
      return {
        ...s,
        pendingMulti: has
          ? s.pendingMulti.filter((o) => o.v !== opt.v)
          : [...s.pendingMulti, opt],
      };
    });
  }

  function submitMulti() {
    const sel = state.pendingMulti;
    if (!sel.length) return;
    commit(
      sel.map((o) => o.l).join("، "),
      sel.map((o) => o.v),
    );
  }

  function finalize(data: ChatData) {
    update({ typing: true, analyzing: true });
    scrollDown();
    setTimeout(() => {
      const { total } = build(data);
      const msg = `تموم شد. بر اساس اطلاعاتت، مجموع مطالبات قانونی تو حدود «${fa(total)} تومان» برآورد شد و یک سند رسمی برات آماده کردم. می‌تونی ببینی، ویرایش کنی و دانلودش کنی.`;
      setState((s) => ({
        ...s,
        typing: false,
        analyzing: false,
        ready: true,
        messages: [...s.messages, { role: "a", text: msg }],
      }));
      scrollDown();
    }, 1200);
  }

  function fillDemo() {
    const data: ChatData = {
      name: "امیر سودبخش",
      name_d: "امیر سودبخش",
      employer: "شرکت پویا صنعت",
      employer_d: "شرکت پویا صنعت",
      years: 4,
      years_d: "۴ سال",
      salary: 12000000,
      salary_d: "۱۲٬۰۰۰٬۰۰۰ تومان",
      claims: ["sanavat", "eidi", "morakhasi", "maoq"],
      claims_d: "سنوات، عیدی، مانده مرخصی، حقوق معوق",
      unpaidMonths: 3,
      unpaidMonths_d: "۳ ماه",
      contract: "کتبی",
      contract_d: "کتبی بود",
      docs: ["فیش حقوقی", "سابقهٔ بیمه"],
      docs_d: "فیش حقوقی، سابقهٔ بیمه",
    };
    const { total } = build(data);
    setState((s) => ({
      ...s,
      data,
      step: QUESTIONS.length - 1,
      typing: false,
      analyzing: false,
      ready: true,
      pendingMulti: [],
      messages: [
        ...s.messages,
        { role: "u", text: "(تکمیل سریع با دادهٔ نمونه)" },
        {
          role: "a",
          text: `تموم شد. مجموع مطالبات تو حدود «${fa(total)} تومان» برآورد شد و سندت آماده‌ست.`,
        },
      ],
    }));
    scrollDown();
  }

  function toResult() {
    update({ screen: "result" });
    window.scrollTo(0, 0);
  }
  function back() {
    update({ screen: "dashboard" });
    window.scrollTo(0, 0);
  }
  function toEdit() {
    update({ screen: "dashboard" });
    window.scrollTo(0, 0);
    setTimeout(() => inputRef.current?.focus(), 120);
  }

  function generateDoc() {
    const d = state.data;
    const f = state.form;
    const nameOk = !!((d.name && d.name.trim()) || (f.name && f.name.trim()));
    const calcOk = toNum(d.salary) && (d.claims || []).length;
    const amountOk = toNum(f.amount) > 0;
    const can = state.ready || !!calcOk || (nameOk && amountOk);
    if (!can) {
      showToast("برای ساخت سند، «نام» و «مبلغ مطالبه» را وارد کن یا با دستیار گفتگو کن");
      if (!nameOk) nameRef.current?.focus();
      return;
    }
    if (!state.ready) update({ ready: true });
    toResult();
  }

  function navDashboard() {
    update({ screen: "dashboard", sidebarOpen: false });
    window.scrollTo(0, 0);
  }
  function navChat() {
    update({ screen: "dashboard", activeTab: "chat", sidebarOpen: false });
    setTimeout(() => inputRef.current?.focus(), 60);
  }
  function navForm() {
    update({ screen: "dashboard", activeTab: "form", sidebarOpen: false });
    setTimeout(() => nameRef.current?.focus(), 60);
  }
  function navFaq(cat?: string, query?: string) {
    const faqOpen: Record<string, boolean> = {};
    if (query) {
      const m = FAQ_DATA.find((x) => x.q === query);
      if (m) faqOpen[m.id] = true;
    }
    update({
      screen: "faq",
      faqCategory: cat || "all",
      faqQuery: query || "",
      faqOpen,
      sidebarOpen: false,
    });
    window.scrollTo(0, 0);
  }
  function setFaqCategory(key: string) {
    update({ faqCategory: key });
  }
  function onFaqQuery(e: React.ChangeEvent<HTMLInputElement>) {
    update({ faqQuery: e.target.value });
  }
  function toggleFaq(id: string) {
    setState((s) => ({ ...s, faqOpen: { ...s.faqOpen, [id]: !s.faqOpen[id] } }));
  }

  function navSoon() {
    showToast("این بخش در نسخهٔ دمو فعال نیست");
  }
  function proClick() {
    showToast("ارتقا به نسخهٔ حرفه‌ای (نمونهٔ دمو)");
  }
  function uploadClick() {
    showToast("بارگذاری فایل در نسخهٔ دمو غیرفعال است");
  }

  function onAuthPhone(e: React.ChangeEvent<HTMLInputElement>) {
    update({ authPhone: e.target.value, authError: null });
  }
  function onPhoneKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      submitPhone();
    }
  }
  function submitPhone() {
    const digits = normDigits(state.authPhone);
    if (digits.length !== 11 || digits[0] !== "0" || digits[1] !== "9") {
      update({ authError: "شمارهٔ موبایل را به‌صورت صحیح وارد کن (مثلاً ۰۹۱۲۳۴۵۶۷۸۹)" });
      return;
    }
    update({ authStep: "otp", authPhone: digits, authError: null, authCode: "" });
    startCountdown();
    setTimeout(() => codeRef.current?.focus(), 80);
  }
  function onAuthCode(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value.replace(/[^0-9۰-۹]/g, "").slice(0, 4);
    update({ authCode: v, authError: null });
  }
  function onCodeKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      submitCode();
    }
  }
  function submitCode() {
    const digits = normDigits(state.authCode);
    if (digits.length < 4) {
      update({ authError: "کد ۴ رقمی را کامل وارد کن" });
      return;
    }
    if (digits !== DEMO_CODE) {
      update({ authError: "کد وارد شده صحیح نیست", authCode: "" });
      return;
    }
    update({ authVerifying: true, authError: null });
    setTimeout(() => update({ authVerifying: false, screen: "dashboard" }), 700);
  }
  function editPhone() {
    if (cdTimer.current) window.clearInterval(cdTimer.current);
    update({ authStep: "phone", authCode: "", authError: null, authCountdown: 0 });
    setTimeout(() => phoneRef.current?.focus(), 80);
  }
  function resendCode() {
    if (state.authCountdown > 0) return;
    update({ authCode: "", authError: null });
    startCountdown();
    showToast("کد جدید ارسال شد (نمونهٔ دمو: ۱۲۳۴)");
  }
  function startCountdown() {
    if (cdTimer.current) window.clearInterval(cdTimer.current);
    update({ authCountdown: 60 });
    cdTimer.current = window.setInterval(() => {
      setState((s) => {
        const n = s.authCountdown - 1;
        if (n <= 0) {
          if (cdTimer.current) window.clearInterval(cdTimer.current);
          return { ...s, authCountdown: 0 };
        }
        return { ...s, authCountdown: n };
      });
    }, 1000);
  }
  function quickLogin() {
    update({ authPhone: "09123456789", authVerifying: true, authError: null });
    setTimeout(() => update({ authVerifying: false, screen: "dashboard" }), 600);
  }

  function nav(screen: Screen) {
    update({ screen, sidebarOpen: false });
    window.scrollTo(0, 0);
  }
  function useDocType(t: string) {
    setState((s) => ({ ...s, form: { ...s.form, docType: t } }));
    navForm();
  }
  function logout() {
    if (cdTimer.current) window.clearInterval(cdTimer.current);
    update({ screen: "auth", authStep: "phone", authPhone: "", authCode: "", authError: null, sidebarOpen: false });
  }
  function toggleSidebar() {
    update({ sidebarOpen: !state.sidebarOpen });
  }
  function closeSidebar() {
    update({ sidebarOpen: false });
  }
  function sendSupport() {
    if (supportRef.current) supportRef.current.value = "";
    showToast("پیام شما برای تیم پشتیبانی ارسال شد ✓");
  }

  function setTab(t: "chat" | "form") {
    update({ activeTab: t });
  }
  function onName(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setState((s) => ({ ...s, form: { ...s.form, name: v } }));
  }
  function onDocType(e: React.ChangeEvent<HTMLSelectElement>) {
    const v = e.target.value;
    setState((s) => ({ ...s, form: { ...s.form, docType: v } }));
  }
  function onEmployer(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setState((s) => ({ ...s, form: { ...s.form, employer: v } }));
  }
  function onAmount(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setState((s) => ({ ...s, form: { ...s.form, amount: v } }));
  }
  function onNotes(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const v = e.target.value;
    setState((s) => ({ ...s, form: { ...s.form, notes: v } }));
  }

  async function download() {
    const el = docRef.current;
    if (!el || state.pdfGenerating) return;
    update({ pdfGenerating: true });
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
      const imgData = canvas.toDataURL("image/jpeg", 0.93);
      const pdf = new jsPDF({ unit: "pt", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(`${state.form.docType || "دادخواست"}.pdf`);
      showToast("فایل PDF سند دانلود شد ✓");
    } catch {
      showToast("ساخت PDF با خطا مواجه شد — از گزینهٔ «چاپ» استفاده کن");
    } finally {
      update({ pdfGenerating: false });
    }
  }
  function printDoc() {
    window.print();
  }
  function sendExpert() {
    showToast("سند برای بررسی به کارشناس خانهٔ کارگر ارسال شد ✓");
  }

  return {
    state,
    refs: { inputRef, scrollRef, nameRef, phoneRef, codeRef, supportRef, docRef },
    actions: {
      submitText,
      onKey,
      chooseChip,
      toggleMulti,
      submitMulti,
      fillDemo,
      toResult,
      back,
      toEdit,
      generateDoc,
      navDashboard,
      navChat,
      navForm,
      navFaq,
      setFaqCategory,
      onFaqQuery,
      toggleFaq,
      navSoon,
      proClick,
      uploadClick,
      onAuthPhone,
      onPhoneKey,
      submitPhone,
      onAuthCode,
      onCodeKey,
      submitCode,
      editPhone,
      resendCode,
      quickLogin,
      nav,
      useDocType,
      logout,
      sendSupport,
      setTab,
      onName,
      onDocType,
      onEmployer,
      onAmount,
      onNotes,
      download,
      printDoc,
      sendExpert,
      showToast,
      toggleSidebar,
      closeSidebar,
    },
  };
}

type AppStateValue = ReturnType<typeof useProvideAppState>;

const AppContext = createContext<AppStateValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const value = useProvideAppState();
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppStateValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
