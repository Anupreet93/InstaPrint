// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductsServices from './pages/ProductsServices';
import Pricing from './pages/Pricing';
import Security from './pages/Security';
import FileUploadEditor from './pages/Editor/FileUploadEditor';
import PaymentPage from './pages/Payment/PaymentPage';
import AboutUs from './pages/Aboutus';
import TermsAndServices from './pages/TermsAndServices';
import Contact from './pages/Contact';
import './App.css';

const App = () => {
  const [paymentDetails, setPaymentDetails] = useState(null);

  // Callback from Editor when user is ready to proceed to payment.
  const handleProceedToPayment = (details) => {
    setPaymentDetails(details);
  };

  // Callback when payment is successfully confirmed.
  const handlePaymentConfirmed = () => {
    setPaymentDetails(null);
    alert('Printing process initiated.');
  };

  // Callback to cancel the payment process and return to the editor.
  const handleCancelPayment = () => {
    setPaymentDetails(null);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsServices />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/security" element={<Security />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/terms" element={<TermsAndServices />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/upload"
              element={
                paymentDetails ? (
                  <PaymentPage
                    paymentDetails={paymentDetails}
                    onPaymentConfirmed={handlePaymentConfirmed}
                    onCancel={handleCancelPayment}
                  />
                ) : (
                  <FileUploadEditor onProceedToPayment={handleProceedToPayment} />
                )
              }
            />
            {/* Add additional routes as needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
