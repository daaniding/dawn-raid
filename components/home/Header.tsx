"use client";

import { useEffect, useState } from "react";
import { CoinsIcon, TrophyIcon } from "@/components/ui/GameIcon";
import { getOrCreateUserId } from "@/lib/userId";

export default function Header() {
  const [level, setLevel] = useState(1);
  const [xpInLevel, setXpInLevel] = useState(0);
  const [xpVoorVolg, setXpVoorVolg] = useState(50);
  const [progress, setProgress] = useState(0);
  const [coins, setCoins] = useState<number | null>(null);

  useEffect(() => {
    const id = getOrCreateUserId();
    if (!id) return;
    fetch(`/api/xp?userId=${id}`)
      .then((r) => r.json())
      .then((j) => {
        setLevel(j.level ?? 1);
        setXpInLevel(j.xpInHuidigLevel ?? 0);
        setXpVoorVolg(j.xpVoorVolgendLevel ?? 50);
        setProgress(j.progress ?? 0);
      })
      .catch(() => {});
    fetch(`/api/reward?userId=${id}`)
      .then((r) => r.json())
      .then((j) => {
        const c = Number(j?.wallet?.coins ?? 0);
        setCoins(c);
      })
      .catch(() => {});
  }, []);

  const pct = Math.max(0, Math.min(100, progress * 100));

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
          className="shrink-0 rounded-full relative"
          style={{
            width: 46,
            height: 46,
            background:
              "radial-gradient(circle at 35% 30%, #d9b383 0%, #8a5a3b 70%, #3a220f 100%)",
            border: "2px solid var(--gold-primary)",
            boxShadow: "0 0 10px rgba(255, 179, 71, 0.35)",
          }}
        >
          <span
            className="font-cinzel"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 900,
              color: "#FFF5E4",
              textShadow: "0 1px 2px rgba(0,0,0,0.6)",
            }}
          >
            {level}
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-baseline gap-2">
            <span
              className="font-cinzel leading-none"
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "1.5px",
                color: "#FFD700",
              }}
            >
              LVL {level}
            </span>
            <span
              className="font-cinzel leading-none"
              style={{ fontSize: 9, color: "#C4A882", letterSpacing: "1px" }}
            >
              {xpInLevel}/{xpVoorVolg} XP
            </span>
          </div>
          <div
            className="relative overflow-hidden rounded-full"
            style={{
              width: 130,
              height: 6,
              background: "rgba(0, 0, 0, 0.55)",
              border: "1px solid rgba(255, 179, 71, 0.25)",
            }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${pct}%`,
                background:
                  "linear-gradient(90deg, var(--gold-dark), var(--gold-bright))",
                boxShadow: "0 0 8px rgba(255, 179, 71, 0.7)",
                transition: "width 400ms ease-out",
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
          <CoinsIcon size={20} style={{ color: "#FFD700" }} />
          <span
            className="font-cinzel tabular-nums coin-shimmer"
            style={{ fontSize: 14, fontWeight: 700 }}
          >
            {coins === null ? "…" : coins.toLocaleString("nl-NL")}
          </span>
        </div>
        <div
          className="flex items-center gap-1.5 rounded-full px-2.5 py-1"
          style={{
            background: "rgba(0, 0, 0, 0.4)",
            border: "1px solid rgba(255, 179, 71, 0.2)",
          }}
        >
          <TrophyIcon size={20} style={{ color: "#FFD700" }} />
          <span
            className="font-cinzel tabular-nums"
            style={{ fontSize: 14, fontWeight: 700, color: "#FFD700" }}
          >
            0
          </span>
        </div>
      </div>
    </header>
  );
}
