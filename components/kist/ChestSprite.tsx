"use client";

type Props = {
  src: string;
  row: number; // 0..7
  col: number; // 0..4
  glowColor: string;
  progress: number; // 0..1
  shakeKey?: number; // bump to retrigger tap-shake
  bigShake?: boolean;
  onClick?: () => void;
};

export default function ChestSprite({
  src,
  row,
  col,
  glowColor,
  progress,
  shakeKey,
  bigShake,
  onClick,
}: Props) {
  const baseGlow = 8 + 12 * progress;
  const maxGlow = 16 + 24 * progress;
  const glowDuration = Math.max(0.4, 2 - 1.2 * progress);

  const bgX = col * 25;
  const bgY = (row * 100) / 7;

  return (
    // Outer wrapper drives the always-running glow (filter animation).
    <div
      style={
        {
          width: 288,
          height: 192,
          animation: `chest-glow ${glowDuration}s ease-in-out infinite`,
          ["--chest-base-glow" as string]: `${baseGlow}px`,
          ["--chest-max-glow" as string]: `${maxGlow}px`,
          ["--chest-glow-color" as string]: glowColor,
        } as React.CSSProperties
      }
    >
      {/* Inner element drives shake transforms (retriggered via key). */}
      <button
        key={bigShake ? "big" : `tap-${shakeKey ?? 0}`}
        type="button"
        onClick={onClick}
        aria-label="Open chest"
        className="pixel"
        style={{
          width: "100%",
          height: "100%",
          padding: 0,
          border: "none",
          background: "none",
          cursor: onClick ? "pointer" : "default",
          backgroundImage: `url("${src}")`,
          backgroundSize: "500% 800%",
          backgroundPosition: `${bgX}% ${bgY}%`,
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
          animation: bigShake
            ? "big-shake 400ms ease-in-out"
            : shakeKey && shakeKey > 0
              ? "tap-shake 200ms ease-in-out"
              : undefined,
        }}
      />
    </div>
  );
}
