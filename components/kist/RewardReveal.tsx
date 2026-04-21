"use client";

import { useEffect, useRef, useState } from "react";
import { type Reward } from "@/lib/kaarten";

interface Props {
  rewards: Reward[];
  onDoorgaan: () => void;
}

const RESOURCE_KLEUR: Record<string, string> = {
  hout: "#8B4513",
  steen: "#808080",
  goud: "#DAA520",
};

const RESOURCE_LABEL: Record<string, string> = {
  hout: "HOUT",
  steen: "STEEN",
  goud: "GOUD",
};

const RARITY_KLEUR: Record<string, string> = {
  gewoon: "#9B9B9B",
  zeldzaam: "#4A90D9",
  episch: "#9B59B6",
  legendarisch: "#FFD700",
};

const RARITY_LABEL: Record<string, string> = {
  gewoon: "GEWOON",
  zeldzaam: "ZELDZAAM",
  episch: "EPISCH",
  legendarisch: "LEGENDARISCH",
};

function dotKleur(r: Reward): string {
  if (r.type === "coins") return "#FFD700";
  if (r.type === "resource") return RESOURCE_KLEUR[r.resource];
  return RARITY_KLEUR[r.rarity];
}

function introDuur(r: Reward): number {
  if (r.type !== "kaart") return 0;
  if (r.rarity === "legendarisch") return 220;
  if (r.rarity === "episch") return 200;
  if (r.rarity === "zeldzaam") return 150;
  return 0;
}

export default function RewardReveal({ rewards, onDoorgaan }: Props) {
  const [revealIndex, setRevealIndex] = useState(0);
  const [voltooid, setVoltooid] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const startXRef = useRef<number | null>(null);

  const volgende = () => {
    setShowHint(false);
    if (revealIndex < rewards.length - 1) {
      setRevealIndex((p) => p + 1);
    } else {
      setVoltooid(true);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startXRef.current === null) return;
    const eindX = e.changedTouches[0].clientX;
    if (eindX - startXRef.current < -50) volgende();
    startXRef.current = null;
  };

  if (voltooid) {
    return <Samenvatting rewards={rewards} onDoorgaan={onDoorgaan} />;
  }

  const huidig = rewards[revealIndex];
  const volgendeReward = rewards[revealIndex + 1];
  const intro = introDuur(huidig);

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onClick={volgende}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.92)",
        zIndex: 100,
        cursor: "pointer",
      }}
    >
      {/* Per-key intro overlay */}
      {intro > 0 && (
        <div
          key={`intro-${revealIndex}`}
          aria-hidden
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 101,
            animation:
              huidig.type === "kaart" && huidig.rarity === "legendarisch"
                ? `legendaryFlash ${intro}ms ease-out forwards`
                : huidig.type === "kaart" && huidig.rarity === "episch"
                  ? `epicPulse ${intro}ms ease-out forwards`
                  : `rareGlimmer ${intro}ms ease-out forwards`,
          }}
        />
      )}

      {/* Light rays for legendary */}
      {huidig.type === "kaart" && huidig.rarity === "legendarisch" && (
        <div
          key={`rays-${revealIndex}`}
          aria-hidden
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            zIndex: 100,
            pointerEvents: "none",
          }}
        >
          {[0, 60, 120].map((deg) => (
            <span
              key={deg}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 4,
                height: 320,
                marginTop: -160,
                marginLeft: -2,
                background:
                  "linear-gradient(to bottom, transparent 0%, rgba(255,215,0,0.6) 50%, transparent 100%)",
                transform: `rotate(${deg}deg)`,
                animation: `lightRay 600ms ease-out ${intro}ms forwards`,
                opacity: 0,
              }}
            />
          ))}
        </div>
      )}

      {/* Reveal kaart */}
      <div
        key={`card-${revealIndex}`}
        style={{
          position: "fixed",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 220,
          height: 320,
          borderRadius: 20,
          animation: `cardReveal 400ms cubic-bezier(0.34,1.56,0.64,1) ${intro}ms both`,
          zIndex: 102,
        }}
      >
        <RewardKaart reward={huidig} />
      </div>

      {/* Bolletjes */}
      <div
        style={{
          position: "fixed",
          bottom: 120,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 8,
          alignItems: "center",
          zIndex: 103,
        }}
      >
        {rewards.map((r, i) => {
          const isHuidig = i === revealIndex;
          const isVolgende = i === revealIndex + 1;
          const isGeweest = i < revealIndex;
          const grootte = isHuidig ? 14 : 8;
          let bg = "rgba(255,255,255,0.2)";
          let opacity = 1;
          if (isHuidig) {
            bg = dotKleur(r);
          } else if (isGeweest) {
            bg = "rgba(255,255,255,0.4)";
          }
          const moetKnipperen =
            isVolgende && volgendeReward?.type === "kaart";
          return (
            <span
              key={i}
              style={{
                width: grootte,
                height: grootte,
                borderRadius: "50%",
                background: bg,
                opacity,
                transition: "width 200ms, height 200ms, background 200ms",
                animation: moetKnipperen
                  ? "nextPulse 0.8s ease-in-out infinite"
                  : undefined,
                boxShadow: isHuidig ? `0 0 12px ${bg}` : undefined,
              }}
            />
          );
        })}
      </div>

      {/* Swipe hint */}
      {showHint && rewards.length > 1 && (
        <div
          style={{
            position: "fixed",
            bottom: 160,
            left: "50%",
            transform: "translateX(-50%)",
            color: "#C4A882",
            fontSize: 11,
            letterSpacing: "2px",
            opacity: 0.7,
            zIndex: 103,
          }}
          className="font-cinzel"
        >
          ← SWIPE
        </div>
      )}
    </div>
  );
}

