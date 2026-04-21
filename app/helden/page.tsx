"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  kaarten as KAARTEN,
  RARITY_COLORS,
  kaartenNodigVoorLevel,
  type Kaart,
} from "@/lib/kaarten";
import { getOrCreateUserId } from "@/lib/userId";

type KaartState = { level: number; kaarten: number; ontgrendeld: boolean };
type Filter = "alles" | "helden" | "npcs";
type Sortering = "level" | "rarity" | "type" | "naam";

const RARITY_ORDE: Record<string, number> = {
  legendarisch: 0,
  episch: 1,
  zeldzaam: 2,
  gewoon: 3,
};

const STAT_LABELS: Array<{ key: keyof Kaart["stats"]; label: string }> = [
  { key: "aanval", label: "AANVAL" },
  { key: "verdediging", label: "VERDEDIGING" },
  { key: "snelheid", label: "SNELHEID" },
  { key: "speciale", label: "SPECIAAL" },
];

export default function HeldenPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");
  const [state, setState] = useState<Record<string, KaartState>>({});
  const [filter, setFilter] = useState<Filter>("alles");
  const [sortering, setSortering] = useState<Sortering>("level");
  const [sorteerRichting, setSorteerRichting] = useState<"asc" | "desc">(
    "desc",
  );

  const handleSorteer = (optie: Sortering) => {
    if (optie === sortering) {
      setSorteerRichting((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortering(optie);
      setSorteerRichting("desc");
    }
  };
  const [geselecteerd, setGeselecteerd] = useState<Kaart | null>(null);
  const [laden, setLaden] = useState(true);

  useEffect(() => {
    const id = getOrCreateUserId();
    setUserId(id);
    (async () => {
      try {
        const r = await fetch(`/api/kaarten?userId=${id}`);
        const j = await r.json();
        setState(j.state ?? {});
      } catch {
        /* ignore */
      } finally {
        setLaden(false);
      }
    })();
  }, []);

  const zichtbaar = useMemo(() => {
    const basis =
      filter === "helden"
        ? KAARTEN.filter((k) => k.type === "held")
        : filter === "npcs"
          ? KAARTEN.filter((k) => k.type === "npc")
          : [...KAARTEN];

    const ontgrendeld = (id: string) => (state[id]?.level ?? 0) > 0;
    const levelVan = (id: string) => state[id]?.level ?? 0;

    const richting = sorteerRichting === "asc" ? -1 : 1;

    return basis.sort((a, b) => {
      // Vergrendelde kaarten altijd onderaan, ongeacht richting
      const aU = ontgrendeld(a.id);
      const bU = ontgrendeld(b.id);
      if (aU && !bU) return -1;
      if (!aU && bU) return 1;

      if (sortering === "rarity") {
        return (RARITY_ORDE[a.rarity] - RARITY_ORDE[b.rarity]) * richting;
      }
      if (sortering === "type") {
        if (a.type === b.type) return 0;
        // desc: helden eerst; asc: npcs eerst
        return (a.type === "held" ? -1 : 1) * richting;
      }
      if (sortering === "naam") {
        return a.naam.localeCompare(b.naam) * -richting;
      }
      // level: desc = hoog→laag, asc = laag→hoog
      return (levelVan(b.id) - levelVan(a.id)) * richting;
    });
  }, [filter, sortering, sorteerRichting, state]);

  const doeUpgrade = async (kaartId: string) => {
    const r = await fetch("/api/kaarten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, actie: "upgrade", kaartId }),
    });
    const j = await r.json();
    if (j.state) {
      setState((prev) => ({ ...prev, [kaartId]: j.state }));
      // XP voor upgrade
      fetch("/api/xp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          amount: 20,
          bron: "kaart_upgrade",
        }),
      })
        .then((res) => res.json())
        .then((xp) => {
          if (xp?.levelUp) {
            window.localStorage.setItem(
              "dawnraid:pendingLevelUp",
              JSON.stringify(xp),
            );
          }
        })
        .catch(() => {});
    }
  };

  return (
    <div
      className="relative min-h-[100svh] w-full"
      style={{
        maxWidth: 430,
        marginInline: "auto",
        background:
          "radial-gradient(ellipse at 50% 0%, #2d1a00 0%, var(--bg-mid) 35%, var(--bg-dark) 100%)",
      }}
    >
      {/* Top bar */}
      <div
        className="fixed left-1/2 -translate-x-1/2 flex items-center"
        style={{
          top: 0,
          height: 56,
          width: "100%",
          maxWidth: 430,
          padding: "0 16px",
          zIndex: 20,
          background: "var(--bg-dark)",
          borderBottom: "1px solid rgba(255, 179, 71, 0.2)",
        }}
      >
        <button
          type="button"
          onClick={() => router.push("/")}
          className="font-cinzel"
          style={{
            fontSize: 11,
            letterSpacing: "2px",
            color: "#C4A882",
            cursor: "pointer",
            width: 80,
            textAlign: "left",
          }}
        >
          ← TERUG
        </button>
        <span
          className="font-cinzel flex-1 text-center"
          style={{
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "4px",
            color: "#FFD700",
          }}
        >
          KAARTEN
        </span>
        <div style={{ width: 80 }} />
      </div>

      {/* Filter tabs */}
      <div
        style={{
          position: "sticky",
          top: 56,
          zIndex: 19,
          display: "flex",
          justifyContent: "center",
          gap: 24,
          height: 44,
          alignItems: "center",
          background: "var(--bg-dark)",
          borderBottom: "1px solid rgba(255, 179, 71, 0.15)",
        }}
      >
        {(["alles", "helden", "npcs"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className="font-cinzel"
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "2px",
              color: filter === f ? "#FFD700" : "#C4A882",
              borderBottom: filter === f ? "2px solid #FFD700" : "2px solid transparent",
              padding: "6px 2px",
              background: "transparent",
              cursor: "pointer",
              transition: "color 150ms, border-color 150ms",
            }}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Sort pills */}
      <div
        style={{
          position: "sticky",
          top: 100,
          zIndex: 18,
          display: "flex",
          justifyContent: "center",
          gap: 18,
          height: 36,
          alignItems: "center",
          background: "var(--bg-dark)",
          borderBottom: "1px solid rgba(255, 179, 71, 0.1)",
        }}
      >
        {(["level", "rarity", "type", "naam"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => handleSorteer(s)}
            className="font-cinzel"
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "1.5px",
              color: sortering === s ? "#FFD700" : "#8a7862",
              borderBottom:
                sortering === s ? "2px solid #FFD700" : "2px solid transparent",
              padding: "4px 2px",
              background: "transparent",
              cursor: "pointer",
              transition: "color 150ms, border-color 150ms",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {s.toUpperCase()}
            {sortering === s && (
              <span style={{ fontSize: 10, lineHeight: 1 }}>
                {sorteerRichting === "asc" ? "↑" : "↓"}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        style={{
          paddingTop: 148,
          paddingBottom: 90,
          paddingInline: 16,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
        }}
      >
        {laden
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: 200,
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.03)",
                  animation: "tap-pulse 1.5s ease-in-out infinite",
                }}
              />
            ))
          : zichtbaar.map((k, i) => {
              const s = state[k.id] ?? {
                level: 0,
                kaarten: 0,
                ontgrendeld: false,
              };
              return (
                <KaartTegel
                  key={k.id}
                  kaart={k}
                  state={s}
                  index={i}
                  onClick={() => setGeselecteerd(k)}
                />
              );
            })}
      </div>

      {geselecteerd && (
        <DetailModal
          kaart={geselecteerd}
          state={
            state[geselecteerd.id] ?? {
              level: 0,
              kaarten: 0,
              ontgrendeld: false,
            }
          }
          onUpgrade={() => doeUpgrade(geselecteerd.id)}
          onClose={() => setGeselecteerd(null)}
        />
      )}
    </div>
  );
}

