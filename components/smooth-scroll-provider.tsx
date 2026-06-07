"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.6,
      infinite: false,
    });

    // Use a ref-like variable to track the latest RAF ID
    // so cleanup always cancels the correct frame
    let currentRafId: number;

    function raf(time: number) {
      lenis.raf(time);
      currentRafId = requestAnimationFrame(raf);
    }
    currentRafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(currentRafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
