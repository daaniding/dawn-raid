type Tab = { icon: string; label: string; active?: boolean };

const TABS: Tab[] = [
  { icon: "🏠", label: "HOME", active: true },
  { icon: "🗺️", label: "DORP" },
  { icon: "⚔️", label: "HELDEN" },
  { icon: "🏆", label: "LEAGUE" },
];

export default function TabBar() {
  return (
    <nav
      className="fixed left-1/2 bottom-0 z-30 flex w-full -translate-x-1/2 items-stretch"
      style={{
        maxWidth: 430,
        height: 70,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        background: "var(--bg-dark)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(255, 179, 71, 0.3)",
      }}
    >
      {TABS.map((t) => (
        <button
          key={t.label}
          type="button"
          className="flex flex-1 flex-col items-center justify-center gap-1"
          style={{
            color: t.active ? "var(--gold-primary)" : "var(--text-secondary)",
            transition: "color 200ms ease, opacity 200ms ease",
            opacity: t.active ? 1 : 0.85,
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 24, lineHeight: 1 }}>{t.icon}</span>
          <span
            className="font-nunito font-bold"
            style={{ fontSize: 10, letterSpacing: "1px" }}
          >
            {t.label}
          </span>
          {t.active && <span className="tab-dot" />}
        </button>
      ))}
    </nav>
  );
}
