'use client';

import React, { useRef } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';

// ── Ease ──────────────────────────────────────────────────────────────────────

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

// ── Types ─────────────────────────────────────────────────────────────────────

interface Step {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  image: string;
  accent: string;
  accentAlt: string;
  icon: React.ReactNode;
}

// ── Step Data ─────────────────────────────────────────────────────────────────

const STEPS: Step[] = [
  {
    step: '01',
    title: 'Discovery',
    subtitle: 'Understand Before You Build',
    description:
      'Every great product starts with deep listening. I dig into your goals, users, constraints, and competitive landscape — translating ambiguous ideas into a clear problem statement with measurable success criteria.',
    details: [
      'Stakeholder interviews & goal alignment',
      'User research & pain-point mapping',
      'Technical feasibility & risk assessment',
      'Defining scope & success metrics',
    ],
    image:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=80&auto=format&fit=crop',
    accent: '#7621B0',
    accentAlt: '#B600A8',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="26"
        height="26"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Design',
    subtitle: 'Architecture Meets Aesthetics',
    description:
      'With clarity in hand, I architect both the system and the interface. From database schemas and API contracts to component trees and interaction flows — every decision is intentional and documented.',
    details: [
      'System architecture & data modeling',
      'UI/UX wireframing & component design',
      'API contract definition',
      'Tech stack selection & trade-off analysis',
    ],
    image:
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=900&q=80&auto=format&fit=crop',
    accent: '#B600A8',
    accentAlt: '#BE4C00',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="26"
        height="26"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Build',
    subtitle: 'Ship Fast, Ship Right',
    description:
      'Execution with precision. I write clean, typed, and tested code — iterating rapidly through focused sprints. CI/CD pipelines keep quality gates high while velocity stays uncompromised.',
    details: [
      'TypeScript-first, test-driven development',
      'Incremental delivery via CI/CD pipelines',
      'Performance optimization from day one',
      'Code reviews & documentation throughout',
    ],
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80&auto=format&fit=crop',
    accent: '#059669',
    accentAlt: '#0284c7',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="26"
        height="26"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    step: '04',
    title: 'Deliver',
    subtitle: 'Launch & Scale With Confidence',
    description:
      'Deployment is not the finish line — it is the starting gun. I set up observability, performance monitoring, and handoff documentation so the product evolves gracefully long after launch.',
    details: [
      'Production deployment & infrastructure setup',
      'Observability: logs, metrics, alerts',
      'Handoff docs & knowledge transfer',
      'Iteration roadmap & post-launch support',
    ],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop',
    accent: '#BE4C00',
    accentAlt: '#7621B0',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="26"
        height="26"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

// ── Section Heading ───────────────────────────────────────────────────────────

function SectionHeading() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="flex flex-col items-center mb-24 relative z-10">
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
            transformOrigin: 'right',
            width: 36,
            height: 2,
            background: 'linear-gradient(90deg, #B600A8, #7621B0)',
          }}
        />
        <span
          className="text-xs uppercase tracking-[0.32em] font-semibold"
          style={{ color: '#B600A8', fontFamily: "'Kanit', sans-serif" }}
        >
          My Process
        </span>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE_EXPO }}
          style={{
            transformOrigin: 'left',
            width: 36,
            height: 2,
            background: 'linear-gradient(270deg, #B600A8, #7621B0)',
          }}
        />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
        animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease: EASE_EXPO }}
        className="font-black uppercase leading-tight text-center"
        style={{
          fontFamily: "'Kanit', sans-serif",
          fontSize: 'clamp(2.4rem, 6.5vw, 5rem)',
          background: 'linear-gradient(180deg, #D7E2EA 0%, #8a9db5 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '1rem',
        }}
      >
        How I{' '}
        <span
          style={{
            background:
              'linear-gradient(123deg, #B600A8 0%, #7621B0 60%, #BE4C00 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Work
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.28, ease: EASE_EXPO }}
        className="text-center font-light"
        style={{
          color: '#7a8f9e',
          fontSize: 'clamp(0.88rem, 1.4vw, 1rem)',
          maxWidth: 540,
          fontFamily: "'Kanit', sans-serif",
          letterSpacing: '0.02em',
        }}
      >
        A systematic workflow built for clarity, velocity, and trust — from
        first conversation to production launch.
      </motion.p>
    </div>
  );
}

// ── Connector ─────────────────────────────────────────────────────────────────

