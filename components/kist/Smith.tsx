"use client";

import { useEffect, useState } from "react";

interface SmithProps {
  chestType: "bronze" | "silver" | "epic" | "legendary";
  chestSize: "small" | "medium" | "large" | "mega";
  chestFrame: number;
  chestRow: number;
  isAttacking: boolean;
  onAttackComplete: () => void;
  onHammerImpact: () => void;
  chestShakeKey?: number;
  chestRef?: (el: HTMLDivElement | null) => void;
}

export default function Smith({
  chestSize,
  chestFrame,
  chestRow,
  isAttacking,
  onAttackComplete,
  onHammerImpact,
  chestShakeKey = 0,
  chestRef,
}: SmithProps) {
  const [smithFrame, setSmithFrame] = useState(0);

  const scaleMap = {
    small: 1.8,
    medium: 2.4,
    large: 3.2,
    mega: 4.0,
  } as const;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAttacking) {
      let f = 0;
      interval = setInterval(() => {
        setSmithFrame(f);
        if (f === 2) onHammerImpact();
        f++;
        if (f >= 5) {
          clearInterval(interval);
          setSmithFrame(0);
          onAttackComplete();
        }
      }, 80);
    } else {
      let f = 0;
      interval = setInterval(() => {
        setSmithFrame(f);
        f = (f + 1) % 5;
      }, 180);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAttacking]);

  const smithBgX = (smithFrame / 4) * 100;
  const chestBgX = (chestFrame / 4) * 100;
  const chestBgY = (chestRow / 7) * 100;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: "0px",
        transform: `scale(${scaleMap[chestSize]})`,
        transformOrigin: "center bottom",
        transition: "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        overflow: "visible",
      }}
    >
      {/* Smid sprite */}
      <div
        aria-hidden
        className="pixel"
        style={{
          width: "128px",
          height: "128px",
          backgroundImage:
            "url('/assets/npcs/other/spritesheet%20format/smith_no_anvil.png')",
          backgroundSize: "500% 100%",
          backgroundPosition: `${smithBgX}% 0%`,
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
          flexShrink: 0,
          overflow: "visible",
        }}
      />

      {/* Kist — same height as smid, shifted left so it touches the smid */}
      <div
        ref={chestRef}
        key={`tap-${chestShakeKey}`}
        className="pixel"
        style={{
          width: "128px",
          height: "128px",
          backgroundImage:
            "url('/assets/chests/Animated%20Chests/Chests.png')",
          backgroundSize: "500% 800%",
          backgroundPosition: `${chestBgX}% ${chestBgY}%`,
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
          flexShrink: 0,
          marginLeft: "-32px",
          alignSelf: "flex-end",
          animation:
            chestShakeKey > 0 ? "tap-shake 200ms ease-in-out" : undefined,
        }}
      />
    </div>
  );
}
