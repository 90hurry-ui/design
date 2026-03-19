"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  staggerDelay = 100,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const kids = el.querySelectorAll<HTMLElement>(":scope [data-reveal-child]");

    // JS loaded — apply hidden state
    el.classList.add("reveal-hidden");
    kids.forEach((child) => child.classList.add("reveal-hidden"));
    el.offsetHeight; // force reflow

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("reveal-visible");
            kids.forEach((child, i) => {
              child.style.transitionDelay = `${i * staggerDelay}ms`;
              child.classList.add("reveal-visible");
            });
          } else {
            el.classList.remove("reveal-visible");
            kids.forEach((child) => {
              child.style.transitionDelay = "0ms";
              child.classList.remove("reveal-visible");
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [staggerDelay]);

  return (
    <div ref={ref} className={`reveal-container ${className}`}>
      {children}
    </div>
  );
}

export function RevealChild({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div data-reveal-child className={`reveal-child ${className}`}>
      {children}
    </div>
  );
}
