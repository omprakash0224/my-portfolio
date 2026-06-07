"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  MotionValue,
} from "framer-motion";

// ── Types ───────────────────────────────────────────────────────────────────

interface Stat {
  value: string;
  label: string;
}

interface Tag {
  text: string;
  color: string;
}

// ── Data ────────────────────────────────────────────────────────────────────

const STATS: Stat[] = [
  { value: "2+", label: "Years Building" },
  { value: "5+", label: "Projects Shipped" },
  { value: "3+", label: "Tech Stacks" },
  { value: "∞", label: "Cups of Coffee" },
];

const TAGS: Tag[] = [
  { text: "Full Stack", color: "#7a8895" },
  { text: "AI/ML", color: "#7a8895" },
  { text: "Backend Systems", color: "#7a8895" },
  { text: "React / Next.js", color: "#7a8895" },
  { text: "TypeScript", color: "#7a8895" },
  { text: "Python", color: "#7a8895" },
];

// ── Video background URL ─────────────────────────────────────────────────────

const ABOUT_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4";

// ── Spring config presets ────────────────────────────────────────────────────

const SPRING_SOFT = { stiffness: 40, damping: 18, mass: 1 };
const SPRING_MED = { stiffness: 60, damping: 22, mass: 1 };
const SPRING_CRISP = { stiffness: 100, damping: 28, mass: 0.8 };

// ── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ value, label, delay }: Stat & { delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center sm:items-start"
    >
      <span
        className="font-black leading-none"
        style={{
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          background: "linear-gradient(135deg, #D7E2EA 0%, #B600A8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {value}
      </span>
      <span
        className="mt-1 text-xs uppercase tracking-widest font-medium"
        style={{ color: "#a0b0c0" }}
      >
        {label}
      </span>
    </motion.div>
  );
}

// ── Tag pill ─────────────────────────────────────────────────────────────────

function TagPill({ text, delay }: Tag & { delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 12, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3, scale: 1.06, transition: { duration: 0.2 } }}
      className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest cursor-default select-none"
      style={{
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.14)",
        color: "#b0c8dc",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {text}
    </motion.span>
  );
}

// ── Glowing divider ──────────────────────────────────────────────────────────

function GlowLine({ delay }: { delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={inView ? { scaleX: 1, opacity: 1 } : {}}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: "center" }}
      className="w-full h-px my-8"
    >
      <div
        style={{
          width: "100%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, #B600A8 30%, #7621B0 70%, transparent 100%)",
          boxShadow: "0 0 12px #B600A870",
        }}
      />
    </motion.div>
  );
}

// ── Parallax text reveal ──────────────────────────────────────────────────────

