import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

// Context Providers
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";

// Components
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./components/Home/Homepage";
import LoginScreen from "./components/AuthScreen";
import PaymentStatus from "./pages/PaymentStatus";
import DashboardLayout from "./pages/DashboardLayout";
import RechargePage from "./pages/components/RechargePage";
import BalanceTransferPage from "./pages/components/BalanceTransferPage";
import PermanentTicketPage from "./pages/components/ParmanentTicketPage";
import HelpPage from "./pages/components/HelpPage";
import SettingsPage from "./pages/components/SettingPage";
import TravelHistory from "./pages/components/TravelHistory";
import MetroFooter from "./components/MetroFooter";
import SignupPage from "./components/SignupPage";
import Bot from "./components/Bot";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/ProfileSideBar";
import RechageStatus from "./pages/RechageStatus";
import Notification from "./components/Notification";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router basename="/">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/register" element={<SignupPage />} />
            <Route path="/payment-status" element={<PaymentStatus />} />
            <Route path="/recharge" element={<RechageStatus />} />

            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
              {/* Top-level protected route */}
              <Route path="/permanent-ticket" element={<PermanentTicketPage />} />

              {/* Dashboard nested routes */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Profile />} />
                <Route path="recharge" element={<RechargePage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="history" element={<TravelHistory />} />
                <Route path="balance-transfer" element={<BalanceTransferPage />} />
                <Route path="permanent-ticket" element={<PermanentTicketPage />} />
                <Route path="help" element={<HelpPage />} />
              </Route>
            </Route>
          </Routes>
          <MetroFooter />
          <Bot />
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
