'use client';

import React from 'react';
import { Waves } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full p-6 flex flex-col md:flex-row justify-between items-center z-10 relative">
      <div className="flex items-center gap-2 mb-4 md:mb-0">
        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/5">
          <Waves className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-2xl tracking-wider text-white">Safars</span>
      </div>
    </header>
  );
};

export default Header;