function ParallaxReveal({
  children,
  delay = 0,
  depth = 30,
  scrollYProgress,
  outputRange,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  depth?: number;
  scrollYProgress: MotionValue<number>;
  outputRange?: [number, number];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const range = outputRange ?? [-depth, depth];
  const rawY = useTransform(scrollYProgress, [0, 1], range);
  const y = useSpring(rawY, SPRING_SOFT);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, y: depth * 0.8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Main About Section ────────────────────────────────────────────────────────

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // Start parallax only when section top reaches 80% down the viewport
    // so nothing bleeds into the hero above
    offset: ["start 80%", "end start"],
  });

  // ── Layer 0: Video — slowest parallax ──
  const rawVideoY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const videoY = useSpring(rawVideoY, SPRING_SOFT);

  // ── Layer 1: Ghost heading — mid-slow ──
  const rawLabelY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const labelY = useSpring(rawLabelY, SPRING_MED);

  // ── Layer 2: Overlay gradient opacity pulse ──
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.75, 0.65, 0.70, 0.88]
  );

  // ── Layers 3-5: Content elements at progressively faster speeds ──
  const eyebrowY = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const headingY = useTransform(scrollYProgress, [0, 1], [-16, 16]);
  const bioY = useTransform(scrollYProgress, [0, 1], [-22, 22]);
  const tagsY = useTransform(scrollYProgress, [0, 1], [-28, 28]);
  const statsY = useTransform(scrollYProgress, [0, 1], [-32, 32]);

  const eyebrowYSpring = useSpring(eyebrowY, SPRING_CRISP);
  const headingYSpring = useSpring(headingY, SPRING_CRISP);
  const bioYSpring = useSpring(bioY, SPRING_CRISP);
  const tagsYSpring = useSpring(tagsY, SPRING_MED);
  const statsYSpring = useSpring(statsY, SPRING_MED);

  // ── Subtle horizontal drift on the ghost label ──
  const labelX = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const labelXSpring = useSpring(labelX, SPRING_SOFT);

  return (
    <>
    {/* Outer clip wrapper — prevents transform overflow bleeding into the hero */}
    <div style={{ overflow: "hidden", position: "relative", isolation: "isolate" }}>
    <motion.section
      id="about"
      ref={sectionRef}
      style={{
        fontFamily: "'Kanit', sans-serif",
        paddingTop: "clamp(110px, 15vw, 200px)",
        paddingBottom: "clamp(110px, 15vw, 200px)",
      }}
      className="relative w-full overflow-hidden"
      aria-label="About section"
    >

      {/* ── Layer 0: Video background (slowest parallax) ── */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ y: videoY }}
        aria-hidden="true"
      >
        <video
          src={ABOUT_VIDEO_URL}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "120%",
            objectFit: "cover",
            display: "block",
            marginTop: "-10%",
          }}
        />
      </motion.div>

      {/* ── Layer 1: Gradient overlay (opacity-animated) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: overlayOpacity }}
        aria-hidden="true"
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(12,12,12,0.88) 0%, rgba(12,12,12,0.65) 35%, rgba(12,12,12,0.72) 65%, rgba(12,12,12,0.94) 100%)",
          }}
        />
        {/* Purple vignette corners */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(12,12,12,0.6) 100%)",
          }}
        />
      </motion.div>

      {/* ── Layer 2: Ghost heading — mid-parallax ── */}
      <motion.div
        style={{ y: labelY, x: labelXSpring }}
        className="absolute top-6 left-1/2 -translate-x-1/2 z-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-black uppercase tracking-[0.45em] whitespace-nowrap"
          style={{
            fontSize: "clamp(5rem, 16vw, 14rem)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.035)",
          }}
        >
          About
        </span>
      </motion.div>

      {/* ── Layer 3: Content — fastest parallax (stays closest to viewer) ── */}
      <div
        className="relative z-10 mx-auto flex flex-col items-center text-center"
        style={{
          maxWidth: "860px",
          padding: "0 clamp(24px, 6vw, 80px)",
          fontFamily: "'Kanit', sans-serif",
        }}
      >
        {/* Eyebrow */}
        <motion.div style={{ y: eyebrowYSpring }}>
          <ParallaxReveal
            delay={0}
            depth={20}
            scrollYProgress={scrollYProgress}
            outputRange={[-14, 14]}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  transformOrigin: "right",
                  width: 36,
                  height: 2,
                  background: "linear-gradient(90deg, #B600A8, #7621B0)",
                }}
              />
              <span
                className="text-xs uppercase tracking-[0.32em] font-semibold"
                style={{ color: "#B600A8" }}
              >
                About Me
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  transformOrigin: "left",
                  width: 36,
                  height: 2,
                  background: "linear-gradient(270deg, #B600A8, #7621B0)",
                }}
              />
            </div>
          </ParallaxReveal>
        </motion.div>

        {/* Heading */}
        <motion.div style={{ y: headingYSpring }}>
          <ParallaxReveal
            delay={0.1}
            depth={32}
            scrollYProgress={scrollYProgress}
            outputRange={[-22, 22]}
          >
            <h2
              className="font-black uppercase leading-tight"
              style={{
                fontSize: "clamp(2.4rem, 6.5vw, 5rem)",
                background: "linear-gradient(180deg, #D7E2EA 0%, #8a9db5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "1.5rem",
              }}
            >
              Crafting Code&nbsp;
              <span
                style={{
                  background:
                    "linear-gradient(123deg, #B600A8 0%, #7621B0 60%, #BE4C00 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                That Ships
              </span>
            </h2>
          </ParallaxReveal>
        </motion.div>

        {/* Bio */}
        <motion.div style={{ y: bioYSpring }} className="w-full">
          <ParallaxReveal
            delay={0.18}
            depth={26}
            scrollYProgress={scrollYProgress}
            outputRange={[-18, 18]}
          >
            <p
              className="font-light leading-relaxed mb-4"
              style={{
                color: "#a0b4c8",
                fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
                maxWidth: "680px",
                margin: "0 auto 1rem",
              }}
            >
              I&apos;m <strong style={{ color: "#D7E2EA" }}>Om Prakash Samal</strong>, a
              Computer Science undergraduate with a sharp focus on building
              full-stack systems where AI meets real-world product thinking.
            </p>
          </ParallaxReveal>

          <ParallaxReveal
            delay={0.26}
            depth={26}
            scrollYProgress={scrollYProgress}
            outputRange={[-16, 16]}
          >
            <p
              className="font-light leading-relaxed"
              style={{
                color: "#a0b4c8",
                fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
                maxWidth: "680px",
                margin: "0 auto",
              }}
            >
              Whether it&apos;s architecting backend pipelines, deploying ML models,
              or obsessing over pixel-perfect frontends — I care deeply about
              code that is clean, production-grade, and actually ships on time.
            </p>
          </ParallaxReveal>
        </motion.div>

        <GlowLine delay={0.32} />

        {/* Tags */}
        <motion.div style={{ y: tagsYSpring }} className="w-full">
          <ParallaxReveal
            delay={0.38}
            depth={22}
            scrollYProgress={scrollYProgress}
            outputRange={[-14, 14]}
          >
            <div className="flex flex-wrap justify-center gap-2.5 mb-12">
              {TAGS.map((tag, i) => (
                <TagPill key={tag.text} {...tag} delay={0.42 + i * 0.06} />
              ))}
            </div>
          </ParallaxReveal>
        </motion.div>

        {/* Stats */}
        <motion.div style={{ y: statsYSpring }} className="w-full">
          <ParallaxReveal
            delay={0.46}
            depth={18}
            scrollYProgress={scrollYProgress}
            outputRange={[-12, 12]}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 w-full">
              {STATS.map((stat, i) => (
                <StatCard key={stat.label} {...stat} delay={0.5 + i * 0.1} />
              ))}
            </div>
          </ParallaxReveal>
        </motion.div>
      </div>
    </motion.section>
    </div>
    </>
  );
}
