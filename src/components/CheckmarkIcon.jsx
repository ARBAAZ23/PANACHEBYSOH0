// src/components/CheckmarkIcon.jsx
import React from 'react';

const CheckmarkIcon = () => (
  <div className="flex-shrink-0 bg-green-100 text-green-700 rounded-full w-6 h-6 flex items-center justify-center">
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  </div>
);

export default CheckmarkIcon;