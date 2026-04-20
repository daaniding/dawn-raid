type SlotProps = { children: React.ReactNode; ready?: boolean; glow?: string };

function Slot({ children, ready, glow }: SlotProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center${ready ? " chest-ready" : ""}`}
      style={{
        width: "calc(25% - 6px)",
        height: 60,
        background: "rgba(45, 26, 0, 0.8)",
        border: "1.5px solid var(--gold-dark)",
        borderRadius: 10,
        boxShadow: glow,
        gap: 2,
      }}
    >
      {children}
    </div>
  );
}

export default function ChestSlots() {
  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 flex flex-col gap-1.5"
      style={{
        bottom: 155,
        width: "calc(100% - 24px)",
        maxWidth: 406,
        zIndex: 15,
      }}
    >
      <span
        className="font-cinzel"
        style={{
          fontSize: 10,
          letterSpacing: "2px",
          color: "var(--text-secondary)",
          paddingLeft: 2,
        }}
      >
        SCHATKAMER
      </span>
      <div className="flex gap-2">
        {/* Slot 1: filled, timer running */}
        <Slot glow="0 0 8px rgba(255, 179, 71, 0.3)">
          <span style={{ fontSize: 28, lineHeight: 1 }}>📦</span>
          <span
            className="font-cinzel font-bold tabular-nums"
            style={{ fontSize: 11, color: "var(--gold-primary)" }}
          >
            41:13
          </span>
        </Slot>

        {/* Slot 2: ready to open */}
        <Slot ready>
          <span className="chest-shimmer" style={{ fontSize: 28, lineHeight: 1 }}>
            📦
          </span>
          <span
            className="font-cinzel font-bold"
            style={{ fontSize: 11, color: "#E74C3C" }}
          >
            OPEN!
          </span>
        </Slot>

        {/* Slot 3: empty */}
        <Slot>
          <span style={{ fontSize: 20, opacity: 0.4 }}>🔒</span>
        </Slot>

        {/* Slot 4: empty */}
        <Slot>
          <span style={{ fontSize: 20, opacity: 0.4 }}>🔒</span>
        </Slot>
      </div>
    </div>
  );
}
