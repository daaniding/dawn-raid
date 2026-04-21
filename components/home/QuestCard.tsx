"use client";

import { CoinsIcon, CrossedSwordsIcon } from "@/components/ui/GameIcon";
import {
  getHuidigeOpdracht,
  OPDRACHT_EVENT,
  type HuidigeOpdracht,
} from "@/lib/huidigeOpdracht";
import { useEffect, useState } from "react";

export default function QuestCard() {
  const [op, setOp] = useState<HuidigeOpdracht | null>(null);

  useEffect(() => {
    const sync = () => setOp(getHuidigeOpdracht());
    sync();
    window.addEventListener(OPDRACHT_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(OPDRACHT_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const titel = op?.titel ?? "Kies je opdracht";
  const sub = op ? `${op.duur} minuten · ${op.coins}` : "Nog niet gekozen";

  return (
    <div className="flex w-full flex-col items-center">
      <span
        className="font-cinzel mb-3"
        style={{
          fontSize: 11,
          fontWeight: 400,
          letterSpacing: "4px",
          color: "#C4A882",
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
          background:
            "linear-gradient(180deg, var(--bg-light) 0%, var(--bg-mid) 100%)",
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
            color: "#FFB347",
          }}
        >
          <CrossedSwordsIcon size={28} />
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <h2
            className="font-cinzel leading-tight"
            style={{
              fontSize: op ? 16 : 20,
              fontWeight: 700,
              color: "#FFF5E4",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {titel}
          </h2>
          <p
            className="font-nunito leading-tight flex items-center gap-1.5"
            style={{ fontSize: 14, fontWeight: 600, color: "#C4A882" }}
          >
            {sub}
            {op && <CoinsIcon size={16} style={{ color: "#FFD700" }} />}
          </p>
        </div>
      </div>
    </div>
  );
}
