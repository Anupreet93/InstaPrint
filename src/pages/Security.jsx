// src/pages/Security.jsx
import React from 'react';

const Security = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Security & Compliance</h1>
          <p className="mt-4 text-lg text-gray-700">
            At InstaPrint, your security is our top priority. We implement industry-leading measures to protect your data, payment information, and physical assets.
          </p>
        </header>

        <section className="space-y-10">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Data Protection & Confidentiality</h2>
            <p className="text-gray-700">
              We use state-of-the-art encryption and secure storage protocols to ensure your documents are protected from unauthorized access. Our systems are compliant with international standards such as GDPR and HIPAA, ensuring that your sensitive information remains confidential.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Payment Security</h2>
            <p className="text-gray-700">
              Our secure payment gateway employs SSL encryption and multi-factor authentication to safeguard all financial transactions. Regular security audits and real-time monitoring help us maintain a robust defense against potential fraud and cyber threats.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Physical Security</h2>
            <p className="text-gray-700">
              Our state-of-the-art printing facilities are equipped with advanced surveillance systems, biometric access controls, and round-the-clock monitoring. Strict security protocols ensure that your printed materials and sensitive data remain safe throughout the entire printing and delivery process.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Cybersecurity Measures</h2>
            <p className="text-gray-700">
              We continuously invest in our IT infrastructure to defend against cyber threats. Our network is protected by firewalls, intrusion detection systems, and regular vulnerability assessments, ensuring that any risks are identified and mitigated promptly.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Compliance & Certifications</h2>
            <p className="text-gray-700">
              InstaPrint adheres to international regulatory standards and industry best practices. Our compliance with data protection, payment security, and environmental regulations is backed by certifications that demonstrate our commitment to quality, security, and sustainable operations.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Security;
