"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { BackgroundPaths } from "./ui/background-paths";
import { BlurFade } from "./ui/blur-fade";
import { ContactPopover } from "./ui/popover-1";

// LinkedIn icon — using inline SVG (lucide-react version may not export it)
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// GitHub icon removed from lucide-react — using inline SVG
const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.625-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

// ── Types ──────────────────────────────────────────────────────────────────────

interface NavLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: React.ElementType;
  href: string;
  label: string;
}

// ── Sub-components ─────────────────────────────────────────────────────────────

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-sm font-medium tracking-widest uppercase transition-opacity hover:opacity-70 duration-200"
    style={{ color: "#D7E2EA" }}
  >
    {children}
  </a>
);

const SocialIcon = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="transition-opacity hover:opacity-70 duration-200"
    style={{ color: "#D7E2EA" }}
  >
    <Icon className="h-5 w-5" />
  </a>
);

// ── Magnet component ───────────────────────────────────────────────────────────

function Magnet({
  children,
  padding = 150,
  strength = 3,
}: {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate3d(0,0,0)");
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = Math.max(rect.width, rect.height) / 2 + padding;

      if (dist < maxDist) {
        setActive(true);
        setTransform(`translate3d(${dx / strength}px, ${dy / strength}px, 0)`);
      } else {
        setActive(false);
        setTransform("translate3d(0,0,0)");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [padding, strength]);

  return (
    <div
      ref={ref}
      style={{
        transform,
        transition: active
          ? "transform 0.3s ease-out"
          : "transform 0.6s ease-in-out",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

// ── ContactButton ──────────────────────────────────────────────────────────────

function ContactButton() {
  return (
    <a
      href="mailto:omprakashsamal75@gmail.com"
      className="rounded-full font-medium uppercase tracking-widest text-white text-xs sm:text-sm md:text-base px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 transition-opacity hover:opacity-90 duration-200"
      style={{
        background:
          "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
        boxShadow:
          "0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1",
        outline: "2px solid white",
        outlineOffset: "-3px",
      }}
    >
      Contact Me
    </a>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────────

const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
];

const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: GithubIcon,
    href: "https://github.com/omprakash0224",
    label: "GitHub",
  },
  {
    icon: LinkedinIcon,
    href: "https://www.linkedin.com/in/iamomprakashsamal/",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:omprakashsamal75@gmail.com",
    label: "Email",
  },
  {
    icon: Phone,
    href: "tel:+919599123790",
    label: "Phone",
  },
];

const PORTRAIT_SRC =
  "https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png";

// ── FadeIn wrapper ─────────────────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Hero Section ───────────────────────────────────────────────────────────────

export function MinimalistHero() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section
      id="hero"
      className="relative flex h-screen w-full flex-col overflow-hidden"
      style={{
        background: "#0C0C0C",
        fontFamily: "'Kanit', sans-serif",
        overflowX: "clip",
      }}
    >
      {/* ── Animated path background ── */}
      <BackgroundPaths />

      {/* ── Navbar ── */}
      <FadeIn delay={0} y={-20} className="z-30">
        <nav
          className="flex w-full items-center justify-between px-6 md:px-10 pt-6 md:pt-8"
          aria-label="Main navigation"
        >
          {/* Logo / Name */}
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Om Prakash logo"
              width={28}
              height={28}
              className="object-contain"
            />
            <span
              className="text-base font-bold tracking-widest uppercase"
              style={{ color: "#D7E2EA" }}
            >
              Om Prakash
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.label} href={link.href}>
                {link.label}
              </NavLink>
            ))}
            <ContactPopover />
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex flex-col gap-1.5 md:hidden"
            aria-label="Open menu"
            onClick={() => setMenuOpen((p) => !p)}
          >
            <span className="block h-0.5 w-6 bg-[#D7E2EA]" />
            <span className="block h-0.5 w-6 bg-[#D7E2EA]" />
            <span className="block h-0.5 w-5 bg-[#D7E2EA]" />
          </button>
        </nav>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div
            className="md:hidden flex flex-col gap-4 px-6 pt-4 pb-6"
            style={{ background: "#0C0C0C" }}
          >
            {NAV_LINKS.map((link) => (
              <NavLink key={link.label} href={link.href}>
                {link.label}
              </NavLink>
            ))}
            <ContactPopover />
          </div>
        )}
      </FadeIn>

      {/* ── Hero Heading — mobile (BlurFade) ── */}
      <div className="md:hidden mt-10 px-6 z-20">
        <BlurFade delay={0.2} duration={0.7} yOffset={20} blur="12px">
          <p className="text-sm font-semibold uppercase tracking-[0.25em]" style={{ color: "#9CA3AF" }}>
            Hi, I'm
          </p>
        </BlurFade>
        <BlurFade delay={0.35} duration={0.8} yOffset={24} blur="14px" as="h1">
          <span
            className="hero-heading block font-black uppercase tracking-tight leading-none"
            style={{ fontSize: "clamp(3.75rem, 22vw, 7rem)" }}
          >
            Om
          </span>
        </BlurFade>
      </div>

      {/* ── Hero Heading — desktop ── */}
      <div className="hidden md:block md:-mt-5 px-4 sm:px-6 overflow-hidden">
        <FadeIn delay={0.15} y={40}>
          <h1
            className="hero-heading font-black uppercase tracking-tight leading-none w-full whitespace-nowrap"
            style={{
              fontSize: "clamp(3.5rem, 17.5vw, 22rem)",
            }}
          >
            Hi, i&apos;m om
          </h1>
        </FadeIn>
      </div>

      {/* ── Bottom bar ── */}
      <div className="mt-auto flex w-full items-end justify-between pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 z-20">
        {/* Left descriptor text */}
        <FadeIn delay={0.35} y={20}>
          <p
            className="font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{
              color: "#D7E2EA",
              fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)",
            }}
          >
            an AI full-stack developer driven by building clean, production-grade
            systems that actually ship
          </p>
        </FadeIn>

        {/* Right contact button */}
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      {/* ── Footer social + location ── */}
      <div
        className="z-30 flex w-full items-center justify-between px-6 md:px-10 pb-4"
        style={{ color: "#D7E2EA" }}
      >
        <FadeIn delay={0.65} y={20} className="flex items-center gap-5">
          {SOCIAL_LINKS.map((link) => (
            <SocialIcon key={link.label} href={link.href} icon={link.icon} label={link.label} />
          ))}
        </FadeIn>

        <FadeIn
          delay={0.7}
          y={20}
          className="text-sm font-medium"
        >
          <span style={{ color: "#D7E2EA", fontSize: "0.875rem", fontWeight: 500 }}>
            📍 Gurugram, Haryana
          </span>
        </FadeIn>
      </div>
    </section>
  );
}