function RewardKaart({ reward }: { reward: Reward }) {
  if (reward.type === "coins") {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 20,
          background: "linear-gradient(160deg, #2d1a00, #4a2d00)",
          border: "2px solid #FFD700",
          boxShadow: "0 0 30px rgba(255,215,0,0.4)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 30% 30%, #FFE060, #B8860B)",
            boxShadow: "0 4px 16px rgba(255,215,0,0.5), inset 0 2px 4px rgba(255,255,255,0.3)",
            marginBottom: 24,
          }}
        />
        <span
          className="font-cinzel"
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: "#FFD700",
            letterSpacing: "1px",
            textShadow: "0 2px 8px rgba(0,0,0,0.6)",
          }}
        >
          +{reward.amount}
        </span>
        <span
          className="font-cinzel"
          style={{
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "3px",
            color: "#C4A882",
            marginTop: 8,
          }}
        >
          COINS
        </span>
      </div>
    );
  }

  if (reward.type === "resource") {
    const kleur = RESOURCE_KLEUR[reward.resource];
    const bgGrad =
      reward.resource === "hout"
        ? "linear-gradient(160deg, #1a0f00, #2d1800)"
        : reward.resource === "steen"
          ? "linear-gradient(160deg, #111, #222)"
          : "linear-gradient(160deg, #1a1400, #2d2200)";
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 20,
          background: bgGrad,
          border: `2px solid ${kleur}`,
          boxShadow: `0 0 25px ${kleur}55`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <div
          aria-hidden
          style={{
            width: 64,
            height: 64,
            borderRadius: 8,
            background: kleur,
            boxShadow: `0 4px 16px ${kleur}66, inset 0 2px 4px rgba(255,255,255,0.15)`,
            marginBottom: 24,
          }}
        />
        <span
          className="font-cinzel"
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: "#FFF5E4",
            letterSpacing: "1px",
            textShadow: "0 2px 8px rgba(0,0,0,0.6)",
          }}
        >
          +{reward.amount}
        </span>
        <span
          className="font-cinzel"
          style={{
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "3px",
            color: "#C4A882",
            marginTop: 8,
          }}
        >
          {RESOURCE_LABEL[reward.resource]}
        </span>
      </div>
    );
  }

  // KAART
  const kleur = RARITY_KLEUR[reward.rarity];
  const bgGrad =
    reward.rarity === "legendarisch"
      ? "linear-gradient(160deg, #1a1200, #2d2000)"
      : reward.rarity === "episch"
        ? "linear-gradient(160deg, #1a0d2e, #2a1545)"
        : reward.rarity === "zeldzaam"
          ? "linear-gradient(160deg, #0a1628, #0d2040)"
          : "linear-gradient(160deg, #1a1a1a, #2a2a2a)";
  const glow =
    reward.rarity === "legendarisch"
      ? "0 0 35px rgba(255,215,0,0.7)"
      : reward.rarity === "episch"
        ? "0 0 25px rgba(155,89,182,0.5)"
        : reward.rarity === "zeldzaam"
          ? "0 0 25px rgba(74,144,217,0.5)"
          : "0 0 20px rgba(155,155,155,0.3)";
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 20,
        background: bgGrad,
        border: `2px solid ${kleur}`,
        boxShadow: glow,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        padding: 16,
        animation:
          reward.rarity === "legendarisch"
            ? "legendary-shimmer 1.8s ease-in-out infinite"
            : undefined,
      }}
    >
      {/* Rarity badge */}
      <span
        className="font-cinzel"
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "2px",
          padding: "3px 8px",
          borderRadius: 8,
          background: `${kleur}33`,
          color: kleur,
        }}
      >
        {RARITY_LABEL[reward.rarity]}
      </span>

      {/* Sprite */}
      <div
        aria-hidden
        style={{
          width: 192,
          height: 192,
          marginTop: 32,
          backgroundImage: `url('${reward.kaart.sprite}')`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
          filter: `drop-shadow(0 0 18px ${kleur}AA)`,
        }}
      />

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      <span
        className="font-cinzel"
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "#FFF5E4",
          textAlign: "center",
        }}
      >
        {reward.kaart.naam}
      </span>
      <span
        className="font-cinzel"
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: kleur,
          marginTop: 4,
        }}
      >
        +{reward.amount} KAART{reward.amount > 1 ? "EN" : ""}
      </span>
    </div>
  );
}

