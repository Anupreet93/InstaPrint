// src/pages/Pricing.js
import React from 'react';

const Pricing = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
        Simple, <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Transparent</span> Pricing
      </h2>
      
      <div className="max-w-5xl mx-auto">
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
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <div>
                <span className="text-gray-700">3D Printing</span>
                <p className="text-sm text-gray-500">Standard Quality Plastic Material</p>
              </div>
              <span className="font-bold text-blue-600">₹250/object</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <div>
                <span className="text-gray-700">Large Scale Printing</span>
                <p className="text-sm text-gray-500">Banners &amp; Posters (Standard Sizes)</p>
              </div>
              <span className="font-bold text-blue-600">₹500/banner</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Pricing;
