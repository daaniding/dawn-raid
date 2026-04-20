export default function Header() {
  const xpPct = 46;
  return (
    <header
      className="relative z-20 flex items-center justify-between px-4"
      style={{
        height: 70,
        paddingTop: 12,
        paddingBottom: 12,
        background: "rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 179, 71, 0.3)",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="shrink-0 rounded-full"
          style={{
            width: 46,
            height: 46,
            background: "radial-gradient(circle at 35% 30%, #d9b383 0%, #8a5a3b 70%, #3a220f 100%)",
            border: "2px solid var(--gold-primary)",
            boxShadow: "0 0 10px rgba(255, 179, 71, 0.35)",
          }}
        />
        <div className="flex flex-col gap-1.5">
          <span
            className="font-cinzel font-bold leading-none"
            style={{ fontSize: 18, color: "var(--gold-bright)" }}
          >
            DAAN
          </span>
          <div
            className="relative overflow-hidden rounded-full"
            style={{
              width: 120,
              height: 6,
              background: "rgba(0, 0, 0, 0.55)",
              border: "1px solid rgba(255, 179, 71, 0.25)",
            }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${xpPct}%`,
                background: "linear-gradient(90deg, var(--gold-dark), var(--gold-bright))",
                boxShadow: "0 0 8px rgba(255, 179, 71, 0.7)",
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <div
          className="flex items-center gap-1.5 rounded-full px-2.5 py-1"
          style={{
            background: "rgba(0, 0, 0, 0.4)",
            border: "1px solid rgba(255, 179, 71, 0.2)",
          }}
        >
          <span style={{ fontSize: 14 }}>🪙</span>
          <span
            className="font-cinzel font-bold tabular-nums coin-shimmer"
            style={{ fontSize: 14 }}
          >
            1.273
          </span>
        </div>
        <div
          className="flex items-center gap-1.5 rounded-full px-2.5 py-1"
          style={{
            background: "rgba(0, 0, 0, 0.4)",
            border: "1px solid rgba(255, 179, 71, 0.2)",
          }}
        >
          <span style={{ fontSize: 14 }}>🏆</span>
          <span
            className="font-cinzel font-bold tabular-nums"
            style={{ fontSize: 14, color: "var(--gold-bright)" }}
          >
            0
          </span>
        </div>
      </div>
    </header>
  );
}
