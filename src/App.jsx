import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Import Route
import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Home/Homepage'; // Use only one import for Homepage
import LoginScreen from './components/AuthScreen';
import PaymentStatus from './pages/PaymentStatus';
import DashboardLayout from './pages/DashboardLayout';
import BalancePage from './pages/components/BalancePage';
import RechargePage from './pages/components/RechargePage';
import BalanceTransferPage from './pages/components/BalanceTransferPage';
import PermanentTicketPage from './pages/components/ParmanentTicketPage';
import HelpPage from './pages/components/HelpPage';
import SettingsPage from './pages/components/SettingPage';
import TravelHistory from './pages/components/TravelHistory';
import DashHomePage from './pages/components/DashHomePage';
import MetroFooter from './components/MetroFooter';

function App() {
  return (
    <Router basename='/'> {/* Wrap the application in a Router */}
      <Navbar />
      <Routes>
        {/* Homepage Route */}
        <Route path="/" element={<Homepage />} />

       

        {/* Login Route */}
        <Route path="/login" element={<LoginScreen />} />

        {/* Payment Status Route */}
        <Route path="/payment-status" element={<PaymentStatus />} />

        {/* Dashboard Layout with Nested Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashHomePage />} />
          <Route path="balance" element={<BalancePage />} />
          <Route path="recharge" element={<RechargePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="history" element={<TravelHistory />} />

          <Route path="balance-transfer" element={<BalanceTransferPage />} />
          <Route path="permanent-ticket" element={<PermanentTicketPage />} />
          <Route path="help" element={<HelpPage />} />
        </Route>
      </Routes>
      <MetroFooter/>
    </Router>
  );
}

export default App;