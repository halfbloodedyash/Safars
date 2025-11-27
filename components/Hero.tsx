'use client';

import React, { useRef, RefObject } from 'react';
import VariableProximity from './VariableProximity';
import CountdownTimer from './CountdownTimer';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);  // Changed from useRef(null)
  
  const LAUNCH_DATE = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();

  return (
    <main 
      ref={containerRef}
      className="flex-grow flex flex-col justify-center items-center px-4 w-full z-10 py-12 md:py-0"
    >
      <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 md:mb-12">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-pink-500 animate-gradient-x pb-2">
            Coming Soon
          </span>
        </h1>

        <div 
          className="text-gray-300 text-base md:text-4xl font-light leading-relaxed max-w-2xl mx-auto mb-8 opacity-90 min-h-[80px] flex items-center justify-center"
          style={{ fontFamily: '"Roboto Flex", sans-serif' }}
        >
          <VariableProximity
            label="Navigating Your Digital Future."
            className="cursor-default text-center"
            fromFontVariationSettings="'wght' 300, 'opsz' 12"
            toFontVariationSettings="'wght' 800, 'opsz' 40"
            containerRef={containerRef}
            radius={80}
            falloff="linear"
          />
        </div>

        <CountdownTimer targetDate={LAUNCH_DATE} />
      </div>
    </main>
  );
};

type Props = {
  containerRef: RefObject<HTMLElement | null>;
};

export default Hero;