function Samenvatting({
  rewards,
  onDoorgaan,
}: {
  rewards: Reward[];
  onDoorgaan: () => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.95)",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        animation: "fadeIn 250ms ease-out both",
      }}
    >
      <span
        className="font-cinzel"
        style={{
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: "3px",
          color: "#C4A882",
          marginBottom: 18,
        }}
      >
        JE HEBT ONTVANGEN
      </span>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 8,
          maxWidth: 360,
        }}
      >
        {rewards.map((r, i) => (
          <MiniReward key={i} reward={r} />
        ))}
      </div>

      <button
        type="button"
        onClick={onDoorgaan}
        className="font-cinzel"
        style={{
          marginTop: 32,
          width: "calc(100% - 32px)",
          maxWidth: 360,
          height: 56,
          borderRadius: 14,
          border: "none",
          background:
            "linear-gradient(180deg, var(--amber) 0%, var(--red-action) 100%)",
          color: "#FFF5E4",
          fontSize: 18,
          fontWeight: 900,
          letterSpacing: "3px",
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
          boxShadow:
            "0 5px 0 #8B2500, 0 8px 18px rgba(192, 57, 43, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          cursor: "pointer",
        }}
      >
        DOORGAAN
      </button>
    </div>
  );
}

function MiniReward({ reward }: { reward: Reward }) {
  const kleur =
    reward.type === "coins"
      ? "#FFD700"
      : reward.type === "resource"
        ? RESOURCE_KLEUR[reward.resource]
        : RARITY_KLEUR[reward.rarity];

  const label =
    reward.type === "coins"
      ? `+${reward.amount}`
      : reward.type === "resource"
        ? `+${reward.amount}`
        : `+${reward.amount}`;

  return (
    <div
      style={{
        width: 70,
        height: 70,
        borderRadius: 10,
        background: "rgba(255,255,255,0.04)",
        border: `1.5px solid ${kleur}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        padding: 4,
      }}
    >
      {reward.type === "kaart" ? (
        <div
          aria-hidden
          style={{
            width: 36,
            height: 36,
            backgroundImage: `url('${reward.kaart.sprite}')`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            imageRendering: "pixelated",
          }}
        />
      ) : (
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius:
              reward.type === "coins" ? "50%" : 4,
            background:
              reward.type === "coins"
                ? "radial-gradient(circle at 30% 30%, #FFE060, #B8860B)"
                : kleur,
          }}
        />
      )}
      <span
        className="font-cinzel"
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: "#FFF5E4",
          lineHeight: 1,
        }}
      >
        {label}
      </span>
    </div>
  );
}
