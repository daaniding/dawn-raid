"use client";

import { useEffect, useState } from "react";

export default function ChestSlotSprite({
  type,
  animated = true,
  isReady = false,
}: {
  type: string;
  animated?: boolean;
  isReady?: boolean;
}) {
  const [frame, setFrame] = useState(0);

  const rowMap: Record<string, number> = {
    bronze: 0,
    silver: 2,
    epic: 4,
    legendary: 6,
  };
  const row = rowMap[type] ?? 0;
  const bgX = (frame / 4) * 100;
  const bgY = (row / 7) * 100;

  useEffect(() => {
    if (!animated) return;
    let f = 0;
    const interval = setInterval(() => {
      setFrame(f);
      f = (f + 1) % 5;
    }, 220);
    return () => clearInterval(interval);
  }, [animated]);

  return (
    <div
      aria-hidden
      style={{
        width: "96px",
        height: "64px",
        backgroundImage:
          "url('/assets/chests/Animated%20Chests/Chests.png')",
        backgroundSize: "500% 800%",
        backgroundPosition: `${bgX}% ${bgY}%`,
        backgroundRepeat: "no-repeat",
        imageRendering: "pixelated",
        margin: "0 auto",
        filter: isReady
          ? "drop-shadow(0 0 8px rgba(255, 215, 0, 0.8))"
          : "brightness(1.2)",
      }}
    />
  );
}