function Connector({ inView }: { inView: boolean }) {
  return (
    <div className="flex flex-col items-center py-3">
      <motion.div
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.55, ease: EASE_EXPO }}
        style={{
          transformOrigin: 'top',
          width: 1,
          height: 72,
          background: 'linear-gradient(to bottom, #7621B0, transparent)',
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.75, ease: EASE_EXPO }}
        className="flex items-center justify-center rounded-full"
        style={{
          width: 26,
          height: 26,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#7621B0"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.6, ease: EASE_EXPO }}
        style={{
          transformOrigin: 'top',
          width: 1,
          height: 72,
          background: 'linear-gradient(to bottom, #B600A840, transparent)',
        }}
      />
    </div>
  );
}

// ── Step Card ─────────────────────────────────────────────────────────────────

function StepCard({ step, isLast }: { step: Step; isLast: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const imageY = useSpring(rawY, { stiffness: 40, damping: 18, mass: 1 });

  const isEven = parseInt(step.step) % 2 === 0;

  return (
    <div ref={cardRef} className="relative">
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.9, ease: EASE_EXPO }}
        className="relative overflow-hidden rounded-3xl"
        style={{
          display: 'flex',
          flexDirection: isEven ? 'row-reverse' : 'row',
          background: 'rgba(8, 8, 12, 0.85)',
          border: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow:
            '0 40px 100px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.03)',
        }}
      >
        {/* ── Image Panel ── */}
        <div
          className="relative overflow-hidden flex-shrink-0"
          style={{ width: '420px', minHeight: '340px' }}
        >
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: isEven
                ? 'linear-gradient(to left, rgba(8,8,12,0.95) 0%, rgba(8,8,12,0.25) 55%, transparent 100%)'
                : 'linear-gradient(to right, rgba(8,8,12,0.95) 0%, rgba(8,8,12,0.25) 55%, transparent 100%)',
            }}
          />
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: `linear-gradient(to top, ${step.accent}44 0%, transparent 60%)`,
            }}
          />
          <motion.div className="absolute inset-0" style={{ y: imageY }}>
            <img
              src={step.image}
              alt={`${step.title} workflow`}
              className="w-full h-full object-cover"
              style={{ transform: 'scale(1.15)' }}
            />
          </motion.div>
          {/* Watermark step number */}
          <div
            className="absolute bottom-3 pointer-events-none z-20 select-none"
            style={{
              [isEven ? 'left' : 'right']: '16px',
              fontFamily: "'Kanit', sans-serif",
              fontSize: 'clamp(4.5rem, 10vw, 8rem)',
              fontWeight: 900,
              color: 'transparent',
              WebkitTextStroke: `1px ${step.accent}50`,
              lineHeight: 1,
            }}
          >
            {step.step}
          </div>
        </div>

        {/* ── Content Panel ── */}
        <div
          className="flex flex-col justify-center flex-1 p-8 lg:p-12"
          style={{ fontFamily: "'Kanit', sans-serif" }}
        >
          {/* Icon + badge */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 20 : -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_EXPO }}
            className="flex items-center gap-3 mb-5"
          >
            <div
              className="flex items-center justify-center rounded-xl flex-shrink-0"
              style={{
                width: 50,
                height: 50,
                background: `linear-gradient(135deg, ${step.accent}22, ${step.accentAlt}18)`,
                border: `1px solid ${step.accent}40`,
                color: step.accent,
              }}
            >
              {step.icon}
            </div>
            <div>
              <div
                className="text-[10px] uppercase tracking-[0.3em] font-semibold"
                style={{ color: step.accent }}
              >
                Step {step.step}
              </div>
              <div
                className="text-[11px] uppercase tracking-[0.16em] font-medium mt-0.5"
                style={{ color: '#475569' }}
              >
                {step.subtitle}
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.22, ease: EASE_EXPO }}
            className="font-black uppercase leading-none mb-4"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              background: `linear-gradient(135deg, #D7E2EA 0%, ${step.accent} 130%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {step.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE_EXPO }}
            className="text-sm leading-[1.85] mb-7 font-light"
            style={{ color: '#94a3b8', maxWidth: 460 }}
          >
            {step.description}
          </motion.p>

          {/* Detail list */}
          <ul className="flex flex-col gap-2.5">
            {step.details.map((detail, di) => (
              <motion.li
                key={detail}
                initial={{ opacity: 0, x: -14 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.38 + di * 0.07,
                  ease: EASE_EXPO,
                }}
                className="flex items-center gap-3 text-sm"
                style={{ color: '#7a9ab5' }}
              >
                <span
                  className="inline-block flex-shrink-0 rounded-full"
                  style={{
                    width: 5,
                    height: 5,
                    background: `linear-gradient(135deg, ${step.accent}, ${step.accentAlt})`,
                    boxShadow: `0 0 6px ${step.accent}80`,
                  }}
                />
                <span style={{ letterSpacing: '0.01em' }}>{detail}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Accent border glow */}
        <div
          className="absolute top-0 bottom-0 w-[3px] pointer-events-none"
          style={{
            [isEven ? 'right' : 'left']: 0,
            background: `linear-gradient(to bottom, ${step.accent}90, ${step.accentAlt}40, transparent 70%)`,
            borderRadius: isEven ? '0 12px 12px 0' : '12px 0 0 12px',
          }}
        />
      </motion.div>

      {!isLast && <Connector inView={inView} />}
    </div>
  );
}

// ── Ghost Watermark ───────────────────────────────────────────────────────────

function GhostWatermark() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const x = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const xSpring = useSpring(x, { stiffness: 30, damping: 15, mass: 1 });

  return (
    <motion.div
      ref={ref}
      style={{ x: xSpring }}
      className="absolute top-12 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <span
        className="font-black uppercase whitespace-nowrap"
        style={{
          fontSize: 'clamp(5rem, 16vw, 14rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,255,255,0.025)',
          fontFamily: "'Kanit', sans-serif",
          letterSpacing: '0.12em',
        }}
      >
        Process
      </span>
    </motion.div>
  );
}

// ── Bottom CTA ────────────────────────────────────────────────────────────────

function BottomCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: 0.1, ease: EASE_EXPO }}
      className="mt-20 flex flex-col items-center gap-5 text-center"
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.2, ease: EASE_EXPO }}
        style={{
          transformOrigin: 'center',
          width: '100%',
          height: 1,
          background:
            'linear-gradient(90deg, transparent 0%, #B600A8 30%, #7621B0 70%, transparent 100%)',
          boxShadow: '0 0 12px #B600A870',
          marginBottom: '1.5rem',
        }}
      />
      <p
        className="font-light"
        style={{
          color: '#7a8f9e',
          fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
          maxWidth: 480,
          fontFamily: "'Kanit', sans-serif",
          letterSpacing: '0.02em',
        }}
      >
        Ready to build something together? Let&apos;s start with Discovery.
      </p>
      <motion.a
        href="#contact"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="inline-flex items-center gap-2.5 font-semibold uppercase tracking-[0.12em] px-8 py-3.5 rounded-full text-sm"
        style={{
          background: 'linear-gradient(135deg, #B600A8 0%, #7621B0 100%)',
          color: '#fff',
          fontFamily: "'Kanit', sans-serif",
          boxShadow:
            '0 8px 32px #B600A840, 0 0 0 1px rgba(255,255,255,0.08)',
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        Let&apos;s Talk
      </motion.a>
    </motion.div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────

export function HowIWorkSection() {
  return (
    <section
      id="how-i-work"
      className="relative w-full overflow-hidden"
      style={{
        background: '#000000',
        fontFamily: "'Kanit', sans-serif",
        paddingTop: 'clamp(110px, 15vw, 200px)',
        paddingBottom: 'clamp(110px, 15vw, 200px)',
      }}
      aria-label="How I work section"
    >
      {/* Ambient radial glows */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '-10%',
            width: '50%',
            height: '50%',
            background:
              'radial-gradient(ellipse at center, #7621B018 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '15%',
            right: '-8%',
            width: '45%',
            height: '45%',
            background:
              'radial-gradient(ellipse at center, #B600A814 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '45%',
            left: '30%',
            width: '40%',
            height: '30%',
            background:
              'radial-gradient(ellipse at center, #BE4C0010 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <GhostWatermark />

      <div
        className="relative z-10 mx-auto"
        style={{
          maxWidth: '1000px',
          padding: '0 clamp(20px, 5vw, 60px)',
        }}
      >
        <SectionHeading />
        <div className="flex flex-col">
          {STEPS.map((step, i) => (
            <StepCard key={step.step} step={step} isLast={i === STEPS.length - 1} />
          ))}
        </div>
        <BottomCTA />
      </div>
    </section>
  );
}

export default HowIWorkSection;
