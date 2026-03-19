import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FANSONE - 全球美女网黄全收集",
  description: "真实私密交友，寻找灵魂与身体的双重愉悦",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600;700;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body className="h-full font-primary bg-[var(--color-bg-primary)]">
        {children}
      </body>
    </html>
  );
}
