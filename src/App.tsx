import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ComingSoon from "./pages/ComingSoon";
import RegistrationPage from "@/pages/register/RegistrationPage";
import SuperAdminLayout from "@/layouts/SuperAdminLayout";
import SuperAdminOverview from "@/pages/super-admin/Overview";
import SuperAdminBusinesses from "@/pages/super-admin/Businesses";
import SuperAdminPlans from "@/pages/super-admin/Plans";
import SuperAdminAdmins from "@/pages/super-admin/Admins";
import SuperAdminAnalytics from "@/pages/super-admin/Analytics";
import SuperAdminActivity from "@/pages/super-admin/Activity";
import SuperAdminSettings from "@/pages/super-admin/Settings";
import SuperAdminSupport from "@/pages/super-admin/Support";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={
          <ComingSoon
            title="Login"
            description="Business and customer logins open soon as MyWora prepares for launch."
          />
        }
      />
      {/* Phase 4 — Business Registration (frontend-only wizard) */}
      <Route path="/register" element={<RegistrationPage />} />
      {/* /signup stays as an alias for earlier links; the wizard is the real destination. */}
      <Route path="/signup" element={<Navigate to="/register" replace />} />
      {/* Super Admin console — frontend only; gated in Phase 5 */}
      <Route path="/super-admin" element={<SuperAdminLayout />}>
        <Route index element={<SuperAdminOverview />} />
        <Route path="businesses" element={<SuperAdminBusinesses />} />
        <Route path="plans" element={<SuperAdminPlans />} />
        <Route path="analytics" element={<SuperAdminAnalytics />} />
        <Route path="activity" element={<SuperAdminActivity />} />
        <Route path="settings" element={<SuperAdminSettings />} />
        <Route path="support" element={<SuperAdminSupport />} />
        <Route path="admins" element={<SuperAdminAdmins />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