function KaartTegel({
  kaart,
  state,
  index,
  onClick,
}: {
  kaart: Kaart;
  state: KaartState;
  index: number;
  onClick: () => void;
}) {
  const kleuren = RARITY_COLORS[kaart.rarity];
  const nodig = kaartenNodigVoorLevel(kaart, state.level);
  const kanUpgraden =
    state.ontgrendeld && nodig !== null && state.kaarten >= nodig;

  // Deterministische duur per kaart tussen 2s en 4s
  const hash = Array.from(kaart.id).reduce((a, c) => a + c.charCodeAt(0), 0);
  const floatDuration = 2 + (hash % 20) / 10;
  const floatAnim = state.ontgrendeld
    ? `cardFloat ${floatDuration}s ease-in-out ${(index * 0.3).toFixed(2)}s infinite`
    : undefined;

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        height: 200,
        borderRadius: 16,
        overflow: "hidden",
        position: "relative",
        background: kleuren.bg,
        border: `1.5px solid ${kleuren.border}`,
        padding: 0,
        cursor: "pointer",
        opacity: state.ontgrendeld ? 1 : 0.45,
        animation:
          kaart.rarity === "legendarisch"
            ? "legendary-shimmer 2.5s ease-in-out infinite"
            : undefined,
      }}
    >
      {/* Sprite area */}
      <div
        style={{
          height: "60%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `radial-gradient(ellipse at center, ${kleuren.border}22 0%, transparent 70%)`,
        }}
      >
        <div
          aria-hidden
          style={{
            width: 128,
            height: 128,
            backgroundImage: `url('${kaart.sprite}')`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            imageRendering: "pixelated",
            filter: state.ontgrendeld
              ? `drop-shadow(0 0 12px ${kleuren.border}AA)`
              : "grayscale(1)",
            animation: floatAnim,
            willChange: floatAnim ? "transform" : undefined,
          }}
        />
        {!state.ontgrendeld && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 44,
              color: "#C4A882",
            }}
          >
            🔒
          </div>
        )}

        {/* Rarity badge */}
        <span
          className="font-cinzel"
          style={{
            position: "absolute",
            top: 6,
            left: 6,
            fontSize: 8,
            fontWeight: 700,
            letterSpacing: "1.5px",
            padding: "2px 6px",
            borderRadius: 8,
            background: `${kleuren.border}33`,
            color: kleuren.accent,
          }}
        >
          {kleuren.label}
        </span>

        {/* Type badge */}
        <span
          className="font-cinzel"
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            fontSize: 8,
            fontWeight: 700,
            letterSpacing: "1.5px",
            padding: "2px 6px",
            borderRadius: 8,
            background: "rgba(0,0,0,0.5)",
            color: "#FFF5E4",
          }}
        >
          {kaart.type === "held" ? "HELD" : "NPC"}
        </span>
      </div>

      {/* Info area */}
      <div
        style={{
          height: "40%",
          background: "rgba(0,0,0,0.55)",
          padding: "6px 8px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <span
            className="font-cinzel"
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "1px",
              color: "#FFF5E4",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {kaart.naam}
          </span>
          {state.ontgrendeld && (
            <span
              className="font-cinzel"
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: kleuren.accent,
                letterSpacing: "1px",
              }}
            >
              LVL {state.level}
            </span>
          )}
        </div>

        {/* Mini stat bars */}
        <div style={{ display: "flex", gap: 2, marginTop: 2 }}>
          {STAT_LABELS.map(({ key }) => (
            <div
              key={key}
              style={{
                flex: 1,
                height: 3,
                borderRadius: 2,
                background: "rgba(255,255,255,0.08)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${kaart.stats[key] * 10}%`,
                  height: "100%",
                  background: kleuren.accent,
                }}
              />
            </div>
          ))}
        </div>

        {/* Progressie / upgrade */}
        {state.ontgrendeld && nodig !== null && (
          <div style={{ marginTop: 4 }}>
            {kanUpgraden ? (
              <div
                className="font-cinzel"
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "1px",
                  color: "#6EE7B7",
                  textAlign: "center",
                }}
              >
                ▲ UPGRADE
              </div>
            ) : (
              <div
                className="font-cinzel"
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                  color: "#C4A882",
                  textAlign: "center",
                }}
              >
                {state.kaarten}/{nodig}
              </div>
            )}
          </div>
        )}
        {state.ontgrendeld && nodig === null && (
          <div
            className="font-cinzel"
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: "#FFD700",
              textAlign: "center",
              marginTop: 4,
            }}
          >
            MAX LVL
          </div>
        )}
      </div>
    </button>
  );
}

