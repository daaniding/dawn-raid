"use client";

import {
  dagSleutel,
  getOpdrachtenVoorDag,
  type Opdracht,
} from "@/lib/opdrachten";
import {
  getHuidigeOpdracht,
  setHuidigeOpdracht,
} from "@/lib/huidigeOpdracht";
import { getOrCreateUserId } from "@/lib/userId";
import { useEffect, useMemo, useState } from "react";

const CATEGORIE_KLEUR: Record<Opdracht["categorie"], string> = {
  fysiek: "#4CAF50",
  comfortzone: "#E74C3C",
  leren: "#4A90D9",
  creatief: "#9B59B6",
};

const CATEGORIE_BORDER: Record<Opdracht["categorie"], string> = {
  fysiek: "rgba(76,175,80,0.4)",
  comfortzone: "rgba(231,76,60,0.4)",
  leren: "rgba(74,144,217,0.4)",
  creatief: "rgba(155,89,182,0.4)",
};

const CATEGORIE_LABEL: Record<Opdracht["categorie"], string> = {
  fysiek: "FYSIEK",
  comfortzone: "COMFORT ZONE",
  leren: "LEREN",
  creatief: "CREATIEF",
};

const CHEST_PER_DUUR: Record<5 | 15 | 30 | 60, "bronze" | "silver" | "epic"> = {
  5: "bronze",
  15: "bronze",
  30: "silver",
  60: "epic",
};

function vandaagDatumNL(d: Date): string {
  return d.toLocaleDateString("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type Wissel = Record<5 | 15 | 30 | 60, boolean>;

export default function DagelijksOpdracht() {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [hoverId, setHoverId] = useState<number | null>(null);

  const today = useMemo(() => new Date(), []);
  const datum = useMemo(() => dagSleutel(today), [today]);
  const initieel = useMemo(() => getOpdrachtenVoorDag(today), [today]);

  const [kaarten, setKaarten] = useState<Opdracht[]>(() => [
    initieel.snel,
    initieel.kort,
    initieel.middel,
    initieel.lang,
  ]);
  const [wisselUsed, setWisselUsed] = useState<Wissel>({
    5: false,
    15: false,
    30: false,
    60: false,
  });
  const [wisselBezig, setWisselBezig] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const lokaal = getHuidigeOpdracht();
    (async () => {
      try {
        const userId = getOrCreateUserId();
        if (!userId) {
          if (!lokaal) setOpen(true);
          return;
        }
        const [picked, swaps] = await Promise.all([
          fetch(
            `/api/dagelijkseopdracht?userId=${encodeURIComponent(userId)}&datum=${datum}`,
            { cache: "no-store" },
          ).then((r) => r.json()),
          fetch(
            `/api/dagelijkseopdracht/wissel?userId=${encodeURIComponent(userId)}&datum=${datum}`,
            { cache: "no-store" },
          ).then((r) => r.json()),
        ]);
        if (cancelled) return;
        if (!lokaal && !picked?.opdracht) setOpen(true);
        if (swaps?.used) setWisselUsed(swaps.used as Wissel);
      } catch {
        if (!cancelled && !lokaal) setOpen(true);
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
    setHuidigeOpdracht({
      titel: op.titel,
      duur: op.duur,
      coins: op.coins,
      chestType: CHEST_PER_DUUR[op.duur],
      datum,
    });
    setOpen(false);
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
      /* offline-fallback: localStorage blijft */
    }
  };

  const wissel = async (op: Opdracht, idx: number) => {
    if (wisselUsed[op.duur] || wisselBezig === op.id) return;
    setWisselBezig(op.id);
    try {
      const userId = getOrCreateUserId();
      const res = await fetch("/api/dagelijkseopdracht/wissel", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          userId,
          datum,
          duur: op.duur,
          huidigId: op.id,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.opdracht) {
          setKaarten((prev) => {
            const copy = [...prev];
            copy[idx] = data.opdracht as Opdracht;
            return copy;
          });
          setWisselUsed((prev) => ({ ...prev, [op.duur]: true }));
        }
      } else if (res.status === 403) {
        setWisselUsed((prev) => ({ ...prev, [op.duur]: true }));
      }
    } catch {
      /* swallow */
    } finally {
      setWisselBezig(null);
    }
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
          {kaarten.map((op, idx) => {
            const cKleur = CATEGORIE_KLEUR[op.categorie];
            const cBorder = CATEGORIE_BORDER[op.categorie];
            const isHover = hoverId === op.id;
            const wisselDisabled =
              wisselUsed[op.duur] || wisselBezig === op.id;
            return (
              <div
                key={`${op.duur}-${op.id}`}
                style={{ position: "relative", width: "100%" }}
              >
                <button
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
                    paddingBottom: 36,
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
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    wissel(op, idx);
                  }}
                  disabled={wisselDisabled}
                  title={
                    wisselUsed[op.duur] ? "Al gewisseld vandaag" : undefined
                  }
                  className="font-cinzel"
                  style={{
                    position: "absolute",
                    right: 12,
                    bottom: 10,
                    background: "transparent",
                    border: `1px solid ${wisselDisabled ? "rgba(120,120,120,0.3)" : "rgba(196,168,130,0.3)"}`,
                    borderRadius: 8,
                    padding: "4px 8px",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "1px",
                    color: wisselDisabled ? "#6b6b6b" : "#C4A882",
                    cursor: wisselDisabled ? "not-allowed" : "pointer",
                    opacity: wisselBezig === op.id ? 0.6 : 1,
                  }}
                >
                  ↺ WISSEL
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
