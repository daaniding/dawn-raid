export default function QuestCard() {
  return (
    <div className="flex w-full flex-col items-center">
      <span
        className="font-cinzel mb-3"
        style={{
          fontSize: 11,
          letterSpacing: "3px",
          color: "var(--text-secondary)",
        }}
      >
        DAGELIJKSE OPDRACHT
      </span>
      <div
        className="flex items-center gap-4"
        style={{
          width: "calc(100% - 32px)",
          maxWidth: 380,
          padding: 20,
          background: "linear-gradient(180deg, var(--bg-light) 0%, var(--bg-mid) 100%)",
          border: "1px solid var(--gold-dark)",
          borderRadius: 16,
          boxShadow:
            "0 0 20px rgba(255, 179, 71, 0.15), inset 0 1px 0 rgba(255, 179, 71, 0.1)",
        }}
      >
        <div
          className="flex items-center justify-center shrink-0"
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 30%, #3a2500 0%, #1a0f00 70%)",
            border: "2px solid var(--gold-primary)",
            boxShadow:
              "0 0 12px rgba(255, 179, 71, 0.35), inset 0 0 8px rgba(0,0,0,0.6)",
            fontSize: 28,
          }}
        >
          ⚔️
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <h2
            className="font-cinzel font-bold leading-tight"
            style={{ fontSize: 20, color: "var(--text-primary)" }}
          >
            Focus &amp; Conquer
          </h2>
          <p
            className="font-nunito leading-tight"
            style={{ fontSize: 14, color: "var(--text-secondary)" }}
          >
            30 minuten · 150 🪙
          </p>
        </div>
      </div>
    </div>
  );
}
