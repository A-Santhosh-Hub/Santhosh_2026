"use client";

import Hero from "@/components/Hero";
import DeveloperProfile from "@/components/DeveloperProfile";
import ProjectHideout from "@/components/ProjectHideout";
import AssetViewerSection from "@/components/AssetViewerSection";
import IFruitSection from "@/components/IFruitSection";
import GameArcadeSection from "@/components/GameArcadeSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <Hero />
      <DeveloperProfile />
      <ProjectHideout />
      <AssetViewerSection />
      <IFruitSection />
      <GameArcadeSection />
      <Footer />
    </main>
  );
}
