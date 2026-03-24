"use client";

import { Heart, Sparkles, Moon } from "lucide-react";
import { RevealChild } from "./ScrollReveal";

const featureCards = [
  { icon: Heart, title: "情感陪伴", desc: "AI深度理解你的情绪与需求" },
  { icon: Sparkles, title: "智能对话", desc: "自然流畅，越聊越懂你的心" },
  { icon: Moon, title: "全天在线", desc: "24小时不间断温暖陪伴你" },
];

export default function DatingSection() {
  const avatars = [1, 2, 3, 4, 5];

  return (
    <section
      className="flex flex-col items-center gap-8 px-8 py-[60px] w-full"
      style={{
        background: "linear-gradient(to top, #280A1A 0%, #150A28 100%)",
      }}
    >
      <RevealChild>
        <h2 className="text-[32px] font-black text-[var(--color-text-primary)] leading-[1.1] text-center">
          AI女友24小时在线
        </h2>
        <p className="text-[16px] font-medium text-[var(--color-text-secondary)] leading-[1.4] mt-2 text-center">
          智能陪伴，懂你所想，随时回应
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
                  backgroundImage: `url('/images/photo/photo${num}.jpg')`,
                  left: `${i * 54}px`,
                }}
              />
            ))}
          </div>
          <span className="text-[14px] font-medium text-[var(--color-text-secondary)]">
            已有 50,000+ 用户拥有专属AI女友
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
          立即开启
        </button>
      </RevealChild>
    </section>
  );
}
