'use client';

import React from "react";
import { AppleHelloEnglishEffect } from "./AppleHelloEffect";

const LoadingScreen = () => {
  return (
    <div className="flex w-full h-screen flex-col justify-center items-center gap-16 bg-[#050505] z-50 relative">
      <AppleHelloEnglishEffect speed={1.1} />
    </div>
  );
};

export default LoadingScreen;
