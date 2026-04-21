"use client";

import { useRef, useState } from "react";
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

const RESOURCE_EMOJI: Record<string, string> = {
  hout: "🪵",
  steen: "🪨",
  goud: "✨",
};

const COIN_EMOJI = "🪙";

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

const RARITY_RGB: Record<string, string> = {
  gewoon: "155,155,155",
  zeldzaam: "74,144,217",
  episch: "155,89,182",
  legendarisch: "255,215,0",
};

function dotKleur(r: Reward): string {
  if (r.type === "coins") return "#FFD700";
  if (r.type === "resource") return RESOURCE_KLEUR[r.resource];
  return RARITY_KLEUR[r.rarity];
}

function backgroundGradient(r: Reward): string {
  let rgb = "255,215,0";
  let alpha = 0.18;
  if (r.type === "resource") {
    if (r.resource === "hout") {
      rgb = "139,69,19";
      alpha = 0.2;
    } else if (r.resource === "steen") {
      rgb = "128,128,128";
      alpha = 0.15;
    } else {
      rgb = "218,165,32";
      alpha = 0.2;
    }
  } else if (r.type === "kaart") {
    rgb = RARITY_RGB[r.rarity];
    alpha = r.rarity === "legendarisch" ? 0.25 : r.rarity === "episch" ? 0.22 : r.rarity === "zeldzaam" ? 0.2 : 0.12;
  }
  const base = `radial-gradient(ellipse 90% 70% at 50% 50%, rgba(${rgb},${alpha}) 0%, rgba(${rgb},${alpha * 0.4}) 40%, transparent 70%)`;
  if (r.type === "kaart" && r.rarity === "legendarisch") {
    return `radial-gradient(circle at 50% 50%, rgba(255,215,0,0.15) 0%, transparent 25%), ${base}`;
  }
  return base;
}

function introDuur(r: Reward): number {
  if (r.type !== "kaart") return 0;
  if (
    r.rarity === "legendarisch" ||
    r.rarity === "episch" ||
    r.rarity === "zeldzaam"
  )
    return 300;
  return 0;
}

