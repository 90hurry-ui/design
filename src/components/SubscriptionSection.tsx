"use client";

import { Play, Zap, Captions, Download, Star, Tv, Timer } from "lucide-react";

const pricingFeatures = [
  { icon: Play, label: "无限观看" },
  { icon: Zap, label: "影片提速" },
  { icon: Captions, label: "中文字幕" },
  { icon: Download, label: "影片下载" },
  { icon: Star, label: "影片收藏" },
  { icon: Tv, label: "FC2P" },
];

const previewRows = [
  ["/images/04/img1.jpg", "/images/04/img2.jpg", "/images/04/img3.jpg"],
  ["/images/04/img4.jpg", "/images/04/img5.jpg", "/images/04/img6.jpg"],
  ["/images/04/img7.jpg", "/images/04/img8.jpg", "/images/04/img9.jpg"],
];

export default function SubscriptionSection() {
  return (
    <section
      className="flex flex-col w-full"
      style={{
        background:
          "linear-gradient(to top, #1A0A2E 0%, #0D0820 50%, #0A0A0F 100%)",
      }}
    >
      {/* Pricing Card */}
      <div
        className="flex flex-col gap-6 px-6 py-8 w-full"
        style={{
          background:
            "linear-gradient(to top, #0F0A20 0%, #1A0D35 50%, #151030 100%)",
        }}
      >
        {/* Top Bar - Timer + Discount */}
        <div className="flex items-center justify-between w-full">
          <div
            className="flex items-center gap-[6px] rounded-full px-4 py-2"
            style={{
              background: "linear-gradient(180deg, #FF2D78 0%, #E91E8C 100%)",
            }}
          >
            <Timer className="w-[14px] h-[14px] text-white" />
            <span className="text-[12px] font-semibold text-white">
              即将结束  58:48.5
            </span>
          </div>
          <div className="flex flex-col items-center rounded-xl bg-[var(--color-orange)] px-3 py-2">
            <span className="text-[18px] font-black text-white leading-[0.95]">40%</span>
            <span className="text-[10px] font-bold text-white">OFF</span>
          </div>
        </div>

        {/* Title Section */}
        <div className="flex flex-col items-center gap-3 w-full">
          <h2 className="text-[24px] font-black text-[var(--color-text-primary)] text-center">
            独家私人定制视频抢先看
          </h2>
          <p className="text-[15px] font-medium text-[var(--color-text-secondary)] text-center">
            体验榜一大哥的快乐
          </p>
        </div>

        {/* Price Section */}
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="flex items-end gap-3">
            <span className="text-[28px] font-black text-[var(--color-accent)]">¥</span>
            <span className="text-[52px] font-black text-[var(--color-text-primary)] leading-[0.95]">
              214.00
            </span>
            <span className="text-[18px] font-medium text-[var(--color-text-dim)]">¥840.00</span>
          </div>
          <span className="text-[14px] font-semibold text-[var(--color-orange)]">
            6折！！新人特惠！每日仅需0.58元
          </span>
        </div>

        {/* Features Row */}
        <div className="flex justify-between px-2 w-full">
          {pricingFeatures.map((feat, i) => (
            <div key={i} className="flex flex-col items-center gap-[6px] w-[60px]">
              <feat.icon className="w-6 h-6 text-[var(--color-text-secondary)]" />
              <span className="text-[10px] font-medium text-[var(--color-text-muted)] text-center">
                {feat.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          className="flex items-center justify-center gap-2 w-full rounded-full py-[18px] text-center shadow-[0_4px_20px_2px_#FFD70040]"
          style={{
            background:
              "linear-gradient(180deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)",
          }}
        >
          <span className="text-[20px] font-black text-[var(--color-bg-primary)]">¥214</span>
          <span className="text-[14px] font-medium text-[#0A0A0F80]">¥840</span>
          <span className="text-[18px] font-bold text-[var(--color-bg-primary)]">购买一年</span>
        </button>

        {/* Limit Badge */}
        <div className="flex justify-center">
          <span className="rounded-xl bg-[var(--color-accent)] px-3 py-1 text-[11px] font-semibold text-white">
            限时仅售
          </span>
        </div>

        <p className="text-[12px] font-light text-[var(--color-text-dim)] text-center">
          限时优惠仅有一次，不要错过
        </p>
      </div>

      {/* Brand Section */}
      <div className="flex flex-col items-center gap-2 bg-[var(--color-bg-primary)] px-8 pt-10 pb-10 w-full">
        <span className="text-[36px] font-black text-[var(--color-text-primary)] tracking-[2px]">
          FANSONE
        </span>
        <span className="text-[14px] font-medium text-[var(--color-text-muted)]">
          — SVIP会员随便看 —
        </span>
        <span className="text-[13px] font-semibold text-[var(--color-accent)]">
          独家内容，立即订阅解锁
        </span>
      </div>

      {/* Content Preview */}
      <div className="flex flex-col gap-2 bg-[var(--color-bg-primary)] px-3 w-full">
        {/* Section Head */}
        <div className="flex items-center justify-between px-3 pb-2 w-full">
          <div className="flex items-center gap-2">
            <div className="w-[6px] h-[6px] rounded-sm bg-[var(--color-accent)]" />
            <span className="text-[14px] font-bold text-[var(--color-text-primary)] tracking-[1px]">
              热门独家内容
            </span>
          </div>
          <span className="text-[12px] font-medium text-[var(--color-accent)]">更多 →</span>
        </div>

        {/* Preview Grid */}
        {previewRows.map((row, ri) => (
          <div key={ri} className="flex gap-2 w-full">
            {row.map((img, ci) => (
              <div
                key={ci}
                className="relative flex-1 h-[190px] rounded-xl bg-cover bg-center overflow-hidden"
                style={{ backgroundImage: `url('${img}')` }}
              >
                {ri === 1 && ci === 2 && (
                  <div className="absolute top-[2px] left-[2px] flex flex-col rounded bg-[var(--color-accent)] px-2 py-1">
                    <span className="text-[14px] font-black text-white leading-none">史</span>
                    <span className="text-[14px] font-black text-[var(--color-gold)] leading-none">低</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Footer Brand */}
      <div className="flex items-center justify-center py-8 px-6 w-full">
        <span className="text-[36px] font-black text-[var(--color-accent)] tracking-[2px]">
          FANSONE
        </span>
      </div>
    </section>
  );
}
