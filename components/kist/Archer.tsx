"use client";

import { useEffect, useRef, useState } from "react";

interface ArcherProps {
  isAttacking: boolean;
  onAttackComplete: () => void;
  onArrowImpact: () => void;
}

const ATTACK_FRAMES = 16;
const ATTACK_FRAME_MS = 80;
const ARROW_RELEASE_FRAME = 8;
const FRAME_PX = 192;
const SHEET_W = ATTACK_FRAMES * FRAME_PX; // 3072

const SHEET =
  "/assets/heroes/archer/Spritesheets/archer_attack_arrow_basic-Sheet.png";

export default function Archer({
  isAttacking,
  onAttackComplete,
  onArrowImpact,
}: ArcherProps) {
  const [frame, setFrame] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!isAttacking) {
      setFrame(0);
      return;
    }
    let f = 0;
    setFrame(0);
    intervalRef.current = setInterval(() => {
      f += 1;
      if (f === ARROW_RELEASE_FRAME) onArrowImpact();
      if (f >= ATTACK_FRAMES) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setFrame(0);
        onAttackComplete();
        return;
      }
      setFrame(f);
    }, ATTACK_FRAME_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAttacking]);

  return (
    <div
      aria-hidden
      className="pixel"
      style={{
        width: FRAME_PX,
        height: FRAME_PX,
        backgroundImage: `url('${SHEET}')`,
        backgroundSize: `${SHEET_W}px ${FRAME_PX}px`,
        backgroundPosition: `${-frame * FRAME_PX}px 0px`,
        backgroundRepeat: "no-repeat",
        imageRendering: "pixelated",
        flexShrink: 0,
        alignSelf: "flex-end",
        filter: isAttacking
          ? undefined
          : "drop-shadow(0 0 8px rgba(100,200,100,0.4))",
      }}
    />
  );
}
