// src/pages/ProductsServices.js
import React from 'react';
import { motion } from 'framer-motion';

const ProductsServices = () => (
  <section className="py-24 bg-gradient-to-b from-white to-blue-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
        Our <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Services</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            title: "Smart Document Printing",
            desc: "AI-optimized layouts & automatic quality enhancement",
            icon: "📄",
            color: "from-blue-500 to-cyan-400"
          },
          {
            title: "3D Printing",
            desc: "High-precision additive manufacturing solutions",
            icon: "🖨️",
            color: "from-purple-500 to-pink-400"
          },
          {
            title: "Large Format Printing",
            desc: "Posters, banners, and signage up to A0 size",
            icon: "📐",
            color: "from-green-500 to-teal-400"
          },
          {
            title: "Cloud Storage",
            desc: "Secure document storage with instant access",
            icon: "☁️",
            color: "from-orange-500 to-yellow-400"
          }
        ].map((service, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10 }}
            className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all"
          >
            <div className={`text-4xl mb-6 bg-gradient-to-r ${service.color} w-min p-4 rounded-xl text-white`}>
              {service.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
            <p className="text-gray-600">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProductsServices;
