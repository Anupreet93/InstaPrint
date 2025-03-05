// src/components/Logo.js
import React from 'react';

const Logo = () => (
  <svg width="180" height="60" viewBox="0 0 360 120" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: "#2563EB", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#06B6D4", stopOpacity: 1 }} />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="rgba(0,0,0,0.2)" />
      </filter>
    </defs>
    <g filter="url(#shadow)">
      <path d="M10 10 h60 a10 10 0 0 1 10 10 v60 a10 10 0 0 1 -10 10 h-60 a10 10 0 0 1 -10 -10 v-40 l20 -20 z" fill="url(#logoGradient)" />
      <polyline points="10,10 30,10 10,30" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
    </g>
    <text x="90" y="75" fontFamily="Helvetica, Arial, sans-serif" fontSize="48" fill="url(#logoGradient)" fontWeight="bold">
      InstaPrint
    </text>
  </svg>
);

export default Logo;
