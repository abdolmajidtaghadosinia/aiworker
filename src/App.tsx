import { AppProvider, useApp } from "./state/store";
import { BrandHeader } from "./components/BrandHeader";
import { AuthScreen } from "./components/AuthScreen";
import { StepTracker } from "./components/StepTracker";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { FaqPage } from "./components/FaqPage";
import { DocsPage } from "./components/DocsPage";
import { LawsPage } from "./components/LawsPage";
import { EduPage } from "./components/EduPage";
import { AccountPage } from "./components/AccountPage";
import { SupportPage } from "./components/SupportPage";
import { ResultPage } from "./components/ResultPage";
import { Toast } from "./components/Toast";

function AppShell() {
  const { state } = useApp();
  const isDashboard = state.screen === "dashboard";

  return (
    <>
      {isDashboard && <StepTracker />}
      <div className="app-shell-row">
        <Sidebar />
        <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 18 }}>
          <div key={state.screen} className="page-fade" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {isDashboard && <Dashboard />}
            {state.screen === "faq" && <FaqPage />}
            {state.screen === "docs" && <DocsPage />}
            {state.screen === "laws" && <LawsPage />}
            {state.screen === "edu" && <EduPage />}
            {state.screen === "account" && <AccountPage />}
            {state.screen === "support" && <SupportPage />}
          </div>
        </main>
      </div>
    </>
  );
}

function Screens() {
  const { state } = useApp();
  const inAppShell =
    state.screen === "dashboard" ||
    state.screen === "faq" ||
    state.screen === "docs" ||
    state.screen === "laws" ||
    state.screen === "edu" ||
    state.screen === "account" ||
    state.screen === "support";

  const screenGroup = state.screen === "auth" ? "auth" : state.screen === "result" ? "result" : "appShell";

  return (
    <div dir="rtl" style={{ minHeight: "100vh" }}>
      <BrandHeader />
      <div key={screenGroup} className="page-fade">
        {state.screen === "auth" && <AuthScreen />}
        {inAppShell && <AppShell />}
        {state.screen === "result" && <ResultPage />}
      </div>
      <Toast />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <Screens />
    </AppProvider>
  );
}

export default App;
