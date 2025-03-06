// src/pages/Payment/PaymentPage.jsx
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import axios from 'axios';
import { motion } from 'framer-motion';

// Enhanced Loader Component with printer animation
const Loader = () => {
  // Variants for the paper animation (emulates paper coming out of a printer)
  const paperVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror"
      }
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex flex-col items-center">
        {/* Printer Icon */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          className="w-20 h-20 text-blue-600"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M6 9V2h12v7M6 14h12M6 14v7h12v-7" 
          />
        </svg>
        {/* Animated Paper coming out of the printer */}
        <motion.div
          variants={paperVariants}
          initial="hidden"
          animate="visible"
          className="w-12 h-16 bg-gray-100 border border-gray-300 shadow-sm mt-2 rounded-sm"
        ></motion.div>
        {/* Animated Text */}
        <motion.p 
          className="mt-4 text-xl font-bold text-blue-600"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Printing in progress...
        </motion.p>
      </div>
    </motion.div>
  );
};

const PaymentPage = ({ paymentDetails, onPaymentConfirmed, onCancel }) => {
  const { paymentAmount, paymentMethod } = paymentDetails;
  const [upiApp, setUpiApp] = useState('PhonePe');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  // Dynamically load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Razorpay payment handler using key from environment variables
  const handleRazorpayPayment = () => {
    if (!window.Razorpay) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY; // Ensure your .env file has VITE_RAZORPAY_KEY

    const options = {
      key: razorpayKey,
      amount: paymentAmount * 100, // Amount in paise
      currency: 'INR',
      name: 'InstaPrint',
      description: 'Test Payment',
      handler: function (response) {
        alert('Payment successful!');
        setIsPaymentLoading(true);
        // Delay to allow loader animation to be seen
        setTimeout(() => {
          onPaymentConfirmed();
        }, 2000);
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

  // UPI payment verification (for non-Razorpay flows)
  const handlePaymentVerification = async () => {
    try {
      const response = await axios.post('/api/payment/verify', {
        amount: paymentAmount,
        status: 'success',
      });
      if (response.data.status === 'success') {
        alert('Payment successful! Printing process started.');
        setIsPaymentLoading(true);
        setTimeout(() => {
          onPaymentConfirmed();
        }, 4000);
      } else {
        alert('Payment verification failed. Please try again.');
      }
    } catch {
      alert('Error verifying payment. Please try again later.');
    }
  };

  // Generate QR Code for UPI payments
  const generateQRCode = async (amount) => {
    try {
      let upiId;
      switch (upiApp) {
        case 'PhonePe': 
          upiId = '8485827693@ibl'; 
          break;
        case 'GooglePay': 
          upiId = 'anupreetdalvi@okaxis'; 
          break;
        case 'Paytm': 
          upiId = 'merchant-paytm-id@upi'; 
          break;
        default: 
          upiId = 'default-merchant-id@upi';
      }
      const qrData = `upi://pay?pa=${upiId}&pn=InstaPrint&am=${amount}&cu=INR`;
      const qrCode = await QRCode.toDataURL(qrData);
      setQrCodeUrl(qrCode);
    } catch {
      alert('Failed to generate QR Code.');
    }
  };

  // UPI icon click handler – set selected app then trigger Razorpay payment for testing
  const handlePaymentAppClick = (appName) => {
    setUpiApp(appName);
    handleRazorpayPayment();
  };

  // Show loader if payment is in progress
  if (isPaymentLoading) {
    return <Loader />;
  }

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
