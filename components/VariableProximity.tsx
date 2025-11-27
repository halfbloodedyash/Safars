'use client';

import React, { forwardRef, useMemo, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface VariableProximityProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
  radius?: number;
  falloff?: "linear" | "exponential" | "gaussian";
}

const parseSettings = (settings: string): Record<string, number> => {
  return settings.split(",").reduce((acc, setting) => {
    const [key, value] = setting.trim().split(" ");
    const prop = key.replace(/['"]/g, "");
    acc[prop] = parseFloat(value);
    return acc;
  }, {} as Record<string, number>);
};

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>(
  (
    {
      label,
      fromFontVariationSettings,
      toFontVariationSettings,
      containerRef,
      radius = 50,
      falloff = "linear",
      className,
      onClick,
      style,
      ...props
    },
    ref
  ) => {
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

    const fromSettings = useMemo(
      () => parseSettings(fromFontVariationSettings),
      [fromFontVariationSettings]
    );
    const toSettings = useMemo(
      () => parseSettings(toFontVariationSettings),
      [toFontVariationSettings]
    );

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        const x = e.clientX;
        const y = e.clientY;

        requestAnimationFrame(() => {
          letterRefs.current.forEach((letterRef) => {
            if (!letterRef) return;
            const rect = letterRef.getBoundingClientRect();
            const letterX = rect.left + rect.width / 2;
            const letterY = rect.top + rect.height / 2;

            const dist = Math.sqrt(
              Math.pow(x - letterX, 2) + Math.pow(y - letterY, 2)
            );

            let factor = Math.max(0, 1 - dist / radius);

            if (falloff === "exponential") {
              factor = factor * factor;
            } else if (falloff === "gaussian") {
              factor = Math.exp(-Math.pow(dist / (radius * 0.5), 2));
              if (dist > radius) factor = 0;
            }

            const currentSettings = Object.keys(fromSettings)
              .map((key) => {
                const start = fromSettings[key];
                const end = toSettings[key];
                const current = start + (end - start) * factor;
                return `'${key}' ${current}`;
              })
              .join(", ");

            letterRef.style.fontVariationSettings = currentSettings;
          });
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [fromSettings, toSettings, radius, falloff]);

    return (
      <span
        ref={ref}
        className={cn("inline-block", className)}
        onClick={onClick}
        style={{ ...style }}
        {...props}
      >
        {label.split("").map((char, index) => (
          <span
            key={index}
            ref={(el) => {
              letterRefs.current[index] = el;
            }}
            style={{
              fontVariationSettings: fromFontVariationSettings,
              display: "inline-block",
              transition: "font-variation-settings 0.1s ease",
            }}
            aria-hidden="true"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
        <span className="sr-only">{label}</span>
      </span>
    );
  }
);

VariableProximity.displayName = "VariableProximity";
export default VariableProximity;
