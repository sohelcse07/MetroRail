import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Import Route
import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Home/Homepage'; // Use only one import for Homepage
import UserDashboard from './pages/UserDashboard';
import LoginScreen from './components/LoginScreen';
import PaymentStatus from './pages/PaymentStatus';

function App() {
  return (
    <Router basename='/'> {/* Wrap the application in a Router */}
      <Navbar />
      <Routes>
        {/* Add a path for the Route */}
        <Route path="/" element={<Homepage />} />
        <Route path="/profile" element={<UserDashboard />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/payment-status" element={<PaymentStatus />} />

      </Routes>
    </Router>
  );
}

export default App;
