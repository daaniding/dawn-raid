export default function StartButton() {
  return (
    <button
      type="button"
      className="btn-start font-cinzel select-none"
      style={{
        width: "calc(100% - 32px)",
        maxWidth: 380,
        height: 64,
        borderRadius: 16,
        border: "none",
        background:
          "linear-gradient(180deg, var(--amber) 0%, var(--red-action) 100%)",
        color: "var(--text-primary)",
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: "2px",
        textShadow: "0 1px 2px rgba(0,0,0,0.4)",
        cursor: "pointer",
      }}
    >
      START OPDRACHT
    </button>
  );
}
