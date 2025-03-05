// src/pages/TermsAndServices.jsx
import React from 'react';

const TermsAndServices = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900">Terms &amp; Services</h1>
          <p className="mt-4 text-xl text-gray-700">
            Please review our terms and conditions carefully before using our services.
          </p>
        </header>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Welcome to InstaPrint. By accessing and using our website and services, you agree to be bound by these Terms &amp; Services. Our services provide you with innovative digital and physical printing solutions globally.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">2. User Obligations</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            You agree to use our services only for lawful purposes and in accordance with these Terms. You must not misuse our platform by attempting to disrupt or gain unauthorized access to any aspect of our services.
          </p>
          <ul className="list-disc list-inside text-gray-700 text-lg">
            <li>You must provide accurate and complete information when registering or using our services.</li>
            <li>You are responsible for maintaining the confidentiality of your account information.</li>
            <li>You agree not to engage in any fraudulent or malicious activities.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">3. Payment &amp; Refund Policy</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our payment procedures are secured by industry-standard encryption and are subject to our refund policies. All printed materials and digital services are subject to verification, and refunds will be processed in accordance with our policies outlined on the website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">4. Limitation of Liability</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            InstaPrint will not be liable for any indirect, incidental, or consequential damages that may arise from the use of our services. Our total liability to you for any damages shall not exceed the amount paid by you for the service in question.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">5. Governing Law</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            These Terms and Services are governed by and construed in accordance with the laws of the jurisdiction in which our principal office is located. Any disputes arising from these terms will be resolved in the appropriate courts of that jurisdiction.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">6. Changes to Terms</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            We reserve the right to modify these Terms &amp; Services at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services following any changes signifies your acceptance of the updated terms.
          </p>
        </section>

        <footer className="border-t border-gray-300 pt-8">
          <p className="text-center text-gray-600 text-lg">
            © {new Date().getFullYear()} InstaPrint. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default TermsAndServices;
