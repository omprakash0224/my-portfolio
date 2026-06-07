'use client';

import { useTransform, motion, useScroll, MotionValue, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Boxes } from '@/components/ui/background-boxes';

// ── Ease ──────────────────────────────────────────────────────────────────────

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

// ── Project Data ──────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    title: 'PaperMind',
    subtitle: 'RAG Document Q&A Platform',
    description:
      'Production-grade RAG system with hybrid dense + BM25 sparse retrieval fused via Reciprocal Rank Fusion (RRF). Features per-user multi-tenant isolation, async PDF/DOCX ingestion with SHA-256 deduplication, and stateless Clerk RS256 JWT authentication for horizontal scaling.',
    stack: ['FastAPI', 'LangChain', 'Qdrant', 'Google Gemini', 'Next.js 15', 'Clerk', 'Upstash Redis'],
    github: 'https://github.com/omprakash0224/PaperMind',
    image: '/project-img/papermind.png',
    accentColor: '#7621B0',
  },
  {
    title: 'CerviCare',
    subtitle: 'AI-Powered Cancer Risk Prediction',
    description:
      'Conducted a 13-model ML research study, selecting a soft-voting ensemble of Random Forest, XGBoost, and LightGBM. Applied SMOTE within Stratified K-Fold CV to prevent data leakage and integrated SHAP TreeExplainer for clinical feature interpretability.',
    stack: ['FastAPI', 'React', 'scikit-learn', 'XGBoost', 'LightGBM', 'SHAP', 'Vite'],
    live: 'https://cervi-care-theta.vercel.app/',
    github: 'https://github.com/omprakash0224/CerviCare',
    image: '/project-img/cervicare.png',
    accentColor: '#B600A8',
  },
  {
    title: 'CreatextAI',
    subtitle: 'AI Content Generation SaaS',
    description:
      'Full-stack SaaS with 23+ AI content templates powered by Google Gemini, reducing content drafting time from hours to under 60 seconds. Integrated Razorpay subscription billing with a 2-tier credit system and Clerk authentication with route-level middleware.',
    stack: ['Next.js 15', 'TypeScript', 'Google Gemini', 'Clerk', 'PostgreSQL', 'Drizzle ORM', 'Razorpay'],
    live: 'https://creatextai.vercel.app/',
    github: 'https://github.com/omprakash0224/creatext-ai',
    image: '/project-img/creatextai.png',
    accentColor: '#BE4C00',
  },
  {
    title: 'Backend Ledger',
    subtitle: 'Financial Ledger REST API',
    description:
      'Production-grade double-entry ledger API using MongoDB ACID multi-document sessions for 100% atomic commits. Built a 5-rule pre-transaction fraud detection middleware and secured the API with stateless JWT, with full Swagger UI documentation.',
    stack: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'Swagger/OpenAPI', 'Nodemailer'],
    live: 'https://backend-ledger-tbxj.onrender.com/api/docs/',
    github: 'https://github.com/omprakash0224/Backend-Ledger',
    image: '/project-img/backendLedger.png',
    accentColor: '#059669',
  },
];

// ── Section Heading ───────────────────────────────────────────────────────────

function SectionHeading() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="flex flex-col items-center mb-20 relative z-10">
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
          Featured Work
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
        Selected{' '}
        <span
          style={{
            background: 'linear-gradient(123deg, #B600A8 0%, #7621B0 60%, #BE4C00 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Projects
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
          maxWidth: 520,
          fontFamily: "'Kanit', sans-serif",
          letterSpacing: '0.02em',
        }}
      >
        Production-grade systems — scroll to explore each project.
      </motion.p>
    </div>
  );
}

// ── Single Stacking Card ──────────────────────────────────────────────────────

interface CardProps {
  i: number;
  project: (typeof PROJECTS)[0];
  totalCards: number;
  scrollYProgress: MotionValue<number>;
}