function DetailModal({
  kaart,
  state,
  onUpgrade,
  onClose,
}: {
  kaart: Kaart;
  state: KaartState;
  onUpgrade: () => void;
  onClose: () => void;
}) {
  const kleuren = RARITY_COLORS[kaart.rarity];
  const nodig = kaartenNodigVoorLevel(kaart, state.level);
  const kanUpgraden =
    state.ontgrendeld && nodig !== null && state.kaarten >= nodig;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 40,
        background: "rgba(0,0,0,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 400,
          width: "100%",
          background: kleuren.bg,
          border: `2px solid ${kleuren.border}`,
          borderRadius: 20,
          padding: 20,
          position: "relative",
          maxHeight: "92vh",
          overflowY: "auto",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="sluit"
          style={{
            position: "absolute",
            top: 10,
            right: 12,
            width: 32,
            height: 32,
            borderRadius: 16,
            background: "rgba(0,0,0,0.45)",
            color: "#FFF5E4",
            fontSize: 18,
            lineHeight: "32px",
            border: "none",
            cursor: "pointer",
          }}
        >
          ×
        </button>

        {/* Sprite */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 260,
            background: `radial-gradient(ellipse at center, ${kleuren.border}33 0%, transparent 65%)`,
            borderRadius: 12,
            marginBottom: 14,
          }}
        >
          <div
            aria-hidden
            style={{
              width: 256,
              height: 256,
              backgroundImage: `url('${kaart.sprite}')`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              imageRendering: "pixelated",
              filter: state.ontgrendeld
                ? `drop-shadow(0 0 24px ${kleuren.border}AA)`
                : "grayscale(1) opacity(0.4)",
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            className="font-cinzel"
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: "#FFF5E4",
              letterSpacing: "2px",
            }}
          >
            {kaart.naam}
          </span>
          <span
            className="font-cinzel"
            style={{
              fontSize: 10,
              fontWeight: 700,
              padding: "3px 8px",
              borderRadius: 10,
              background: `${kleuren.border}33`,
              color: kleuren.accent,
              letterSpacing: "1.5px",
            }}
          >
            {kleuren.label}
          </span>
        </div>

        <p style={{ fontSize: 13, color: "#C4A882", marginTop: 8, lineHeight: 1.5 }}>
          {kaart.beschrijving}
        </p>

        {state.ontgrendeld && (
          <div
            className="font-cinzel"
            style={{
              marginTop: 12,
              fontSize: 13,
              fontWeight: 700,
              color: kleuren.accent,
              letterSpacing: "1.5px",
            }}
          >
            LEVEL {state.level}
            {nodig !== null && (
              <span style={{ color: "#C4A882", fontWeight: 500, marginLeft: 8 }}>
                ({state.kaarten}/{nodig} kaarten voor lvl {state.level + 1})
              </span>
            )}
            {nodig === null && (
              <span style={{ color: "#FFD700", marginLeft: 8 }}>· MAX</span>
            )}
          </div>
        )}

        {/* Stat bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }}>
          {STAT_LABELS.map(({ key, label }) => (
            <div key={key}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#C4A882",
                  letterSpacing: "1px",
                }}
                className="font-cinzel"
              >
                <span>{label}</span>
                <span>{kaart.stats[key]}/10</span>
              </div>
              <div
                style={{
                  height: 8,
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.06)",
                  marginTop: 3,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${kaart.stats[key] * 10}%`,
                    height: "100%",
                    background: kleuren.accent,
                    boxShadow: `0 0 8px ${kleuren.accent}88`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Upgrade knop */}
        {state.ontgrendeld && nodig !== null && (
          <button
            type="button"
            disabled={!kanUpgraden}
            onClick={onUpgrade}
            className="font-cinzel"
            style={{
              marginTop: 18,
              width: "100%",
              height: 52,
              borderRadius: 12,
              border: "none",
              background: kanUpgraden
                ? "linear-gradient(180deg, #3BCB8A 0%, #1F9E65 100%)"
                : "rgba(255,255,255,0.08)",
              color: kanUpgraden ? "#FFF5E4" : "#999",
              fontSize: 16,
              fontWeight: 900,
              letterSpacing: "2px",
              cursor: kanUpgraden ? "pointer" : "not-allowed",
              boxShadow: kanUpgraden
                ? "0 4px 0 #135E3B, 0 6px 16px rgba(59, 203, 138, 0.4)"
                : "none",
            }}
          >
            ▲ UPGRADE NAAR LVL {state.level + 1}
          </button>
        )}

        {!state.ontgrendeld && (
          <div
            className="font-cinzel"
            style={{
              marginTop: 18,
              textAlign: "center",
              fontSize: 13,
              color: "#C4A882",
              letterSpacing: "1px",
            }}
          >
            🔒 NOG NIET ONTGRENDELD — vind kaarten in kisten
          </div>
        )}
      </div>
    </div>
  );
}
