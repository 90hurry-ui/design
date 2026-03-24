"use client";

import { useEffect, useRef, useCallback, useMemo } from "react";

const hotCards = [
  { name: "玩偶姐姐", img: "/images/01/Snipaste_2026-01-13_20-35-33.png" },
  { name: "饼干姐姐", img: "/images/01/Snipaste_2026-01-13_20-44-06.png" },
  { name: "狐不妖", img: "/images/01/Snipaste_2026-01-13_21-15-21.png" },
  { name: "苏小涵", img: "/images/01/Snipaste_2026-01-13_21-15-47.png" },
  { name: "小蜜桃", img: "/images/01/Snipaste_2026-01-13_22-06-18.png" },
  { name: "瑶瑶", img: "/images/01/Snipaste_2026-01-13_22-12-21.png" },
  { name: "芋圆圆", img: "/images/01/Telegram Web (33).jpg" },
  { name: "水蜜桃", img: "/images/01/Telegram Web (45).jpg" },
];

const CARD_W = 140;
const CARD_H_LARGE = 220;
const CARD_GAP = 12;
const CARD_STEP = CARD_W + CARD_GAP;
const AUTO_PLAY_MS = 2000;
const TRANSITION_MS = 400;
const SCALE_MIN = 0.9;
const SCALE_MAX = 1.1;
const OPACITY_MIN = 0.4;
const OPACITY_MAX = 1;
// Distance (px) over which scale interpolates from max to min
const INFLUENCE_RADIUS = CARD_STEP * 1.2;
const COPIES = 5;

