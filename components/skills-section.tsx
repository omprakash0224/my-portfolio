"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  type TargetAndTransition,
} from "framer-motion";
import { Terminal } from "@/components/ui/terminal";
import { Boxes } from "@/components/ui/background-boxes";

// ── Spring config ─────────────────────────────────────────────────────────────

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

// ── Terminal skill commands & outputs ─────────────────────────────────────────

const TERMINAL_COMMANDS = ["npm show my-skills"];

const TERMINAL_OUTPUTS: Record<number, string[]> = {
  0: [
    "",
    "  my-skills@2025.0.0",
    "  -------------------------------------------------",
    "",
    "  [ Languages ]",
    "     +-- Python",
    "     +-- TypeScript",
    "     +-- JavaScript (ES2020+)",
    "",
    "  [ AI / ML & GenAI ]",
    "     +-- Large Language Models (LLMs)",
    "     +-- Retrieval-Augmented Generation (RAG)",
    "     +-- Hybrid Search  (Dense + Sparse / BM25, RRF)",
    "     +-- Vector Embeddings",
    "     +-- Multi-Agent Systems",
    "     +-- LangChain  |  CrewAI  |  Google Gemini API",
    "     +-- scikit-learn  |  XGBoost  |  LightGBM",
    "     +-- SMOTE  |  SHAP",
    "     +-- Prompt Engineering",
    "",
    "  [ Backend Development ]",
    "     +-- FastAPI  |  Flask  |  Node.js  |  Express.js",
    "     +-- RESTful API Design  |  Idempotent API Design",
    "     +-- JWT Authentication  |  JWKS / RS256",
    "     +-- ACID Transactions",
    "     +-- Pydantic  |  SQLAlchemy",
    "     +-- Swagger / OpenAPI",
    "",
    "  [ Frontend Development ]",
    "     +-- Next.js 15 (App Router)  |  React",
    "     +-- Tailwind CSS  |  shadcn/ui  |  Radix UI",
    "     +-- Server Components",
    "     +-- Responsive UI Design",
    "",
    "  [ Databases & Storage ]",
    "     +-- PostgreSQL  |  MongoDB  |  SQLite",
    "     +-- Qdrant (Vector Database)  |  Upstash Redis",
    "     +-- Drizzle ORM  |  Mongoose",
    "     +-- Cloudinary",
    "",
    "  [ DevOps & Infrastructure ]",
    "     +-- Docker  |  Docker Compose",
    "     +-- Vercel  |  Git  |  GitHub",
    "     +-- Swagger / OpenAPI",
    "",
    "  [ Concepts ]",
    "     +-- DSA  |  SDLC  |  Agile",
    "     +-- RBAC  |  Multi-Tenancy",
    "     +-- Software Design Principles",
    "",
    "  -------------------------------------------------",
    "  50+ technologies  |  6+ categories  |  Ready to ship",
    "",
  ],
};

// ── Floating ambient orbs ─────────────────────────────────────────────────────

function AmbientOrb({
  style,
  animate,
}: {
  style: React.CSSProperties;
  animate: TargetAndTransition;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ ...style, position: "absolute" }}
      animate={animate}
      transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
    />
  );
}

// ── Section heading reveal ────────────────────────────────────────────────────

