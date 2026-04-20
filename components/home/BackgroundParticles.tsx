const PARTICLES = Array.from({ length: 20 }, (_, i) => {
  const size = 2 + ((i * 7) % 3);
  const left = (i * 53) % 100;
  const duration = 4 + ((i * 3) % 5);
  const delay = -((i * 11) % 8);
  const drift = ((i * 17) % 40) - 20;
  const opacity = 0.35 + ((i * 13) % 3) * 0.1;
  return { size, left, duration, delay, drift, opacity };
});

export default function BackgroundParticles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: -10,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ["--drift" as string]: `${p.drift}px`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
