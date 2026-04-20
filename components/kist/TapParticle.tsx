"use client";

type Props = {
  color: string;
  burstKey: number; // increment to re-run the burst
};

const BURST = Array.from({ length: 8 }, (_, i) => {
  const angle = (i / 8) * Math.PI * 2;
  const dist = 40 + ((i * 7) % 40);
  return {
    dx: Math.cos(angle) * dist,
    dy: Math.sin(angle) * dist,
    size: 3 + (i % 3),
  };
});

export default function TapParticle({ color, burstKey }: Props) {
  if (!burstKey) return null;
  return (
    <div
      key={burstKey}
      aria-hidden
      className="pointer-events-none absolute inset-0"
    >
      {BURST.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={
            {
              left: "50%",
              top: "50%",
              width: p.size,
              height: p.size,
              background: color,
              animation: "tap-burst 300ms ease-out forwards",
              ["--pb-dx" as string]: `${p.dx}px`,
              ["--pb-dy" as string]: `${p.dy}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
