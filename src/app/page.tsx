import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { StorySection } from "@/components/sections/story-section";
import { PlanSection } from "@/components/sections/plan-section";
import { RSVPSection } from "@/components/sections/rsvp-section";
import { RedSection } from "@/components/sections/red-section";
import { BlueSection } from "@/components/sections/blue-section";
import { GreenSection } from "@/components/sections/green-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StorySection />
      <PlanSection />
      <RSVPSection />
      <RedSection />
      <BlueSection />
      <GreenSection />
      <Footer />
    </main>
  );
}
