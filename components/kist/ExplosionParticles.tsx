"use client";

type Props = {
  active: boolean;
  accentColor: string;
};

const PARTICLES = Array.from({ length: 30 }, (_, i) => {
  const angle = (i / 30) * Math.PI * 2 + (i % 3) * 0.2;
  const dist = 100 + ((i * 17) % 150);
  return {
    dx: Math.cos(angle) * dist,
    dy: Math.sin(angle) * dist,
    size: 4 + (i % 5),
    colorIndex: i % 4,
    delay: (i % 6) * 0.04,
    duration: 0.7 + (i % 4) * 0.1,
  };
});

export default function ExplosionParticles({ active, accentColor }: Props) {
  if (!active) return null;
  const colors = ["#FFD700", "#FFB347", "#FFF5E4", accentColor];
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
    >
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={
            {
              left: "50%",
              top: "50%",
              width: p.size,
              height: p.size,
              background: colors[p.colorIndex],
              animation: `explode ${p.duration}s ease-out ${p.delay}s forwards`,
              ["--ex-dx" as string]: `${p.dx}px`,
              ["--ex-dy" as string]: `${p.dy}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
