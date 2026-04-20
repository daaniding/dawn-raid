"use client";

import ChestSlotSprite from "@/components/kist/ChestSlotSprite";
import { PadlockIcon } from "@/components/ui/GameIcon";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type SlotProps = {
  children: ReactNode;
  ready?: boolean;
  glow?: string;
  onClick?: () => void;
  badge?: string;
};

function Slot({ children, ready, glow, onClick, badge }: SlotProps) {
  return (
    <div
      className="relative"
      style={{ width: "calc(25% - 6px)" }}
    >
      <div
        onClick={onClick}
        className={`${ready ? "chest-ready" : ""}`}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 8,
          gap: 4,
          width: "100%",
          height: "100%",
          minHeight: 130,
          background: "rgba(45, 26, 0, 0.8)",
          border: "1.5px solid var(--gold-dark)",
          borderRadius: 10,
          boxShadow: glow,
          cursor: onClick ? "pointer" : "default",
        }}
      >
        {children}
      </div>
      {badge && (
        <span
          className="font-cinzel absolute"
          style={{
            top: -6,
            right: -6,
            padding: "2px 5px",
            background: "#E74C3C",
            color: "#FFF5E4",
            fontSize: 8,
            fontWeight: 700,
            borderRadius: 10,
            animation: "badge-pulse 1s ease-in-out infinite",
          }}
        >
          {badge}
        </span>
      )}
    </div>
  );
}

export default function ChestSlots({
  onVisibilityChange,
}: {
  onVisibilityChange?: (visible: boolean) => void;
}) {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onVisibilityChange || !rootRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => onVisibilityChange(entry.isIntersecting),
      { threshold: 0.01 },
    );
    obs.observe(rootRef.current);
    return () => obs.disconnect();
  }, [onVisibilityChange]);

  return (
    <div
      ref={rootRef}
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
          fontWeight: 400,
          letterSpacing: "3px",
          color: "#C4A882",
          paddingLeft: 2,
        }}
      >
        SCHATKAMER
      </span>
      <div className="flex gap-2 items-stretch">
        {/* Slot 1: timer running (bronze) */}
        <Slot glow="0 0 8px rgba(255, 179, 71, 0.3)">
          <div
            style={{
              display: "block",
              margin: "0 auto",
              width: 144,
              height: 96,
              filter: "brightness(1.3)",
            }}
          >
            <ChestSlotSprite type="bronze" animated scale={3} />
          </div>
          <span
            className="font-cinzel tabular-nums"
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#FFB347",
              width: "100%",
              textAlign: "center",
            }}
          >
            41:13
          </span>
        </Slot>

        {/* Slot 2: ready (silver) with shine */}
        <Slot
          ready
          badge="NIEUW"
          onClick={() => router.push("/kist?type=silver")}
        >
          <div
            style={{
              display: "block",
              margin: "0 auto",
              width: 144,
              height: 96,
              filter: "brightness(1.3)",
              animation: "chest-shine 2s ease-in-out infinite",
            }}
          >
            <ChestSlotSprite type="silver" animated isReady scale={3} />
          </div>
          <span
            className="font-cinzel"
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "2px",
              color: "#FFD700",
              width: "100%",
              textAlign: "center",
            }}
          >
            OPEN!
          </span>
        </Slot>

        {/* Slot 3: empty */}
        <Slot>
          <PadlockIcon size={20} style={{ color: "#C4A882", opacity: 0.5 }} />
        </Slot>

        {/* Slot 4: empty */}
        <Slot>
          <PadlockIcon size={20} style={{ color: "#C4A882", opacity: 0.5 }} />
        </Slot>
      </div>
    </div>
  );
}
