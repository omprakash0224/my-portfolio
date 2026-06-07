"use client";

import dynamic from "next/dynamic";

const AboutSection = dynamic(() => import("@/components/about-section").then(mod => mod.AboutSection), { ssr: false });
const SkillsSection = dynamic(() => import("@/components/skills-section").then(mod => mod.SkillsSection), { ssr: false });
const ProjectsSection = dynamic(() => import("@/components/stacking-card").then(mod => mod.ProjectsSection), { ssr: false });
const CinematicFooter = dynamic(() => import("@/components/motion-footer").then(mod => mod.CinematicFooter), { ssr: false });

export function DynamicSections() {
  return (
    <>
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <CinematicFooter />
    </>
  );
}
