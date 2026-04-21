"use client";

import {
  dagSleutel,
  getOpdrachtenVoorDag,
  type Opdracht,
} from "@/lib/opdrachten";
import { getOrCreateUserId } from "@/lib/userId";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const CATEGORIE_KLEUR: Record<Opdracht["categorie"], string> = {
  fysiek: "#4CAF50",
  comfortzone: "#E74C3C",
  productiviteit: "#4A90D9",
  creativiteit: "#9B59B6",
};

const CATEGORIE_BORDER: Record<Opdracht["categorie"], string> = {
  fysiek: "rgba(76,175,80,0.4)",
  comfortzone: "rgba(231,76,60,0.4)",
  productiviteit: "rgba(74,144,217,0.4)",
  creativiteit: "rgba(155,89,182,0.4)",
};

const CATEGORIE_LABEL: Record<Opdracht["categorie"], string> = {
  fysiek: "FYSIEK",
  comfortzone: "COMFORT ZONE",
  productiviteit: "PRODUCTIVITEIT",
  creativiteit: "CREATIVITEIT",
};

const REWARD_PER_DUUR: Record<5 | 15 | 30 | 60, "bronze" | "silver" | "gold"> =
  {
    5: "bronze",
    15: "bronze",
    30: "silver",
    60: "gold",
  };

function vandaagDatumNL(d: Date): string {
  return d.toLocaleDateString("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function DagelijksOpdracht() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [hoverId, setHoverId] = useState<number | null>(null);

  const today = useMemo(() => new Date(), []);
  const datum = useMemo(() => dagSleutel(today), [today]);
  const opdrachten = useMemo(() => getOpdrachtenVoorDag(today), [today]);
  const lijst: Opdracht[] = useMemo(
    () => [opdrachten.snel, opdrachten.kort, opdrachten.middel, opdrachten.lang],
    [opdrachten],
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const userId = getOrCreateUserId();
        if (!userId) return;
        const res = await fetch(
          `/api/dagelijkseopdracht?userId=${encodeURIComponent(userId)}&datum=${datum}`,
          { cache: "no-store" },
        );
        const data = await res.json();
        if (cancelled) return;
        if (!data?.opdracht) setOpen(true);
      } catch {
        // network/down: still show modal so user can pick
        if (!cancelled) setOpen(true);
      } finally {
        if (!cancelled) setChecked(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [datum]);

  const kies = async (op: Opdracht) => {
    const userId = getOrCreateUserId();
    try {
      await fetch("/api/dagelijkseopdracht", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          userId,
          datum,
          opdrachtId: op.id,
          duur: op.duur,
        }),
      });
    } catch {
      /* offline-fallback: still navigate */
    }
    setOpen(false);
    const params = new URLSearchParams({
      duration: String(op.duur * 60),
      name: op.titel,
      reward: REWARD_PER_DUUR[op.duur],
      opdracht: String(op.id),
    });
    router.push(`/timer?${params.toString()}`);
  };

  if (!checked || !open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "linear-gradient(180deg, #0d0600 0%, #1a0f00 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "32px 16px 24px",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 430,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            className="font-cinzel"
            style={{
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "3px",
              color: "#FFD700",
            }}
          >
            KIES JE OPDRACHT VAN VANDAAG
          </div>
          <div
            className="font-cinzel"
            style={{
              marginTop: 6,
              fontSize: 12,
              color: "#C4A882",
              textTransform: "capitalize",
            }}
          >
            {vandaagDatumNL(today)}
          </div>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginTop: 8,
          }}
        >
          {lijst.map((op) => {
            const cKleur = CATEGORIE_KLEUR[op.categorie];
            const cBorder = CATEGORIE_BORDER[op.categorie];
            const isHover = hoverId === op.id;
            return (
              <button
                key={op.id}
                type="button"
                onClick={() => kies(op)}
                onMouseEnter={() => setHoverId(op.id)}
                onMouseLeave={() => setHoverId(null)}
                onTouchStart={() => setHoverId(op.id)}
                onTouchEnd={() => setHoverId(null)}
                style={{
                  textAlign: "left",
                  background: "var(--bg-light, #2d1a00)",
                  border: `1.5px solid ${isHover ? cKleur : cBorder}`,
                  borderRadius: 16,
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  cursor: "pointer",
                  transform: isHover ? "scale(1.02)" : "scale(1)",
                  transition:
                    "transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease",
                  boxShadow: isHover
                    ? `0 0 18px ${cBorder}`
                    : "inset 0 1px 0 rgba(255,255,255,0.04)",
                  color: "inherit",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    className="font-cinzel"
                    style={{
                      background: "rgba(255,215,0,0.15)",
                      border: "1px solid #FFD700",
                      color: "#FFD700",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "1px",
                      padding: "4px 10px",
                      borderRadius: 20,
                    }}
                  >
                    {op.duur} MIN
                  </span>
                  <span
                    className="font-cinzel"
                    style={{
                      background: "rgba(255,179,71,0.15)",
                      border: "1px solid #FFB347",
                      color: "#FFB347",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "1px",
                      padding: "4px 10px",
                      borderRadius: 20,
                    }}
                  >
                    {op.coins} 🪙
                  </span>
                </div>
                <span
                  className="font-cinzel"
                  style={{
                    fontSize: 10,
                    letterSpacing: "2px",
                    color: cKleur,
                    textTransform: "uppercase",
                  }}
                >
                  {CATEGORIE_LABEL[op.categorie]}
                </span>
                <span
                  className="font-cinzel"
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#FFF5E4",
                    lineHeight: 1.4,
                  }}
                >
                  {op.titel}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
