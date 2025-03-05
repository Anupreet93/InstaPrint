// src/pages/Pricing.js
import React from 'react';

const Pricing = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
        Simple, <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Transparent</span> Pricing
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Pay-As-You-Go</h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <div>
                <span className="text-gray-700">B&W Printing</span>
                <p className="text-sm text-gray-500">Standard A4 Paper</p>
              </div>
              <span className="font-bold text-blue-600">₹1.50/page</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <div>
                <span className="text-gray-700">Color Printing</span>
                <p className="text-sm text-gray-500">Premium Glossy Paper</p>
              </div>
              <span className="font-bold text-blue-600">₹3.00/page</span>
            </div>
          </div>
        </div>

        <div className="relative bg-gradient-to-br from-blue-600 to-cyan-500 p-8 rounded-3xl text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10 pattern-dots pattern-blue-500 pattern-bg-white pattern-size-4 pattern-opacity-20" />
          <div className="relative">
            <h3 className="text-2xl font-bold mb-6">Pro Plan</h3>
            <div className="text-4xl font-bold mb-6">
              ₹99<span className="text-xl">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                20% Discount on All Prints
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Priority Processing
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free Delivery
              </li>
            </ul>
            <button className="w-full bg-white text-blue-900 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Pricing;
