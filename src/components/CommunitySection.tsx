"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Heart, MessageCircle, Camera, Video, ArrowRight } from "lucide-react";
import { RevealChild } from "./ScrollReveal";

const stats = [
  { base: 1378233, label: "UP主入驻", color: "text-[var(--color-accent)]" },
  { base: 98325, label: "原创内容", color: "text-[var(--color-text-primary)]" },
  { fixed: "24/7", label: "实时更新", color: "text-[var(--color-text-primary)]" },
];

function AnimatedCounter({ base, fixed }: { base?: number; fixed?: string }) {
  const [value, setValue] = useState(base ?? 0);
  const [bounce, setBounce] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Random micro-increments with bounce
  useEffect(() => {
    if (fixed || !base) return;
    const run = () => {
      const delay = 3000 + Math.random() * 4000;
      return setTimeout(() => {
        setValue((v) => v + Math.floor(Math.random() * 3) + 1);
        setBounce(true);
        setTimeout(() => setBounce(false), 300);
        timerRef.current = run();
      }, delay);
    };
    const timerRef = { current: run() };
    return () => clearTimeout(timerRef.current);
  }, [base, fixed]);

  if (fixed) return <>{fixed}</>;

  return (
    <span
      ref={ref}
      style={{
        display: "inline-block",
        transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        transform: bounce ? "scale(1.2)" : "scale(1)",
      }}
    >
      {value.toLocaleString()}
    </span>
  );
}

const creatorsRow1 = [
  { name: "三上悠亚", fans: "52.3万 粉丝", img: "/images/02/02img1.jpg" },
  { name: "明日花绮罗", fans: "38.7万 粉丝", img: "/images/02/02img2.jpg" },
  { name: "桃乃木かな", fans: "45.1万 粉丝", img: "/images/02/02img3.jpg" },
];

const creatorsRow2 = [
  { name: "深田えいみ", fans: "67.8万 粉丝", img: "/images/02/02img4.jpg" },
  { name: "河北彩花", fans: "29.4万 粉丝", img: "/images/02/02img5.jpg" },
  { name: "波多野结衣", fans: "41.2万 粉丝", img: "/images/02/02img6.jpg" },
];

const features = [
  [
    { icon: Heart, title: "打赏互动", desc: "送礼物表达喜爱" },
    { icon: MessageCircle, title: "私信聊天", desc: "与博主一对一交流" },
  ],
  [
    { icon: Camera, title: "独家内容", desc: "订阅解锁专属福利" },
    { icon: Video, title: "直播互动", desc: "实时直播零距离接触" },
  ],
];

function CreatorCard({ name, fans, img }: { name: string; fans: string; img: string }) {
  return (
    <div className="flex-1 flex flex-col rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-accent-border-light)] overflow-hidden">
      <div
        className="w-full h-[160px] bg-cover bg-center"
        style={{ backgroundImage: `url('${img}')` }}
      />
      <div className="flex flex-col gap-1 bg-[var(--color-bg-card)] p-[10px] px-3 w-full">
        <span className="text-[13px] font-semibold text-[var(--color-text-primary)]">{name}</span>
        <span className="text-[10px] font-medium text-[var(--color-text-muted)]">{fans}</span>
      </div>
    </div>
  );
}

