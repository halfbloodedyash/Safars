'use client';

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full p-6 md:p-10 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm mt-auto z-10 relative">
      <div className="mb-4 md:mb-0 hover:text-white cursor-pointer transition-colors">
        Privacy Policy
      </div>
      
      <div className="flex gap-1">
        <a href="#" className="hover:text-white transition-colors">Facebook</a>
        <span>/</span>
        <a href="#" className="hover:text-white transition-colors">Instagram</a>
        <span>/</span>
        <a href="#" className="hover:text-white transition-colors">Linkedin</a>
      </div>
    </footer>
  );
};

export default Footer;
