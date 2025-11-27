'use client';

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SparklesCoreProps {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
  speed?: number;
}

export const SparklesCore = ({
  id = "tsparticles",
  background = "transparent",
  minSize = 0.4,
  maxSize = 1,
  particleDensity = 800,
  className = "h-full w-full",
  particleColor = "#FFFFFF",
  speed = 1,
}: SparklesCoreProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [particles, setParticles] = useState<any[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      setContext(ctx);
      
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setDimensions({
            width: entry.contentRect.width,
            height: entry.contentRect.height
          });
          
          if (canvasRef.current) {
            canvasRef.current.width = entry.contentRect.width;
            canvasRef.current.height = entry.contentRect.height;
          }
        }
      });
      
      resizeObserver.observe(canvasRef.current.parentElement || document.body);
      return () => resizeObserver.disconnect();
    }
  }, []);

  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      initParticles();
    }
  }, [dimensions, particleDensity, minSize, maxSize, particleColor]);

  const initParticles = () => {
    const newParticles = [];
    for (let i = 0; i < particleDensity; i++) {
      newParticles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * (maxSize - minSize) + minSize,
        speedX: (Math.random() - 0.5) * speed * 0.5,
        speedY: (Math.random() - 0.5) * speed * 0.5,
        opacity: Math.random(),
        direction: Math.random() > 0.5 ? 0.01 : -0.01,
      });
    }
    setParticles(newParticles);
  };

  useEffect(() => {
    let animationId: number;

    const animate = () => {
      if (!context || !canvasRef.current) return;

      context.clearRect(0, 0, dimensions.width, dimensions.height);
      
      if (background !== "transparent") {
        context.fillStyle = background;
        context.fillRect(0, 0, dimensions.width, dimensions.height);
      }

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        
        p.opacity += p.direction;
        if (p.opacity >= 1) {
          p.opacity = 1;
          p.direction = -0.01;
        } else if (p.opacity <= 0.1) {
          p.opacity = 0.1;
          p.direction = 0.01;
        }

        if (p.x < 0) p.x = dimensions.width;
        if (p.x > dimensions.width) p.x = 0;
        if (p.y < 0) p.y = dimensions.height;
        if (p.y > dimensions.height) p.y = 0;

        context.beginPath();
        context.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        context.fillStyle = hexToRgb(particleColor, p.opacity);
        context.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [particles, context, dimensions, background, particleColor]);

  const hexToRgb = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={cn("block pointer-events-none", className)}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
};
