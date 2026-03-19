import HeroSection from "@/components/HeroSection";
import DatingSection from "@/components/DatingSection";
import CommunitySection from "@/components/CommunitySection";
import SubscriptionSection from "@/components/SubscriptionSection";
import ScrollReveal from "@/components/ScrollReveal";
import FloatingHearts from "@/components/FloatingHearts";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full min-h-full dark-rainbow-bg">
      <FloatingHearts />
      <div className="w-full max-w-[480px] flex flex-col">
        <HeroSection />
        <ScrollReveal staggerDelay={120}>
          <DatingSection />
        </ScrollReveal>
        <ScrollReveal staggerDelay={100}>
          <CommunitySection />
        </ScrollReveal>
        <ScrollReveal staggerDelay={100}>
          <SubscriptionSection />
        </ScrollReveal>
      </div>
    </main>
  );
}
