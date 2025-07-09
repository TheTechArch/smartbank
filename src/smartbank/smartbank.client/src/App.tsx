import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './features/landingpage/LandingPage';
import PrivateLandingPage from './features/private/loanapplication/PrivateLandingPage';
import LoanApplicationPage from './features/private/loanapplication/LoanApplicationPage';
import BusinessLandingPage from './features/business/BusinessLandingPage';
import InsuranceLandingPage from './features/private/InsuranceLandingPage';
import CreditCardPage from './features/private/creditcard/CreditCard';
import logo from './assets/smartbanklogo2-xs.png';  // adjust path as needed
const App: React.FC = () => {
  return (
    <Router>

      <nav className="bg-white shadow mb-6">
      <div className="container mx-auto px-6 py-4 flex justify-between items-end">
            <div className="flex space-x-6">
                <Link to="/" className="text-gray-600 hover:text-blue-900">Hjem</Link>
                <Link to="/private" className="text-gray-600 hover:text-blue-900">Privat</Link>
                <Link to="/business" className="text-gray-600 hover:text-blue-900">Bedrift</Link>
            </div>
     
         {/* Right: logo */}
          <img
            src={logo}
            alt="Bank Logo"
            className="w-[150px] object-contain"
          />
             </div>
      </nav>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/private" element={<PrivateLandingPage />} />
        <Route path="/private/loanapplication" element={<LoanApplicationPage />} />
        <Route path="/private/insurance" element={<InsuranceLandingPage />} />
        <Route path="/private/creditcard" element={<CreditCardPage />} />
        <Route path="/business" element={<BusinessLandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