export default function CommunitySection() {
  return (
    <section
      className="flex flex-col w-full"
      style={{
        background:
          "linear-gradient(to top, #0F0525 0%, #200A28 30%, #0A1530 55%, #0F0828 80%, #150A25 100%)",
      }}
    >
      {/* Community Header */}
      <RevealChild>
        <div className="flex flex-col items-center gap-3 px-8 pt-12 pb-6">
          <div className="w-10 h-1 rounded-sm bg-[var(--color-accent)]" />
          <h2 className="text-[40px] font-bold text-[var(--color-text-primary)] text-center">
            百万UP入驻
          </h2>
          <div className="flex flex-col items-center gap-1 w-full">
            <span
              className="text-[24px] font-bold bg-clip-text text-transparent text-center animate-gradient-flow"
              style={{
                backgroundImage: "linear-gradient(90deg, #E0E0E0 0%, #ff2d78 50%, #E0E0E0 100%)",
                backgroundSize: "200% 100%",
              }}
            >
              创作收益全归你
            </span>
            <div className="flex items-end justify-center gap-1 w-full">
              <span
                className="text-[22px] font-bold bg-clip-text text-transparent text-center animate-gradient-flow"
                style={{
                  backgroundImage: "linear-gradient(-90deg, #ffffff 0%, #ff2d78 50%, #ffffff 100%)",
                  backgroundSize: "200% 100%",
                }}
              >
                我们只抽
              </span>
              <span
                className="text-[48px] font-black leading-[0.85] bg-clip-text text-transparent text-center animate-gradient-flow"
                style={{
                  backgroundImage: "linear-gradient(110deg, #FF2D78 0%, #FF6B35 12.5%, #FFD700 25%, #FF2D78 37.5%, #FF69B4 50%, #FF2D78 62.5%, #FFD700 75%, #FF6B35 87.5%, #FF2D78 100%)",
                  backgroundSize: "200% 100%",
                }}
              >
                7%
              </span>
            </div>
          </div>
          <p className="text-[15px] font-medium text-[var(--color-text-secondary)] text-center">
            与你喜欢的博主真实互动
          </p>
        </div>
      </RevealChild>

      {/* Stats Bar */}
      <RevealChild>
        <div className="flex items-center justify-center gap-6 px-8 py-4 w-full">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-6">
              <div className="flex flex-col items-center gap-[2px]">
                <span className={`text-[22px] font-black ${stat.color}`}>
                  <AnimatedCounter base={stat.base} fixed={stat.fixed} />
                </span>
                <span className="text-[11px] font-medium text-[var(--color-text-muted)]">
                  {stat.label}
                </span>
              </div>
              {i < stats.length - 1 && (
                <div className="w-px h-7 bg-[var(--color-border)]" />
              )}
            </div>
          ))}
        </div>
      </RevealChild>

      {/* Section Label */}
      <div className="flex items-center justify-between px-8 py-5 pb-3 w-full">
        <div className="flex items-center gap-2">
          <div className="w-[6px] h-[6px] rounded-sm bg-[var(--color-accent)]" />
          <span className="text-[14px] font-bold text-[var(--color-text-primary)] tracking-[1px]">
            热门UP主推荐
          </span>
        </div>
        <span className="text-[12px] font-medium text-[var(--color-accent)]">查看全部 →</span>
      </div>

      {/* Creator Cards Grid */}
      <RevealChild>
        <div className="flex gap-3 px-5 w-full">
          {creatorsRow1.map((c, i) => (
            <CreatorCard key={i} {...c} />
          ))}
        </div>
      </RevealChild>
      <RevealChild>
        <div className="flex gap-3 px-5 pt-3 w-full">
          {creatorsRow2.map((c, i) => (
            <CreatorCard key={i} {...c} />
          ))}
        </div>
      </RevealChild>

      {/* Features Section */}
      <div className="flex flex-col gap-5 px-6 pt-8 w-full">
        <div className="flex items-center gap-2">
          <div className="w-[6px] h-[6px] rounded-sm bg-[var(--color-accent)]" />
          <span className="text-[14px] font-bold text-[var(--color-text-primary)] tracking-[1px]">
            社区互动玩法
          </span>
        </div>

        {features.map((row, ri) => (
          <RevealChild key={ri}>
            <div className="flex gap-3 w-full">
              {row.map((feat, fi) => (
                <div
                  key={fi}
                  className="flex-1 flex flex-col gap-[10px] rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] p-4"
                >
                  <feat.icon className="w-6 h-6 text-[var(--color-accent)]" />
                  <span className="text-[13px] font-semibold text-[var(--color-text-primary)]">
                    {feat.title}
                  </span>
                  <span className="text-[11px] font-light text-[var(--color-text-muted)]">
                    {feat.desc}
                  </span>
                </div>
              ))}
            </div>
          </RevealChild>
        ))}
      </div>

      {/* CTA Section */}
      <RevealChild>
        <div className="flex flex-col items-center gap-4 px-8 pt-8 pb-12 w-full">
          <h3 className="text-[20px] font-bold text-[var(--color-text-primary)] text-center">
            加入百万粉丝社区
          </h3>
          <p className="text-[14px] font-light text-[var(--color-text-secondary)] text-center">
            与你喜爱的UP主零距离互动
          </p>
          <button
            className="flex items-center justify-center gap-2 w-[280px] rounded-full py-4 px-10 text-[16px] font-bold text-white shadow-[0_4px_24px_2px_#FF2D7840]"
            style={{
              background: "linear-gradient(180deg, #FF2D78 0%, #E91E8C 100%)",
            }}
          >
            <ArrowRight className="w-[18px] h-[18px]" />
            立即加入
          </button>
          <span className="text-[11px] font-medium text-[var(--color-text-dim)]">
            已有 1,000,000+ 用户选择FANSONE
          </span>
        </div>
      </RevealChild>
    </section>
  );
}
