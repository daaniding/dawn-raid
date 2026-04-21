"use client";

import { useEffect, useRef, useState } from "react";

interface ArcherProps {
  isAttacking: boolean;
  onAttackComplete: () => void;
  onArrowImpact: () => void;
}

const SCALE = 6;
const SIZE = 32 * SCALE; // 192px
const TOTAL_ATTACK_FRAMES = 8;
const ARROW_RELEASE_FRAME = 4;

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
        if (f === ARROW_RELEASE_FRAME) onArrowImpact();
        if (f >= TOTAL_ATTACK_FRAMES - 1) {
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

  const bgXAttack = `${(attackFrame / (TOTAL_ATTACK_FRAMES - 1)) * 100}%`;

  return (
    <div
      style={{
        width: SIZE,
        height: SIZE,
        position: "relative",
        flexShrink: 0,
        imageRendering: "pixelated",
      }}
    >
      {/* Idle - altijd gerenderd, verborgen tijdens attack */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('/assets/heroes/archer/archer_idle.png')",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
          opacity: showAttack ? 0 : 1,
          filter: "drop-shadow(0 0 8px rgba(100,200,100,0.5))",
        }}
      />

      {/* Attack - altijd gerenderd, verborgen tijdens idle */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage:
            "url('/assets/heroes/archer/Spritesheets/archer_attack_no_arrow-Sheet.png')",
          backgroundSize: `${TOTAL_ATTACK_FRAMES * 100}% 100%`,
          backgroundPosition: `${bgXAttack} 0%`,
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
          opacity: showAttack ? 1 : 0,
          filter: "drop-shadow(0 0 8px rgba(100,200,100,0.5))",
        }}
      />
    </div>
  );
}
