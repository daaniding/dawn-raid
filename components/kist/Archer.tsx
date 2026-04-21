"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

interface ArcherProps {
  isAttacking: boolean;
  onAttackComplete: () => void;
  onArrowImpact: () => void;
}

export default function Archer({
  isAttacking,
  onAttackComplete,
  onArrowImpact,
}: ArcherProps) {
  const [frame, setFrame] = useState(0);
  const [useAttackSheet, setUseAttackSheet] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isAttacking) {
      setUseAttackSheet(true);
      setFrame(0);
      let f = 0;
      intervalRef.current = setInterval(() => {
        f++;
        setFrame(f);
        if (f === 8) onArrowImpact();
        if (f >= 15) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setFrame(0);
          setUseAttackSheet(false);
          onAttackComplete();
        }
      }, 80);
    } else {
      setUseAttackSheet(false);
      setFrame(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAttacking]);

  const SCALE = 6;
  const FRAME_SIZE = 32;
  const RENDERED = FRAME_SIZE * SCALE; // 192px

  const idleStyle: CSSProperties = {
    width: RENDERED,
    height: RENDERED,
    backgroundImage: "url('/assets/heroes/archer/archer_idle.png')",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    imageRendering: "pixelated",
    flexShrink: 0,
  };

  const attackStyle: CSSProperties = {
    width: RENDERED,
    height: RENDERED,
    backgroundImage:
      "url('/assets/heroes/archer/Spritesheets/archer_attack_arrow_basic-Sheet.png')",
    backgroundSize: "1600% 100%",
    backgroundPosition: `${(frame / 15) * 100}% 0%`,
    backgroundRepeat: "no-repeat",
    imageRendering: "pixelated",
    flexShrink: 0,
  };

  return <div style={useAttackSheet ? attackStyle : idleStyle} />;
}
