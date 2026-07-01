import { useApp } from "../state/store";
import { toFaDigits, formatPhone } from "../lib/format";
import { ScaleBadgeIcon } from "./icons";

export function AuthScreen() {
  const { state, refs, actions } = useApp();

  const isPhoneStep = state.authStep !== "otp";
  const isOtpStep = state.authStep === "otp";
  const authPhoneFormatted = formatPhone(state.authPhone);
  const authCountdownFa = toFaDigits(String(state.authCountdown));
  const canResend = state.authCountdown <= 0;

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 18,
            background: "linear-gradient(135deg,#13265c,#0c1a3f)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}
        >
          <ScaleBadgeIcon />
        </div>

        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <h1 style={{ margin: "0 0 8px", fontSize: 19, fontWeight: 800, color: "#13265c" }}>
            به دستیار حقوقی هوشمند کارگر خوش آمدید
          </h1>
          {isPhoneStep && (
            <p style={{ margin: 0, fontSize: "13.5px", color: "#6c7689", lineHeight: 1.9 }}>
              برای ورود یا ثبت‌نام، شمارهٔ موبایل خود را وارد کن
            </p>
          )}
          {isOtpStep && (
            <p style={{ margin: 0, fontSize: "13.5px", color: "#6c7689", lineHeight: 1.9 }}>
              کد ۴ رقمی پیامک‌شده به <strong style={{ color: "#13265c" }}>{authPhoneFormatted}</strong> را وارد کن
            </p>
          )}
        </div>

        {isPhoneStep && (
          <>
            <label style={{ fontSize: "12.5px", fontWeight: 700, color: "#41506b", marginBottom: 7, display: "block" }}>
              شمارهٔ موبایل
            </label>
            <input
              ref={refs.phoneRef}
              type="tel"
              dir="ltr"
              value={state.authPhone}
              onChange={actions.onAuthPhone}
              onKeyDown={actions.onPhoneKey}
              placeholder="0912 345 6789"
              className="focus-border"
              style={{
                width: "100%",
                textAlign: "right",
                border: "1.5px solid #d6deec",
                borderRadius: 12,
                padding: "14px 16px",
                fontSize: 16,
                outline: "none",
                background: "#fafbfe",
                color: "#15233f",
                letterSpacing: ".5px",
              }}
            />
            {state.authError && (
              <div style={{ fontSize: "12.5px", color: "#c0392b", marginTop: 8 }}>{state.authError}</div>
            )}
            <button
              onClick={actions.submitPhone}
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
                boxShadow: "0 8px 20px rgba(29,59,139,.22)",
              }}
            >
              دریافت کد تأیید
            </button>
            <div style={{ textAlign: "center", marginTop: 16 }}>
              <span
                onClick={actions.quickLogin}
                className="hover-underline-link"
                style={{ fontSize: 12, color: "#9aa3b6" }}
              >
                ورود سریع برای نمایش (دمو)
              </span>
            </div>
            <p style={{ margin: "22px 0 0", fontSize: "11.5px", color: "#9aa3b6", textAlign: "center", lineHeight: 1.9 }}>
              با ادامه، قوانین و حریم خصوصی دستیار حقوقی کارگر را می‌پذیری.
            </p>
          </>
        )}

        {isOtpStep && (
          <>
            <div style={{ textAlign: "center", marginBottom: 14 }}>
              <span onClick={actions.editPhone} style={{ fontSize: "12.5px", color: "#1d3b8b", cursor: "pointer", fontWeight: 700 }}>
                ویرایش شماره
              </span>
            </div>
            <input
              ref={refs.codeRef}
              type="tel"
              dir="ltr"
              value={state.authCode}
              onChange={actions.onAuthCode}
              onKeyDown={actions.onCodeKey}
              placeholder="----"
              className="focus-border"
              style={{
                width: "100%",
                textAlign: "center",
                border: "1.5px solid #d6deec",
                borderRadius: 12,
                padding: 16,
                fontSize: 28,
                fontWeight: 800,
                outline: "none",
                background: "#fafbfe",
                color: "#13265c",
                letterSpacing: "14px",
              }}
            />
            {state.authError && (
              <div style={{ fontSize: "12.5px", color: "#c0392b", marginTop: 8, textAlign: "center" }}>
                {state.authError}
              </div>
            )}

            <div
              style={{
                background: "#fdf3e0",
                border: "1px solid #f1ddb8",
                borderRadius: 11,
                padding: "11px 14px",
                marginTop: 16,
                display: "flex",
                alignItems: "center",
                gap: 9,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b9842b" strokeWidth={2} style={{ flex: "none" }}>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              <span style={{ fontSize: 12, color: "#8a6a2b" }}>برای نسخهٔ دمو، کد «۱۲۳۴» را وارد کن</span>
            </div>

            {state.authVerifying ? (
              <button
                disabled
                style={{
                  marginTop: 18,
                  width: "100%",
                  background: "#dbe2ee",
                  color: "#6c7689",
                  border: "none",
                  borderRadius: 13,
                  padding: 15,
                  fontSize: 15,
                  fontWeight: 800,
                  cursor: "default",
                }}
              >
                در حال بررسی…
              </button>
            ) : (
              <button
                onClick={actions.submitCode}
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
                  boxShadow: "0 8px 20px rgba(29,59,139,.22)",
                }}
              >
                تأیید و ورود
              </button>
            )}

            <div style={{ textAlign: "center", marginTop: 18 }}>
              {canResend ? (
                <span onClick={actions.resendCode} style={{ fontSize: 13, color: "#1d3b8b", cursor: "pointer", fontWeight: 700 }}>
                  ارسال مجدد کد
                </span>
              ) : (
                <span style={{ fontSize: "12.5px", color: "#9aa3b6" }}>
                  ارسال مجدد کد تا {authCountdownFa} ثانیهٔ دیگر
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
