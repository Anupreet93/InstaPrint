// src/pages/Payment/PaymentPage.jsx
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import axios from 'axios';
import { motion } from 'framer-motion';

const PaymentPage = ({ paymentDetails, onPaymentConfirmed, onCancel }) => {
  const { paymentAmount, paymentMethod } = paymentDetails;
  const [upiApp, setUpiApp] = useState('PhonePe');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  // Dynamically load Razorpay script if not already present
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Modified handler: when a payment app icon is clicked, set the app name and trigger Razorpay payment
  const handlePaymentAppClick = (appName) => {
    setUpiApp(appName);
    // For testing purposes, regardless of the icon, trigger Razorpay payment gateway
    handleRazorpayPayment();
  };

  const generateQRCode = async (amount) => {
    try {
      let upiId;
      switch (upiApp) {
        case 'PhonePe': upiId = '8485827693@ibl'; break;
        case 'GooglePay': upiId = 'anupreetdalvi@okaxis'; break;
        case 'Paytm': upiId = 'merchant-paytm-id@upi'; break;
        default: upiId = 'default-merchant-id@upi';
      }
      const qrData = `upi://pay?pa=${upiId}&pn=InstaPrint&am=${amount}&cu=INR`;
      const qrCode = await QRCode.toDataURL(qrData);
      setQrCodeUrl(qrCode);
    } catch {
      alert('Failed to generate QR Code.');
    }
  };

  const handlePaymentVerification = async () => {
    try {
      const response = await axios.post('/api/payment/verify', {
        amount: paymentAmount,
        status: 'success',
      });
      if (response.data.status === 'success') {
        alert('Payment successful! Printing process started.');
        onPaymentConfirmed();
      } else {
        alert('Payment verification failed. Please try again.');
      }
    } catch {
      alert('Error verifying payment. Please try again later.');
    }
  };

  // Razorpay payment handler using a test key (the secret should only be used server-side)
  const handleRazorpayPayment = () => {
    if (!window.Razorpay) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const options = {
      key: 'rzp_test_wf9zZFyL5TXNXw', // Replace with your Razorpay test key if needed
      amount: paymentAmount * 100, // Razorpay amount is in paise
      currency: 'INR',
      name: 'InstaPrint',
      description: 'Test Payment',
      handler: function (response) {
        // For testing, assume payment is successful
        alert('Payment successful!');
        setIsPaymentLoading(true);
        onPaymentConfirmed();
      },
      prefill: {
        name: 'Test User',
        email: 'test@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <motion.div 
      className="max-w-xl mx-auto bg-white shadow-2xl rounded-3xl p-10 text-center mt-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold mb-6">Payment</h2>
      <p className="text-gray-700 mb-6 text-lg">
        Amount to be Paid: <span className="font-extrabold">₹{paymentAmount.toFixed(2)}</span>
      </p>

      {/* UPI Payment Method */}
      {paymentMethod === 'UPI' && (
        <>
          <h3 className="text-lg font-bold mb-4">Select Payment App</h3>
          <div className="flex justify-center space-x-6 mb-6">
            {[
              { name: 'PhonePe', img: "https://th.bing.com/th/id/OIP.tuYalZe2SOHuvjtZkDDJ5gHaFf?w=290&h=215&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2", ring: 'ring-blue-600' },
              { name: 'GooglePay', img: "https://th.bing.com/th/id/OIP.Zk6g4DaF4cPbNd09Z6rquAHaHa?w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2", ring: 'ring-blue-600' },
              { name: 'Paytm', img: "https://upload.wikimedia.org/wikipedia/commons/4/42/Paytm_logo.png", ring: 'ring-blue-600' },
            ].map((app) => (
              <div
                key={app.name}
                onClick={() => handlePaymentAppClick(app.name)}
                className={`cursor-pointer p-4 rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow ${upiApp === app.name ? `ring-4 ${app.ring}` : ''}`}
              >
                <img src={app.img} alt={app.name} className="h-12 mx-auto" />
                <p className="mt-2 font-semibold text-gray-700">{app.name}</p>
              </div>
            ))}
          </div>
          {/* Retaining QR Code and UPI verification buttons if needed */}
          {qrCodeUrl ? (
            <>
              <img src={qrCodeUrl} alt="QR Code" className="mx-auto w-56 h-56 mb-6" />
              <p className="text-sm text-gray-500 mb-4">
                Scan the QR Code with {upiApp} to pay.
              </p>
            </>
          ) : (
            <button
              onClick={() => generateQRCode(paymentAmount)}
              className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-colors shadow-lg mb-6"
            >
              Generate QR Code
            </button>
          )}
          <button
            onClick={handlePaymentVerification}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-full hover:from-blue-700 hover:to-cyan-600 transition-colors shadow-lg"
          >
            Confirm Payment
          </button>
        </>
      )}

      {/* Cash Payment Method */}
      {paymentMethod === 'Cash' && (
        <>
          <p className="text-gray-700 text-lg">Please pay in cash to proceed.</p>
          <button
            onClick={onPaymentConfirmed}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-full hover:from-blue-700 hover:to-cyan-600 transition-colors shadow-lg mt-6"
          >
            Confirm Cash Payment
          </button>
        </>
      )}

      {/* Razorpay Payment Method */}
      {paymentMethod === 'Razorpay' && (
        <>
          <button
            onClick={handleRazorpayPayment}
            className="w-full bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition-colors shadow-lg mb-6"
          >
            Pay with Razorpay
          </button>
          {isPaymentLoading && (
            <p className="text-lg font-bold text-blue-600 mt-4">
              Print in progress...
            </p>
          )}
        </>
      )}

      <button
        onClick={onCancel}
        className="w-full bg-gray-300 text-gray-800 py-3 rounded-full mt-6 hover:bg-gray-400 transition-colors shadow"
      >
        Cancel and Start Over
      </button>
    </motion.div>
  );
};

export default PaymentPage;
