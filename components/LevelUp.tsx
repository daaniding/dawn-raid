"use client";

import { useEffect, useState } from "react";
import { type LevelReward } from "@/lib/levels";
import { getKaart, RARITY_COLORS } from "@/lib/kaarten";

const RESOURCE_EMOJI: Record<string, string> = {
  hout: "🪵",
  steen: "🪨",
  goud: "✨",
};
const COIN_EMOJI = "🪙";

interface Props {
  newLevel: number;
  rewards: Array<LevelReward & { level: number }>;
  onClose: () => void;
}

export default function LevelUp({ newLevel, rewards, onClose }: Props) {
  const [magSluiten, setMagSluiten] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setMagSluiten(true), 1500);
    return () => clearTimeout(id);
  }, []);

  // Eerste reward die een nieuwe kaart bevat (special reveal)
  const kaartReward = rewards.find((r) => r.nieuweKaart);
  const overigeRewards = rewards.filter((r) => !r.nieuweKaart);
  const kaart = kaartReward?.nieuweKaart
    ? getKaart(kaartReward.nieuweKaart)
    : null;
  const kleur = kaart ? RARITY_COLORS[kaart.rarity] : null;

  return (
    <div
      onClick={() => magSluiten && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.95)",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        cursor: magSluiten ? "pointer" : "default",
        overflow: "hidden",
      }}
    >
      {/* Confetti */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        {Array.from({ length: 20 }).map((_, i) => {
          const left = ((i * 47) % 100) + (i % 5);
          const delay = (i * 0.08).toFixed(2);
          const dur = 1.6 + (i % 5) * 0.2;
          return (
            <span
              key={i}
              className="confetti"
              style={{
                left: `${left}%`,
                background:
                  i % 3 === 0 ? "#FFD700" : i % 3 === 1 ? "#FFB347" : "#FFF5E4",
                animationDuration: `${dur}s`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      {/* Goud lichtflits */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 40%, rgba(255,215,0,0.45) 0%, transparent 60%)",
          animation: "tapFlash 700ms ease-out forwards",
          pointerEvents: "none",
        }}
      />

      <span
        className="font-cinzel"
        style={{
          fontSize: 52,
          fontWeight: 900,
          color: "#FFD700",
          letterSpacing: "3px",
          textShadow: "0 0 40px rgba(255,215,0,0.8), 0 4px 12px rgba(0,0,0,0.6)",
          animation: "pop-in 600ms cubic-bezier(.34,1.56,.64,1) both",
        }}
      >
        LEVEL UP!
      </span>
      <span
        className="font-cinzel"
        style={{
          marginTop: 4,
          fontSize: 28,
          fontWeight: 700,
          color: "#FFF5E4",
          letterSpacing: "3px",
          animation: "fadeIn 300ms ease-out 200ms both",
        }}
      >
        LEVEL {newLevel}
      </span>

      {/* XP balk */}
      <div
        style={{
          marginTop: 18,
          width: "min(280px, 80%)",
          height: 10,
          borderRadius: 6,
          background: "rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,179,71,0.3)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #B8860B, #FFD700)",
            width: 0,
            animation: "xpFill 500ms ease-out 400ms forwards",
            boxShadow: "0 0 12px rgba(255,215,0,0.6)",
          }}
        />
      </div>

      {kaart && kleur && (
        <div
          style={{
            marginTop: 28,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            animation: "fadeIn 400ms ease-out 800ms both",
          }}
        >
          <span
            className="font-cinzel"
            style={{
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "3px",
              color: "#FFD700",
              marginBottom: 12,
              textShadow: "0 0 12px rgba(255,215,0,0.6)",
            }}
          >
            NIEUWE KAART ONTGRENDELD!
          </span>
          <div
            style={{
              width: 180,
              height: 220,
              borderRadius: 16,
              background: `radial-gradient(ellipse at 50% 35%, ${kleur.border}33 0%, transparent 65%), linear-gradient(160deg, #1a1200, #2d2000)`,
              border: `2px solid ${kleur.border}`,
              boxShadow: `0 0 30px ${kleur.border}88`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 12,
              animation: "cardFlipIn 500ms cubic-bezier(.34,1.56,.64,1) 900ms both",
              transformStyle: "preserve-3d",
              position: "relative",
            }}
          >
            <span
              className="font-cinzel"
              style={{
                position: "absolute",
                top: 8,
                left: 8,
                fontSize: 8,
                fontWeight: 700,
                letterSpacing: "1.5px",
                padding: "2px 6px",
                borderRadius: 6,
                background: `${kleur.border}33`,
                color: kleur.accent,
              }}
            >
              {kleur.label}
            </span>
            <div
              aria-hidden
              style={{
                width: 140,
                height: 140,
                marginTop: 24,
                backgroundImage: `url('${kaart.sprite}')`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                imageRendering: "pixelated",
                filter: `drop-shadow(0 0 14px ${kleur.border}AA)`,
                animation: "spriteBounce 2s ease-in-out infinite",
              }}
            />
            <div style={{ flex: 1 }} />
            <span
              className="font-cinzel"
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#FFF5E4",
                letterSpacing: "1px",
              }}
            >
              {kaart.naam}
            </span>
          </div>
        </div>
      )}

      {overigeRewards.length > 0 && (
        <div
          style={{
            marginTop: 24,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 10,
            maxWidth: 320,
          }}
        >
          {overigeRewards.map((reward, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 12px",
                borderRadius: 12,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,179,71,0.3)",
                animation: `slide-up 400ms ease-out ${(0.9 + i * 0.18).toFixed(2)}s both`,
              }}
            >
              {reward.coins !== undefined && (
                <>
                  <span style={{ fontSize: 22 }}>{COIN_EMOJI}</span>
                  <span
                    className="font-cinzel"
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#FFD700",
                    }}
                  >
                    +{reward.coins}
                  </span>
                </>
              )}
              {reward.resource && reward.resourceAmount !== undefined && (
                <>
                  <span style={{ fontSize: 22 }}>
                    {RESOURCE_EMOJI[reward.resource]}
                  </span>
                  <span
                    className="font-cinzel"
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#FFF5E4",
                    }}
                  >
                    +{reward.resourceAmount}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {magSluiten && (
        <span
          className="font-cinzel"
          style={{
            position: "absolute",
            bottom: 32,
            color: "#C4A882",
            opacity: 0.7,
            fontSize: 11,
            letterSpacing: "2px",
            animation: "tap-pulse 1.4s ease-in-out infinite",
          }}
        >
          TAP OM DOOR TE GAAN
        </span>
      )}
    </div>
  );
}
