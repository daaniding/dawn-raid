"use client";

import { useEffect, useRef, useState } from "react";

interface ArcherProps {
  isAttacking: boolean;
  onAttackComplete: () => void;
  onArrowImpact: () => void;
}

const SCALE = 6;
const SIZE = 32 * SCALE;
const TOTAL_FRAMES = 16;

export default function Archer({
  isAttacking,
  onAttackComplete,
  onArrowImpact,
}: ArcherProps) {
  const [attackFrame, setAttackFrame] = useState(0);
  const [showAttack, setShowAttack] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isAttacking) {
      let f = 0;
      setAttackFrame(0);
      setShowAttack(true);
      intervalRef.current = setInterval(() => {
        f++;
        setAttackFrame(f);
        if (f === 8) onArrowImpact();
        if (f >= TOTAL_FRAMES - 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setTimeout(() => {
            setShowAttack(false);
            setAttackFrame(0);
            onAttackComplete();
          }, 80);
        }
      }, 80);
    } else {
      setShowAttack(false);
      setAttackFrame(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAttacking]);

  return (
    <div
      style={{
        width: SIZE,
        height: SIZE,
        position: "relative",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/assets/heroes/archer/archer_idle.png')",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
          opacity: showAttack ? 0 : 1,
          filter: "drop-shadow(0 0 10px rgba(100,220,100,0.6))",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url('/assets/heroes/archer/Spritesheets/archer_attack_arrow_basic-Sheet.png')",
          backgroundSize: `${TOTAL_FRAMES * 100}% 100%`,
          backgroundPosition: `${(attackFrame / (TOTAL_FRAMES - 1)) * 100}% 0%`,
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
          opacity: showAttack ? 1 : 0,
          filter: "drop-shadow(0 0 10px rgba(100,220,100,0.6))",
        }}
      />
    </div>
  );
}
