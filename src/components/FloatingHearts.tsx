"use client";

import { useEffect, useRef, useCallback } from "react";

const HEART_COUNT = 10;
const MIN_SIZE = 8;
const MAX_SIZE = 16;
const MIN_OPACITY = 0.3;
const MAX_OPACITY = 0.7;
const MIN_DURATION = 4000;
const MAX_DURATION = 8000;

interface Heart {
  el: HTMLSpanElement;
  x: number;
  y: number;
  drift: number;
  speed: number; // px per ms
  opacity: number;
  startTime: number;
  duration: number;
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function FloatingHearts() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heartsRef = useRef<Heart[]>([]);
  const rafRef = useRef<number>(0);

  const spawnHeart = useCallback((): Heart | null => {
    const container = containerRef.current;
    if (!container) return null;

    const size = rand(MIN_SIZE, MAX_SIZE);
    const opacity = rand(MIN_OPACITY, MAX_OPACITY);
    const duration = rand(MIN_DURATION, MAX_DURATION);
    const x = rand(0, window.innerWidth);
    const drift = rand(-30, 30); // total horizontal drift over lifetime
    const speed = (window.innerHeight + size * 2) / duration;

    const el = document.createElement("span");
    el.textContent = "♥";
    el.style.cssText = `
      position: fixed;
      left: ${x}px;
      bottom: -${size * 2}px;
      font-size: ${size}px;
      color: #FF2D87;
      opacity: ${opacity};
      text-shadow: 0 0 6px #FF2D87, 0 0 12px #FF2D8744;
      filter: drop-shadow(0 0 4px #FF2D87);
      pointer-events: none;
      will-change: transform;
      z-index: 9999;
      line-height: 1;
    `;
    container.appendChild(el);

    return {
      el,
      x,
      y: 0,
      drift,
      speed,
      opacity,
      startTime: performance.now(),
      duration,
    };
  }, []);

  const tick = useCallback(
    (now: number) => {
      const hearts = heartsRef.current;
      const container = containerRef.current;
      if (!container) return;

      // Remove expired hearts and spawn replacements
      for (let i = hearts.length - 1; i >= 0; i--) {
        const h = hearts[i];
        const elapsed = now - h.startTime;
        const progress = elapsed / h.duration;

        if (progress >= 1) {
          h.el.remove();
          hearts.splice(i, 1);
          continue;
        }

        // Move upward + horizontal drift using sine for organic motion
        const yOffset = progress * (window.innerHeight + MAX_SIZE * 2);
        const xOffset =
          h.drift * progress + Math.sin(progress * Math.PI * 2) * 15;

        // Fade out in the last 30%
        let alpha = h.opacity;
        if (progress > 0.7) {
          alpha = h.opacity * (1 - (progress - 0.7) / 0.3);
        }

        h.el.style.transform = `translate(${xOffset}px, -${yOffset}px)`;
        h.el.style.opacity = `${alpha}`;
      }

      // Spawn new hearts to maintain count
      while (hearts.length < HEART_COUNT) {
        const heart = spawnHeart();
        if (heart) {
          // Stagger new spawns slightly
          heart.startTime = now + rand(0, 1000);
          hearts.push(heart);
        } else {
          break;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    },
    [spawnHeart]
  );

  useEffect(() => {
    // Initial spawn
    const hearts = heartsRef.current;
    for (let i = 0; i < HEART_COUNT; i++) {
      const heart = spawnHeart();
      if (heart) {
        // Stagger initial hearts so they don't all start at the bottom
        heart.startTime = performance.now() - rand(0, heart.duration * 0.8);
        hearts.push(heart);
      }
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      hearts.forEach((h) => h.el.remove());
      hearts.length = 0;
    };
  }, [spawnHeart, tick]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
      aria-hidden="true"
    />
  );
}
