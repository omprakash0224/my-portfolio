import { MinimalistHero } from "@/components/minimalist-hero";
import { DynamicSections } from "@/components/dynamic-sections";

export default function Home() {
  return (
    <main style={{ overflowX: "clip", background: "#0C0C0C" }}>
      <MinimalistHero />
      <DynamicSections />
    </main>
  );
}

