"use client";

import { Video, Lock, MessageCircle } from "lucide-react";
import { RevealChild } from "./ScrollReveal";

const featureCards = [
  { icon: Video, title: "视频通话", desc: "与真实创作者面对面视频互动" },
  { icon: Lock, title: "私密相册", desc: "专属私密内容，只为你解锁" },
  { icon: MessageCircle, title: "即时消息", desc: "随时随地，畅聊无限" },
];

export default function DatingSection() {
  const avatars = [1, 2, 1, 2, 1];

  return (
    <section className="flex flex-col items-center gap-8 bg-[var(--color-bg-primary)] px-8 py-[60px] w-full">
      <RevealChild>
        <h2 className="text-[32px] font-black text-[var(--color-text-primary)] leading-[1.1] text-center">
          真实私密交友
        </h2>
        <p className="text-[16px] font-medium text-[var(--color-text-secondary)] leading-[1.4] mt-2 text-center">
          寻找灵魂与身体的双重愉悦
        </p>
      </RevealChild>

      <RevealChild className="w-full">
        <div className="flex gap-3 w-full">
          {featureCards.map((card, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col items-center gap-4 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] py-7 px-4"
            >
              <div className="w-14 h-14 rounded-xl bg-[#3D1A2E] flex items-center justify-center">
                <card.icon className="w-6 h-6 text-[#FF2D87]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col items-center gap-1 w-full">
                <span className="text-[16px] font-bold text-[var(--color-text-primary)] text-center">
                  {card.title}
                </span>
                <span className="text-[13px] font-medium text-[var(--color-text-muted)] text-center leading-[1.4]">
                  {card.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </RevealChild>

      <RevealChild className="w-full">
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="relative h-[60px] w-[276px]">
            {avatars.map((num, i) => (
              <div
                key={i}
                className="absolute w-[60px] h-[60px] rounded-full bg-cover bg-center border-[3px] border-[var(--color-bg-primary)]"
                style={{
                  backgroundImage: `url('/images/photo/photo${num}.webp')`,
                  left: `${i * 54}px`,
                }}
              />
            ))}
          </div>
          <span className="text-[14px] font-medium text-[var(--color-text-secondary)]">
            已有 10,000+ 用户找到心仪对象
          </span>
        </div>
      </RevealChild>

      <RevealChild className="w-full">
        <button
          className="w-full rounded-[14px] py-4 text-center text-[18px] font-bold text-white"
          style={{
            background: "linear-gradient(180deg, #FF2D78 0%, #E91E8C 100%)",
          }}
        >
          开始匹配
        </button>
      </RevealChild>
    </section>
  );
}
