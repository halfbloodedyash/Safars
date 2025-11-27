'use client';

import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { SparklesCore } from '@/components/SparklesCore';
import LoadingScreen from '@/components/LoadingScreen';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playAudio = async () => {
      try {
        audio.volume = 0.5;
        await audio.play();
      } catch (err) {
        console.warn("Audio play failed", err);
      }
    };

    playAudio();

    const fadeStartTime = 17000;
    const fadeDuration = 3000;
    const intervalTime = 100;
    const steps = fadeDuration / intervalTime;
    const volumeStep = 0.5 / steps;

    let fadeInterval: ReturnType<typeof setInterval>;

    const fadeStartTimer = setTimeout(() => {
      fadeInterval = setInterval(() => {
        if (audio.volume > 0) {
          audio.volume = Math.max(0, audio.volume - volumeStep);
        } else {
          clearInterval(fadeInterval);
          audio.pause();
        }
      }, intervalTime);
    }, fadeStartTime);

    const stopTimer = setTimeout(() => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    }, 20000);

    return () => {
      clearTimeout(fadeStartTimer);
      clearTimeout(stopTimer);
      if (fadeInterval) clearInterval(fadeInterval);
    };
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/audio/2022/10/25/audio_ecba0c58a1.mp3"
        preload="auto"
      />

      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="min-h-screen bg-[#050505] flex flex-col relative overflow-hidden animate-fade-in">
          <div className="absolute inset-0 w-full h-full z-0">
            <SparklesCore
              id="tsparticlesfullpage"
              background="transparent"
              minSize={0.4}
              maxSize={1.6}
              particleDensity={350}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none z-0" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-900/5 rounded-full blur-[100px] pointer-events-none z-0" />
          
          <Header />
          <Hero />
          <Footer />
        </div>
      )}
    </>
  );
}