function SectionHeading() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="flex flex-col items-center mb-16">
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE_EXPO }}
        className="flex items-center gap-3 mb-5"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE_EXPO }}
          style={{
            transformOrigin: "right",
            width: 36,
            height: 2,
            background: "linear-gradient(90deg, #B600A8, #7621B0)",
          }}
        />
        <span
          className="text-xs uppercase tracking-[0.32em] font-semibold"
          style={{ color: "#B600A8", fontFamily: "'Kanit', sans-serif" }}
        >
          Technical Arsenal
        </span>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE_EXPO }}
          style={{
            transformOrigin: "left",
            width: 36,
            height: 2,
            background: "linear-gradient(270deg, #B600A8, #7621B0)",
          }}
        />
      </motion.div>

      {/* Main heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease: EASE_EXPO }}
        className="font-black uppercase leading-tight text-center"
        style={{
          fontFamily: "'Kanit', sans-serif",
          fontSize: "clamp(2.4rem, 6.5vw, 5rem)",
          background: "linear-gradient(180deg, #D7E2EA 0%, #8a9db5 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: "1rem",
        }}
      >
        Skills{" "}
        <span
          style={{
            background: "linear-gradient(123deg, #B600A8 0%, #7621B0 60%, #BE4C00 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          &amp; Stack
        </span>
      </motion.h2>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.28, ease: EASE_EXPO }}
        className="text-center font-light"
        style={{
          color: "#7a8f9e",
          fontSize: "clamp(0.88rem, 1.4vw, 1rem)",
          maxWidth: 520,
          fontFamily: "'Kanit', sans-serif",
          letterSpacing: "0.02em",
        }}
      >
        Run <code className="text-emerald-400 font-mono text-sm">npm show my-skills</code> and
        watch the full stack load in.
      </motion.p>
    </div>
  );
}

// ── Scroll progress bar ───────────────────────────────────────────────────────

function ScrollProgressBar({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "left",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: "linear-gradient(90deg, #B600A8, #7621B0, #BE4C00)",
        boxShadow: "0 0 10px #B600A870",
        zIndex: 20,
      }}
    />
  );
}

// ── Ghost watermark ───────────────────────────────────────────────────────────

function GhostWatermark({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const rawY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const y = useSpring(rawY, { stiffness: 40, damping: 18 });

  return (
    <motion.div
      style={{ y }}
      className="absolute top-8 left-1/2 -translate-x-1/2 z-0 pointer-events-none select-none"
      aria-hidden
    >
      <span
        className="font-black uppercase tracking-[0.45em] whitespace-nowrap"
        style={{
          fontSize: "clamp(5rem, 16vw, 13rem)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.028)",
        }}
      >
        Skills
      </span>
    </motion.div>
  );
}

// ── Bottom strip ──────────────────────────────────────────────────────────────

function BottomStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const stats = [
    { value: "6+", label: "Categories" },
    { value: "50+", label: "Technologies" },
    { value: "250+", label: "LeetCode Solved" },
    { value: "25+", label: "Public Repos" },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: EASE_EXPO }}
      className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6"
    >
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease: EASE_EXPO }}
          className="flex flex-col items-center py-5 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(12px)",
          }}
        >
          <span
            className="font-black leading-none mb-1"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              background: "linear-gradient(135deg, #D7E2EA 0%, #B600A8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "'Kanit', sans-serif",
            }}
          >
            {s.value}
          </span>
          <span
            className="text-xs uppercase tracking-widest font-medium"
            style={{ color: "#6a7f90", fontFamily: "'Kanit', sans-serif" }}
          >
            {s.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "end start"],
  });

  return (
    <div style={{ overflow: "hidden", position: "relative", isolation: "isolate" }}>
      <motion.section
        id="skills"
        ref={sectionRef}
        className="relative w-full overflow-hidden"
        style={{
          paddingTop: "clamp(110px, 15vw, 200px)",
          paddingBottom: "clamp(110px, 15vw, 200px)",
          background: "#000000",
          fontFamily: "'Kanit', sans-serif",
        }}
        aria-label="Skills section"
      >
        {/* Scroll progress bar along top */}
        <ScrollProgressBar scrollYProgress={scrollYProgress} />

        {/* Background Boxes */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Boxes />
        </div>



        {/* Content */}
        <div
          className="relative z-10 mx-auto"
          style={{
            maxWidth: "900px",
            padding: "0 clamp(24px, 6vw, 80px)",
          }}
        >
          <SectionHeading />

          {/* Terminal block */}
          <Terminal
            commands={TERMINAL_COMMANDS}
            outputs={TERMINAL_OUTPUTS}
            username="portfolio"
            typingSpeed={38}
            delayBetweenCommands={600}
            initialDelay={400}
            enableSound={true}
            className="w-full max-w-full px-0"
          />

          {/* Bottom stats strip */}
          <BottomStrip />
        </div>


      </motion.section>
    </div>
  );
}
