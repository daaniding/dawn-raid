type FabProps = {
  icon: string;
  badge?: string;
  label: string;
};

function Fab({ icon, badge, label }: FabProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className="relative flex items-center justify-center"
      style={{
        width: 52,
        height: 52,
        borderRadius: "50%",
        background: "var(--bg-light)",
        border: "1.5px solid var(--gold-dark)",
        boxShadow:
          "0 4px 0 rgba(0, 0, 0, 0.5), 0 0 10px rgba(255, 179, 71, 0.1), inset 0 1px 0 rgba(255, 179, 71, 0.15)",
        fontSize: 24,
        cursor: "pointer",
      }}
    >
      <span>{icon}</span>
      {badge && (
        <span
          className="absolute flex items-center justify-center font-nunito font-bold"
          style={{
            top: -4,
            right: -4,
            minWidth: 20,
            height: 20,
            padding: "0 5px",
            borderRadius: 10,
            background: "var(--red-bright)",
            color: "#fff",
            fontSize: 11,
            border: "2px solid var(--bg-dark)",
            boxShadow: "0 0 6px rgba(231, 76, 60, 0.6)",
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

export default function FloatingButtons() {
  return (
    <div
      className="fixed z-30 flex flex-col gap-3"
      style={{
        right: 12,
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <Fab icon="📦" label="Kisten" badge="3" />
      <Fab icon="⚔️" label="Aanvallen" />
      <Fab icon="🏪" label="Shop" />
    </div>
  );
}
