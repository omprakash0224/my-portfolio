import { MinimalistHero } from "@/components/minimalist-hero";
import { AboutSection } from "@/components/about-section";
import { SkillsSection } from "@/components/skills-section";
import { ProjectsSection } from "@/components/stacking-card";
import { CinematicFooter } from "@/components/motion-footer";

export default function Home() {
  return (
    <main style={{ overflowX: "clip", background: "#0C0C0C" }}>
      <MinimalistHero />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <CinematicFooter />
    </main>
  );
}