export default function HeroSection() {
  const loopCards = useMemo(() => {
    const arr = [];
    for (let c = 0; c < COPIES; c++) {
      for (let i = 0; i < hotCards.length; i++) {
        arr.push({ ...hotCards[i], originalIndex: i });
      }
    }
    return arr;
  }, []);

  const total = loopCards.length;
  const middleStart = Math.floor(COPIES / 2) * hotCards.length;

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeIndex = useRef(middleStart);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const rafRef = useRef<number>(0);
  const isAnimating = useRef(false);

  // Drag state
  const dragStartX = useRef(0);
  const dragDelta = useRef(0);
  const isDragging = useRef(false);

  const getTranslateForIndex = useCallback(
    (index: number, containerWidth: number) => {
      const cardCenter = index * CARD_STEP + CARD_W / 2;
      return containerWidth / 2 - cardCenter;
    },
    []
  );

  // Continuously interpolate card scale/opacity based on distance from center
  const updateCardScales = useCallback((trackTx: number) => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const centerX = container.offsetWidth / 2;
    const cards = track.children;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;
      const cardCenterX = trackTx + i * CARD_STEP + CARD_W / 2;
      const dist = Math.abs(cardCenterX - centerX);

      // Smoothly interpolate: 0 distance = max scale, >= INFLUENCE_RADIUS = min scale
      const t = Math.min(dist / INFLUENCE_RADIUS, 1);
      const scale = SCALE_MAX - t * (SCALE_MAX - SCALE_MIN);
      const opacity = OPACITY_MAX - t * (OPACITY_MAX - OPACITY_MIN);
      const glowAlpha = Math.round((1 - t) * 0x55);
      const glowHex = glowAlpha.toString(16).padStart(2, "0");

      card.style.transform = `scale(${scale})`;
      card.style.opacity = `${opacity}`;
      card.style.boxShadow =
        glowAlpha > 5 ? `0 0 24px 2px #FF2D78${glowHex}` : "none";
    }
  }, []);

  // rAF loop that reads the track's current computed translateX and updates card styles
  const startScaleLoop = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const tick = () => {
      const track = trackRef.current;
      if (!track || !isAnimating.current) return;

      const computed = getComputedStyle(track);
      const matrix = new DOMMatrix(computed.transform);
      updateCardScales(matrix.m41);

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [updateCardScales]);

  const stopScaleLoop = useCallback(() => {
    isAnimating.current = false;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  }, []);

  const applyLayout = useCallback(
    (index: number, animate: boolean) => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const tx = getTranslateForIndex(index, container.offsetWidth);
      track.style.transition = animate
        ? `transform ${TRANSITION_MS}ms cubic-bezier(0.25,0.1,0.25,1)`
        : "none";
      track.style.transform = `translateX(${tx}px)`;

      // Update card scales immediately for non-animated, or start loop for animated
      if (animate) {
        startScaleLoop();
      } else {
        updateCardScales(tx);
      }
    },
    [getTranslateForIndex, updateCardScales, startScaleLoop]
  );

  const resetToMiddle = useCallback(() => {
    const idx = activeIndex.current;
    const posInOriginal =
      ((idx % hotCards.length) + hotCards.length) % hotCards.length;
    const middleEquivalent = middleStart + posInOriginal;
    if (idx !== middleEquivalent) {
      activeIndex.current = middleEquivalent;
      applyLayout(middleEquivalent, false);
    }
  }, [middleStart, applyLayout]);

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent) => {
      if (e.target !== trackRef.current) return;
      stopScaleLoop();
      resetToMiddle();
    },
    [resetToMiddle, stopScaleLoop]
  );

  const goTo = useCallback(
    (index: number) => {
      activeIndex.current = index;
      applyLayout(index, true);
    },
    [applyLayout]
  );

  const advance = useCallback(() => {
    goTo(activeIndex.current + 1);
  }, [goTo]);

  // Initial layout
  useEffect(() => {
    applyLayout(activeIndex.current, false);
  }, [applyLayout]);

  // Auto-play
  useEffect(() => {
    autoPlayRef.current = setInterval(advance, AUTO_PLAY_MS);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [advance]);

  // Cleanup rAF on unmount
  useEffect(() => {
    return () => stopScaleLoop();
  }, [stopScaleLoop]);

  const pauseAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  const resumeAutoPlay = useCallback(() => {
    pauseAutoPlay();
    autoPlayRef.current = setInterval(advance, AUTO_PLAY_MS);
  }, [advance, pauseAutoPlay]);

  // --- Unified drag logic ---
  const startDrag = useCallback(
    (clientX: number) => {
      pauseAutoPlay();
      stopScaleLoop();
      isDragging.current = true;
      dragStartX.current = clientX;
      dragDelta.current = 0;

      // Freeze at current computed position to prevent jumps
      const track = trackRef.current;
      if (track) {
        const computed = getComputedStyle(track);
        const matrix = new DOMMatrix(computed.transform);
        track.style.transition = "none";
        track.style.transform = `translateX(${matrix.m41}px)`;
        updateCardScales(matrix.m41);
      }
    },
    [pauseAutoPlay, stopScaleLoop, updateCardScales]
  );

  const moveDrag = useCallback(
    (clientX: number) => {
      if (!isDragging.current) return;
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      dragDelta.current = clientX - dragStartX.current;
      const baseTx = getTranslateForIndex(
        activeIndex.current,
        container.offsetWidth
      );
      const currentTx = baseTx + dragDelta.current;

      track.style.transition = "none";
      track.style.transform = `translateX(${currentTx}px)`;

      // Continuously update card scales based on position
      updateCardScales(currentTx);
    },
    [getTranslateForIndex, updateCardScales]
  );

  const endDrag = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const container = containerRef.current;
    if (!container) return;

    // Find the card closest to center based on current drag position
    const baseTx = getTranslateForIndex(
      activeIndex.current,
      container.offsetWidth
    );
    const currentTx = baseTx + dragDelta.current;
    const centerX = container.offsetWidth / 2;

    let closestIdx = activeIndex.current;
    let closestDist = Infinity;
    for (let i = 0; i < total; i++) {
      const cardCenterX = currentTx + i * CARD_STEP + CARD_W / 2;
      const dist = Math.abs(cardCenterX - centerX);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = i;
      }
    }

    goTo(closestIdx);
    resumeAutoPlay();
  }, [goTo, resumeAutoPlay, total, getTranslateForIndex]);

  // --- Touch events ---
  const onTouchStart = useCallback(
    (e: React.TouchEvent) => startDrag(e.touches[0].clientX),
    [startDrag]
  );
  const onTouchMove = useCallback(
    (e: React.TouchEvent) => moveDrag(e.touches[0].clientX),
    [moveDrag]
  );
  const onTouchEnd = useCallback(() => endDrag(), [endDrag]);

  // --- Mouse events ---
  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      startDrag(e.clientX);
    },
    [startDrag]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => moveDrag(e.clientX);
    const handleMouseUp = () => endDrag();

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [moveDrag, endDrag]);

  return (
    <section
      className="flex flex-col w-full"
      style={{
        background: "linear-gradient(to top, #0A1E1E 0%, #0A1428 50%, #0D0620 100%)",
      }}
    >
      {/* Hero Image Area */}
      <div className="relative w-full h-[460px] overflow-hidden">
        <video
          className="absolute inset-0 w-full h-[360px] object-cover"
          src="/images/move/top_move2.mov"
          poster="/images/move/fengmian2.jpg"
          autoPlay
          loop
          muted
          playsInline
        />
        <img
          src="/images/move/fengmian2.jpg"
          alt=""
          className="absolute inset-0 w-full h-[360px] object-cover"
          style={{ zIndex: -1 }}
        />
        <div className="absolute top-0 left-0 w-full h-[56px] flex items-center px-6 bg-[#0A0A0F80] z-10">
          <span className="text-[22px] font-bold text-[var(--color-text-primary)] tracking-[2px]">
            FANSONE
          </span>
        </div>
        <div
          className="absolute inset-0 flex flex-col justify-end gap-2 px-6 pb-8"
          style={{
            background:
              "linear-gradient(to top, #0A0A0F 0%, #0A0A0F 20%, #0A0A0FEE 28%, #0A0A0FCC 40%, #0A0A0F99 55%, #0A0A0F40 70%, #0A0A0F00 85%, #0A0A0F00 100%)",
          }}
        >
          <h1 className="text-[32px] font-black text-[var(--color-text-primary)]">
            全球美女网黄全收集
          </h1>
          <p className="text-[16px] font-medium text-[var(--color-text-secondary)]">
            网黄动态实时同步更新
          </p>
          <button className="mt-2 self-start rounded-full bg-[var(--color-accent)] px-10 py-[14px] text-[18px] font-bold text-white shadow-[0_0_24px_4px_#FF2D7860]">
            立即体验
          </button>
        </div>
      </div>

      {/* 热门网黄 Section */}
      <div
        className="flex flex-col gap-4 pt-6 w-full"
        style={{
          background: "linear-gradient(to top, #150A28 0%, #0A0A0F 75%, #0A0A0F 100%)",
        }}
      >
        <div className="flex items-center gap-2 px-6">
          <div className="w-1 h-5 rounded-sm bg-[var(--color-accent)]" />
          <span className="text-[20px] font-bold text-[var(--color-text-primary)]">
            热门网黄
          </span>
        </div>

        {/* Carousel */}
        <div
          ref={containerRef}
          className="relative w-full h-[300px] overflow-x-clip overflow-y-visible pt-[40px] select-none cursor-grab active:cursor-grabbing"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
        >
          <div
            ref={trackRef}
            className="flex items-center absolute top-0 bottom-0 overflow-visible"
            style={{ gap: `${CARD_GAP}px`, paddingTop: 40 }}
            onTransitionEnd={handleTransitionEnd}
          >
            {loopCards.map((card, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 rounded-2xl border border-[var(--color-accent-border)] overflow-hidden pointer-events-none will-change-transform"
                style={{
                  width: CARD_W,
                  height: CARD_H_LARGE,
                  transformOrigin: "center bottom",
                }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${card.img}')` }}
                />
                <div
                  className="absolute bottom-0 left-0 w-full h-[80px]"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
                  }}
                />
                <span className="absolute bottom-2 left-0 w-full text-center text-[13px] font-bold text-white z-10">
                  {card.name}
                </span>
              </div>
            ))}
          </div>

          {/* Fade edges */}
          <div className="absolute left-0 top-0 w-[60px] h-full bg-gradient-to-r from-[#0A0A0F] to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 w-[40px] h-full bg-gradient-to-l from-[#0A0A0F] to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
}