// Deterministische particle-posities (8 stuks)
const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  size: 3 + ((i * 5) % 4),
  left: ((i * 47) % 90) + 5,
  duration: 3 + ((i * 7) % 4),
  delay: -((i * 11) % 6),
  drift: ((i * 23) % 80) - 40,
  opacity: 0.4 + ((i * 13) % 30) / 100,
}));

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
  const intro = introDuur(huidig);
  const huidigKleur = dotKleur(huidig);

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
        overflow: "hidden",
        perspective: "1000px",
      }}
    >
      {/* Dynamische glow background per reward */}
      <div
        key={`bg-${revealIndex}`}
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: backgroundGradient(huidig),
          transition: "background 400ms ease",
          pointerEvents: "none",
        }}
      />

      {/* Floating particles */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: huidigKleur,
              left: `${p.left}%`,
              bottom: -10,
              opacity: 0,
              boxShadow: `0 0 6px ${huidigKleur}`,
              animation: `particleRise ${p.duration}s linear ${p.delay}s infinite`,
              ["--p-drift" as string]: `${p.drift}px`,
              ["--p-op" as string]: p.opacity.toString(),
            }}
          />
        ))}
      </div>

      {/* Light rays voor legendarisch */}
      {huidig.type === "kaart" && huidig.rarity === "legendarisch" && (
        <div
          aria-hidden
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 0,
            height: 0,
            zIndex: 100,
            pointerEvents: "none",
            animation: "rayRotate 8s linear infinite",
          }}
        >
          {[0, 45, 90, 135].map((deg) => (
            <span
              key={deg}
              style={{
                position: "absolute",
                width: 2,
                height: "60vh",
                top: "-30vh",
                left: -1,
                background:
                  "linear-gradient(to top, rgba(255,215,0,0.6) 0%, transparent 100%)",
                opacity: 0.15,
                transform: `rotate(${deg}deg)`,
                transformOrigin: "center center",
              }}
            />
          ))}
        </div>
      )}

      {/* Intro flash voor kaart */}
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

      {/* Reveal kaart */}
      <div
        key={`card-${revealIndex}`}
        style={{
          position: "fixed",
          top: "45%",
          left: "50%",
          width: 220,
          height: 320,
          borderRadius: 20,
          animation: `cardFlipIn 420ms cubic-bezier(0.34,1.56,0.64,1) ${intro}ms both`,
          zIndex: 102,
          transformStyle: "preserve-3d",
        }}
      >
        <RewardKaart reward={huidig} />
      </div>

      {/* Bolletjes */}
      <div
        style={{
          position: "fixed",
          bottom: 100,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 12,
          alignItems: "center",
          zIndex: 103,
        }}
      >
        {rewards.map((r, i) => {
          const isHuidig = i === revealIndex;
          const isVolgende = i === revealIndex + 1;
          const isGeweest = i < revealIndex;
          const grootte = isHuidig ? 18 : 10;
          const kleur = dotKleur(r);
          const opacity = isHuidig ? 1 : isGeweest ? 0.35 : 0.2;
          return (
            <span
              key={i}
              style={{
                width: grootte,
                height: grootte,
                borderRadius: "50%",
                background: kleur,
                opacity,
                transition:
                  "width 200ms, height 200ms, opacity 200ms, background 200ms",
                animation: isHuidig
                  ? "btn-pulse 1s ease-in-out infinite"
                  : isVolgende
                    ? "nextPulse 0.8s ease-in-out infinite"
                    : undefined,
                boxShadow: isHuidig
                  ? `0 0 16px ${kleur}, 0 0 32px ${kleur}66`
                  : undefined,
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
            bottom: 140,
            left: 0,
            right: 0,
            textAlign: "center",
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

function CardShimmer() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        pointerEvents: "none",
        background:
          "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%)",
        backgroundSize: "200% 100%",
        animation: "cardShimmer 2.5s linear infinite",
      }}
    />
  );
}

function CardTopVignette() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 70,
        background:
          "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 100%)",
        pointerEvents: "none",
      }}
    />
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
          background:
            "radial-gradient(ellipse at 50% 35%, rgba(255,215,0,0.18) 0%, transparent 60%), linear-gradient(160deg, #2d1a00, #4a2d00)",
          border: "2px solid #FFD700",
          boxShadow: "0 0 30px rgba(255,215,0,0.4)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <CardTopVignette />
        <CardShimmer />
        <span
          aria-hidden
          style={{
            fontSize: 64,
            lineHeight: 1,
            marginBottom: 16,
            filter: "drop-shadow(0 4px 10px rgba(255,215,0,0.5))",
            animation: "spriteBounce 2s ease-in-out infinite",
          }}
        >
          {COIN_EMOJI}
        </span>
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
    const baseGrad =
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
          background: `radial-gradient(ellipse at 50% 35%, ${kleur}33 0%, transparent 60%), ${baseGrad}`,
          border: `2px solid ${kleur}`,
          boxShadow: `0 0 25px ${kleur}55`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <CardTopVignette />
        <CardShimmer />
        <span
          aria-hidden
          style={{
            fontSize: 64,
            lineHeight: 1,
            marginBottom: 16,
            filter: `drop-shadow(0 4px 10px ${kleur}77)`,
            animation: "spriteBounce 2s ease-in-out infinite",
          }}
        >
          {RESOURCE_EMOJI[reward.resource]}
        </span>
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
  const rgb = RARITY_RGB[reward.rarity];
  const baseGrad =
    reward.rarity === "legendarisch"
      ? "linear-gradient(160deg, #1a1200, #2d2000)"
      : reward.rarity === "episch"
        ? "linear-gradient(160deg, #1a0d2e, #2a1545)"
        : reward.rarity === "zeldzaam"
          ? "linear-gradient(160deg, #0a1628, #0d2040)"
          : "linear-gradient(160deg, #1a1a1a, #2a2a2a)";
  const bgGrad = `radial-gradient(ellipse at 50% 35%, rgba(${rgb},0.22) 0%, transparent 65%), ${baseGrad}`;

  const bordAnim =
    reward.rarity === "legendarisch"
      ? "legendary-shimmer 1.8s ease-in-out infinite"
      : reward.rarity === "episch"
        ? "epicBorderPulse 1.5s ease-in-out infinite"
        : undefined;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 20,
        background: bgGrad,
        border: `2px solid ${kleur}`,
        boxShadow:
          reward.rarity === "legendarisch"
            ? "0 0 35px rgba(255,215,0,0.7)"
            : reward.rarity === "episch"
              ? "0 0 25px rgba(155,89,182,0.5)"
              : reward.rarity === "zeldzaam"
                ? "0 0 25px rgba(74,144,217,0.5)"
                : "0 0 20px rgba(155,155,155,0.3)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        padding: 16,
        overflow: "hidden",
        animation: bordAnim,
      }}
    >
      <CardTopVignette />
      <CardShimmer />

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
          zIndex: 2,
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
          animation: "spriteBounce 2s ease-in-out infinite",
          position: "relative",
          zIndex: 1,
        }}
      />

      {/* Gouden particles voor legendarisch */}
      {reward.rarity === "legendarisch" && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: 50,
            left: 0,
            right: 0,
            height: 1,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                left: `${(i * 17 + 8) % 92}%`,
                width: 3,
                height: 3,
                borderRadius: "50%",
                background: "#FFD700",
                boxShadow: "0 0 6px #FFD700",
                animation: `goldRise 1.5s ease-out ${(i * 0.25).toFixed(2)}s infinite`,
              }}
            />
          ))}
        </div>
      )}

      <div style={{ flex: 1 }} />

      <span
        className="font-cinzel"
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "#FFF5E4",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
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
          position: "relative",
          zIndex: 1,
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
  const totaalCoins = rewards.reduce(
    (s, r) => (r.type === "coins" ? s + r.amount : s),
    0,
  );

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
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "3px",
          color: "#C4A882",
          marginBottom: 18,
        }}
      >
        OVERZICHT
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

      {totaalCoins > 0 && (
        <span
          className="font-cinzel"
          style={{
            marginTop: 20,
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "2px",
            color: "#FFD700",
            textShadow: "0 2px 8px rgba(255,215,0,0.4)",
          }}
        >
          TOTAAL: +{totaalCoins} COINS
        </span>
      )}

      <button
        type="button"
        onClick={onDoorgaan}
        className="font-cinzel"
        style={{
          position: "fixed",
          bottom: 24,
          left: 16,
          right: 16,
          maxWidth: 360,
          marginInline: "auto",
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

  const label = `+${reward.amount}`;

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
        <span aria-hidden style={{ fontSize: 28, lineHeight: 1 }}>
          {reward.type === "coins"
            ? COIN_EMOJI
            : RESOURCE_EMOJI[reward.resource]}
        </span>
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
