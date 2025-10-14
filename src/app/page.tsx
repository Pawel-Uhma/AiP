import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { StorySection } from "@/components/sections/story-section";
import { PlanSection } from "@/components/sections/plan-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StorySection />
      <PlanSection />
      <Footer />
    </main>
  );
}
