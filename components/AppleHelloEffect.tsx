'use client';

import React from "react";

export const AppleHelloEnglishEffect = ({ speed = 1 }: { speed?: number }) => {
  return (
    <div className="relative flex items-center justify-center">
      <svg width="400" height="200" viewBox="0 0 400 200" className="w-full max-w-md overflow-visible">
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-6xl md:text-8xl font-bold text-white tracking-wide"
          style={{
            fontFamily: '"Dancing Script", cursive',
            strokeDasharray: 1000,
            strokeDashoffset: 1000,
            animation: `draw ${4 / speed}s ease-in-out forwards`,
          }}
        >
          Safars
        </text>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="currentColor"
          className="text-6xl md:text-8xl font-bold text-white opacity-0"
          style={{
            fontFamily: '"Dancing Script", cursive',
            animation: `fadeIn 1s ease-in-out forwards ${3.5 / speed}s`,
          }}
        >
          Safars
        </text>
      </svg>
      <style>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
