"use client";

import { useEffect, useState } from "react";

type ChestType = "bronze" | "silver" | "epic" | "legendary";
type ChestSize = "small" | "medium" | "large" | "mega";

type Props = {
  isAttacking: boolean;
  onAttackComplete: () => void;
  onHammerImpact?: () => void;
  scale?: number;

  // Chest rendered on top of the anvil
  chestSrc?: string;
  chestType?: ChestType;
  chestSize?: ChestSize;
  chestRow?: number;
  chestCol?: number;
  chestShakeKey?: number;
  chestBigShake?: boolean;
  chestGlowRGB?: string; // e.g. "255, 215, 0"
  chestProgress?: number;
  chestRef?: (el: HTMLDivElement | null) => void;
};

const SHEET =
  "/assets/npcs/other/spritesheet%20format/smith_anvil-Sheet.png";
const FRAMES = 5;
const FRAME_W = 32;
const FRAME_H = 32;
const IMPACT_FRAME = 4;

const CHEST_ROW: Record<ChestType, number> = {
  bronze: 0,
  silver: 2,
  epic: 4,
  legendary: 6,
};

const CHEST_SCALE: Record<ChestSize, number> = {
  small: 2.0,
  medium: 2.8,
  large: 3.6,
  mega: 4.5,
};

// Anvil is in bottom-right of each 32×32 frame, roughly x=18-30, y=22-32.
// At scale 4 that's 48px wide × 40px tall, starting at left=72px, bottom=0.
// Center of anvil = 75% of smith width.
const ANVIL_LEFT = 72;
const ANVIL_WIDTH = 48;
const ANVIL_HEIGHT = 40;
const ANVIL_CENTER = "75%";

export default function Smith({
  isAttacking,
  onAttackComplete,
  onHammerImpact,
  scale = 4,
  chestSrc,
  chestType,
  chestSize = "small",
  chestRow,
  chestCol = 0,
  chestShakeKey = 0,
  chestBigShake = false,
  chestGlowRGB = "255, 179, 71",
  chestProgress = 0,
  chestRef,
}: Props) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!isAttacking) {
      setFrame(0);
      return;
    }
    let i = 0;
    setFrame(0);
    const id = window.setInterval(() => {
      i++;
      if (i === IMPACT_FRAME) onHammerImpact?.();
      if (i >= FRAMES) {
        window.clearInterval(id);
        setFrame(0);
        onAttackComplete();
        return;
      }
      setFrame(i);
    }, 60);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAttacking]);

  const smithBgX = (frame * 100) / (FRAMES - 1);
  const smithW = FRAME_W * scale;
  const smithH = FRAME_H * scale;

  // Chest visuals
  const showChest = chestSrc && chestType;
  const row = chestRow ?? (chestType ? CHEST_ROW[chestType] : 0);
  const chestScale = CHEST_SCALE[chestSize];
  const baseGlow = 8 + 12 * chestProgress;
  const maxGlow = 16 + 24 * chestProgress;
  const glowDuration = Math.max(0.4, 2 - 1.2 * chestProgress);

  return (
    <div
      style={{
        position: "relative",
        width: smithW,
        height: smithH,
      }}
    >
      {/* Smith sprite */}
      <div
        aria-hidden
        className="pixel"
        style={{
          position: "relative",
          width: smithW,
          height: smithH,
          zIndex: 1,
          backgroundImage: `url("${SHEET}")`,
          backgroundSize: `${FRAMES * 100}% 100%`,
          backgroundPosition: `${smithBgX}% 0`,
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
          filter: "drop-shadow(0 0 6px rgba(255, 179, 71, 0.3))",
        }}
      />

      {/* Cover the anvil so it sits behind the chest */}
      {showChest && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: 0,
            left: ANVIL_LEFT,
            width: ANVIL_WIDTH,
            height: ANVIL_HEIGHT,
            background: "#0d0600",
            zIndex: 2,
          }}
        />
      )}

      {/* Chest sitting on the anvil */}
      {showChest && (
        <div
          ref={chestRef}
          style={{
            position: "absolute",
            bottom: 0,
            left: ANVIL_CENTER,
            transform: `translateX(-50%) scale(${chestScale})`,
            transformOrigin: "center bottom",
            transition:
              "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            zIndex: 3,
          }}
        >
          <div
            style={
              {
                width: 48,
                height: 32,
                animation: `chest-glow ${glowDuration}s ease-in-out infinite`,
                ["--chest-base-glow" as string]: `${baseGlow}px`,
                ["--chest-max-glow" as string]: `${maxGlow}px`,
                ["--chest-glow-color" as string]: `rgba(${chestGlowRGB}, 0.8)`,
              } as React.CSSProperties
            }
          >
            <div
              key={chestBigShake ? "big" : `tap-${chestShakeKey}`}
              className="pixel"
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: `url("${chestSrc}")`,
                backgroundSize: "500% 800%",
                backgroundPosition: `${chestCol * 25}% ${(row * 100) / 7}%`,
                backgroundRepeat: "no-repeat",
                imageRendering: "pixelated",
                animation: chestBigShake
                  ? "big-shake 400ms ease-in-out"
                  : chestShakeKey > 0
                    ? "tap-shake 200ms ease-in-out"
                    : undefined,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
