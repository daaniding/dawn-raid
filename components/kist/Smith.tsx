"use client";

import { useEffect, useState } from "react";

type ChestType = "bronze" | "silver" | "epic" | "legendary";
type ChestSize = "small" | "medium" | "large" | "mega";

type Props = {
  chestType: ChestType;
  chestSize: ChestSize;
  chestFrame: number;
  chestRow: number;
  isAttacking: boolean;
  onAttackComplete: () => void;
  onHammerImpact: () => void;
  chestShakeKey?: number;
  chestRef?: (el: HTMLDivElement | null) => void;
};

const SMITH_SHEET =
  "/assets/npcs/other/spritesheet%20format/smith_no_anvil.png";
const CHEST_SHEET =
  "/assets/chests/Animated%20Chests/Chests.png";

const SMITH_FRAMES = 5;
const IDLE_MS = 180;
const ATTACK_MS = 80;
const IMPACT_FRAME = 2;

const CHEST_SCALE: Record<ChestSize, number> = {
  small: 1.8,
  medium: 2.4,
  large: 3.0,
  mega: 3.8,
};

export default function Smith({
  chestSize,
  chestFrame,
  chestRow,
  isAttacking,
  onAttackComplete,
  onHammerImpact,
  chestShakeKey = 0,
  chestRef,
}: Props) {
  const [smithFrame, setSmithFrame] = useState(0);

  // Idle loop or attack burst
  useEffect(() => {
    if (isAttacking) {
      let i = 0;
      setSmithFrame(0);
      const id = window.setInterval(() => {
        i++;
        if (i === IMPACT_FRAME) onHammerImpact();
        if (i >= SMITH_FRAMES) {
          window.clearInterval(id);
          setSmithFrame(0);
          onAttackComplete();
          return;
        }
        setSmithFrame(i);
      }, ATTACK_MS);
      return () => window.clearInterval(id);
    }
    setSmithFrame(0);
    const id = window.setInterval(() => {
      setSmithFrame((f) => (f + 1) % SMITH_FRAMES);
    }, IDLE_MS);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAttacking]);

  const smithBgX = (smithFrame * 100) / (SMITH_FRAMES - 1);
  const chestBgX = (chestFrame * 100) / 4;
  const chestBgY = (chestRow * 100) / 7;
  const scale = CHEST_SCALE[chestSize];

  return (
    <div style={{ position: "relative", width: 128, height: 128 }}>
      {/* Smith (anvil already stripped from source) */}
      <div
        aria-hidden
        className="pixel"
        style={{
          position: "relative",
          width: 128,
          height: 128,
          zIndex: 1,
          backgroundImage: `url("${SMITH_SHEET}")`,
          backgroundSize: "500% 100%",
          backgroundPosition: `${smithBgX}% 0%`,
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
          filter: "drop-shadow(0 0 6px rgba(255, 179, 71, 0.3))",
        }}
      />

      {/* Chest placed where the anvil used to be */}
      {/* Outer div owns the size scale + transition; inner div owns the shake so they don't fight. */}
      <div
        ref={chestRef}
        style={{
          position: "absolute",
          bottom: 4,
          left: 2,
          width: 48,
          height: 32,
          zIndex: 2,
          transformOrigin: "center bottom",
          transform: `scale(${scale})`,
          transition:
            "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <div
          key={`tap-${chestShakeKey}`}
          className="pixel"
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url("${CHEST_SHEET}")`,
            backgroundSize: "500% 800%",
            backgroundPosition: `${chestBgX}% ${chestBgY}%`,
            backgroundRepeat: "no-repeat",
            imageRendering: "pixelated",
            animation:
              chestShakeKey > 0
                ? "tap-shake 200ms ease-in-out"
                : undefined,
          }}
        />
      </div>
    </div>
  );
}
