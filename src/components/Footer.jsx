// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h5 className="text-white font-bold text-lg">InstaPrint</h5>
          <p className="text-sm">Redefining digital printing through innovation</p>
        </div>

        <div>
          <h6 className="text-white font-semibold mb-4">Services</h6>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/products" className="hover:text-white">
                Products
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h6 className="text-white font-semibold mb-4">Company</h6>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h6 className="text-white font-semibold mb-4">Legal</h6>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/terms" className="hover:text-white">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/security" className="hover:text-white">
                Security
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
        <p>© {new Date().getFullYear()} InstaPrint. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