function Card({ i, project, totalCards, scrollYProgress }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Each card occupies a 1/totalCards slice of the scroll range
  const segmentSize = 1 / totalCards;
  const start = i * segmentSize;
  const end = (i + 1) * segmentSize;

  // Card scales down starting when the NEXT card begins to scroll in
  const scaleEnd = 1 - (totalCards - 1 - i) * 0.06;
  const scale = useTransform(scrollYProgress, [start, end], [1, scaleEnd]);

  // Image subtle zoom in as card enters
  const { scrollYProgress: localProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  const imageScale = useTransform(localProgress, [0, 0.5], [1.1, 1]);
  const imageOpacity = useTransform(localProgress, [0, 0.15], [0, 1]);

  // Offset: each card stacks slightly higher than the previous
  const topOffset = i * 24;

  return (
    // This wrapper is 100vh tall and sticky — it creates the scroll "slot"
    <div
      ref={cardRef}
      className="sticky top-0 flex items-center justify-center"
      style={{ height: '100vh' }}
    >
      <motion.div
        style={{
          scale,
          top: topOffset,
          transformOrigin: 'top center',
          background: 'rgba(8, 8, 12, 0.88)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: `0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.06)`,
        }}
        className="relative flex flex-col md:flex-row w-[88%] max-w-5xl rounded-2xl overflow-hidden"
      >
        {/* ── Left: Content ── */}
        <div className="flex flex-col justify-between p-8 md:p-10 md:w-[45%] flex-shrink-0">
          <div>
            {/* Card index */}
            <div className="flex items-center gap-3 mb-5">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: project.accentColor }}
              />
              <span
                className="font-mono text-xs font-semibold tracking-[0.18em]"
                style={{ color: '#475569' }}
              >
                {String(i + 1).padStart(2, '0')} / {String(totalCards).padStart(2, '0')}
              </span>
              <div
                className="h-px flex-1"
                style={{ background: 'rgba(255,255,255,0.07)' }}
              />
            </div>

            {/* Title */}
            <h3
              className="font-black uppercase leading-none mb-2"
              style={{
                fontFamily: "'Kanit', sans-serif",
                fontSize: 'clamp(1.7rem, 3.5vw, 2.6rem)',
                color: '#F0F4F8',
                letterSpacing: '-0.01em',
              }}
            >
              {project.title}
            </h3>

            {/* Subtitle */}
            <p
              className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-6"
              style={{ color: '#64748b', fontFamily: "'Kanit', sans-serif" }}
            >
              {project.subtitle}
            </p>

            {/* Description */}
            <p
              className="text-sm leading-[1.8] mb-7"
              style={{ color: '#94a3b8', fontFamily: "'Kanit', sans-serif", fontWeight: 400 }}
            >
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5 mb-8">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#94a3b8',
                    fontFamily: "'Kanit', sans-serif",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full"
                style={{
                  background: '#F0F4F8',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#0a0a0e',
                  fontFamily: "'Kanit', sans-serif",
                  letterSpacing: '0.04em',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Live Demo
              </a>
            )}

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full"
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.14)',
                color: '#94a3b8',
                fontFamily: "'Kanit', sans-serif",
                letterSpacing: '0.04em',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>

        {/* ── Right: Screenshot ── */}
        <div className="relative flex-1 min-h-[240px] md:min-h-0 overflow-hidden">
          {/* Left fade blend */}
          <div
            className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, rgba(8,8,12,0.9), transparent)' }}
          />
          {/* Top vignette */}
          <div
            className="absolute top-0 left-0 right-0 h-16 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(8,8,12,0.6), transparent)' }}
          />

          <motion.div
            className="absolute inset-0"
            style={{ scale: imageScale, opacity: imageOpacity }}
          >
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              className="w-full h-full object-cover object-top"
            />
          </motion.div>

          {/* Accent color overlay glow at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none"
            style={{
              background: `linear-gradient(to top, ${project.accentColor}22, transparent)`,
            }}
          />
        </div>

        {/* Accent border glow on left edge */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl pointer-events-none"
          style={{ background: `linear-gradient(to bottom, ${project.accentColor}80, transparent 60%)` }}
        />
      </motion.div>
    </div>
  );
}

// ── Projects Section ──────────────────────────────────────────────────────────

export function ProjectsSection() {
  // The scroll container: must be tall enough for all card scroll slots
  // Each card gets 100vh, but they're sticky so we need a tall outer wrapper
  const stackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      className="relative w-full"
      style={{ background: '#000000', fontFamily: "'Kanit', sans-serif" }}
      aria-label="Projects section"
    >
      {/* Boxes background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Boxes />
      </div>

      {/* Section heading */}
      <div
        className="relative z-10 mx-auto"
        style={{
          maxWidth: '1100px',
          padding: '0 clamp(24px, 6vw, 80px)',
          paddingTop: 'clamp(110px, 15vw, 200px)',
          paddingBottom: '0',
        }}
      >
        <SectionHeading />
      </div>

      {/* 
        Stacking scroll container.
        Height = totalCards × 100vh so each card gets its own full-page scroll slot.
        Cards are sticky inside, so they pile up as you scroll.
      */}
      <div
        ref={stackRef}
        className="relative z-10"
        style={{ height: `${PROJECTS.length * 100}vh` }}
      >
        {PROJECTS.map((project, i) => (
          <Card
            key={project.title}
            i={i}
            project={project}
            totalCards={PROJECTS.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      {/* Bottom padding spacer */}
      <div className="relative z-10" style={{ height: 'clamp(60px, 8vw, 120px)' }} />
    </section>
  );
}

export default ProjectsSection;