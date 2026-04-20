"use client";

import type { ReactNode } from "react";

export type Rarity = "common" | "rare" | "epic" | "legendary";

const RARITY_COLORS: Record<Rarity, string> = {
  common: "#9B9B9B",
  rare: "#4A90D9",
  epic: "#9B59B6",
  legendary: "#FFD700",
};

const RARITY_GLOWS: Record<Rarity, string> = {
  common: "0 0 8px rgba(155, 155, 155, 0.3)",
  rare: "0 0 10px rgba(74, 144, 217, 0.4)",
  epic: "0 0 10px rgba(155, 89, 182, 0.4)",
  legendary: "0 0 14px rgba(255, 215, 0, 0.6)",
};

type Props = {
  icon: ReactNode;
  name: string;
  rarity: Rarity;
  delayMs: number;
};

export default function ChestItem({ icon, name, rarity, delayMs }: Props) {
  const color = RARITY_COLORS[rarity];
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        width: "calc(33% - 6px)",
        height: 100,
        padding: "10px 8px",
        gap: 6,
        borderRadius: 12,
        background: "var(--bg-light)",
        border: `1.5px solid ${color}`,
        boxShadow: RARITY_GLOWS[rarity],
        animation: `slide-up 400ms ease-out ${delayMs}ms both${rarity === "legendary" ? ", legendary-shimmer 1.8s ease-in-out infinite" : ""}`,
      }}
    >
      <span style={{ color, lineHeight: 0 }}>{icon}</span>
      <span
        className="font-cinzel text-center"
        style={{ fontSize: 11, fontWeight: 700, color: "#FFF5E4" }}
      >
        {name}
      </span>
      <span
        className="font-nunito uppercase"
        style={{ fontSize: 10, color }}
      >
        {rarity}
      </span>
    </div>
  );
}
