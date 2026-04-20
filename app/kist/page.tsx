"use client";

import ChestItem from "@/components/kist/ChestItem";
import ChestSprite from "@/components/kist/ChestSprite";
import ExplosionParticles from "@/components/kist/ExplosionParticles";
import TapParticle from "@/components/kist/TapParticle";
import {
  CastleIcon,
  CoinsIcon,
  SwordIcon,
} from "@/components/ui/GameIcon";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";

type ChestType = "bronze" | "silver" | "epic" | "legendary";

type ChestConfig = {
  label: string;
  labelColor: string;
  accent: string; // glow + progressbar fill
  glowRGBA: (a: number) => string;
  closedRow: number;
  openRow: number;
  taps: number;
};

const CHESTS: Record<ChestType, ChestConfig> = {
  bronze: {
    label: "BRONZEN KIST",
    labelColor: "#CD7F32",
    accent: "#CD7F32",
    glowRGBA: (a) => `rgba(205, 127, 50, ${a})`,
    closedRow: 0,
    openRow: 1,
    taps: 3,
  },
  silver: {
    label: "ZILVEREN KIST",
    labelColor: "#C0C0C0",
    accent: "#C0C0C0",
    glowRGBA: (a) => `rgba(192, 192, 192, ${a})`,
    closedRow: 2,
    openRow: 3,
    taps: 5,
  },
  epic: {
    label: "GOUDEN KIST",
    labelColor: "#FFD700",
    accent: "#FFD700",
    glowRGBA: (a) => `rgba(255, 215, 0, ${a})`,
    closedRow: 4,
    openRow: 5,
    taps: 8,
  },
  legendary: {
    label: "LEGENDARISCHE KIST",
    labelColor: "#64C8FF",
    accent: "#64C8FF",
    glowRGBA: (a) => `rgba(100, 200, 255, ${a})`,
    closedRow: 6,
    openRow: 7,
    taps: 12,
  },
};

const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  size: 3 + ((i * 5) % 4),
  left: (i * 53) % 100,
  duration: 8 + ((i * 3) % 5),
  delay: -((i * 11) % 8),
  drift: ((i * 17) % 40) - 20,
  opacity: 0.5 + ((i * 13) % 3) * 0.1,
}));

function KistView() {
  const router = useRouter();
  const params = useSearchParams();
  const typeParam = (params.get("type") ?? "bronze").toLowerCase() as ChestType;
  const chest = CHESTS[typeParam] ?? CHESTS.bronze;

  // Winter variant
  const isWinter = useMemo(() => {
    const m = new Date().getMonth();
    return m === 11 || m === 0;
  }, []);
  const sheet = isWinter
    ? "/assets/chests/Animated%20Chests/Chests_Snow.png"
    : "/assets/chests/Animated%20Chests/Chests.png";

  type Phase = "idle" | "tapping" | "opening" | "open" | "items" | "done";
  const [phase, setPhase] = useState<Phase>("idle");
  const [tapsLeft, setTapsLeft] = useState(chest.taps);
  const [tapsTotal] = useState(chest.taps);
  const [col, setCol] = useState(0); // current animation column
  const [row, setRow] = useState(chest.closedRow);
  const [tapCounter, setTapCounter] = useState(0); // triggers shake re-run
  const [bigShake, setBigShake] = useState(false);
  const [showTapPrompt, setShowTapPrompt] = useState(false);
  const [flash, setFlash] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const tapCountRef = useRef(0); // cumulative taps ever, for frequency

  const progress = (tapsTotal - tapsLeft) / tapsTotal;

  // Audio
  const playSound = (
    tones: { freq: number; start: number; gain: number }[],
  ) => {
    try {
      const Ctx =
        (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext) as typeof AudioContext;
      const ctx = new Ctx();
      tones.forEach((t) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = t.freq;
        osc.connect(gain);
        gain.connect(ctx.destination);
        const s = ctx.currentTime + t.start;
        gain.gain.setValueAtTime(t.gain, s);
        gain.gain.exponentialRampToValueAtTime(0.001, s + 0.4);
        osc.start(s);
        osc.stop(s + 0.45);
      });
    } catch {
      /* audio unavailable */
    }
  };

  // Idle prompt appears after 500ms
  useEffect(() => {
    const id = setTimeout(() => setShowTapPrompt(true), 500);
    return () => clearTimeout(id);
  }, []);

  // Closed idle: cycle col 0→4 at 200ms during idle/tapping
  useEffect(() => {
    if (phase !== "idle" && phase !== "tapping") return;
    const id = setInterval(() => {
      setCol((c) => (c + 1) % 5);
    }, 200);
    return () => clearInterval(id);
  }, [phase]);

  const handleTap = () => {
    if (phase === "idle") {
      setPhase("tapping");
      setShowTapPrompt(false);
    }
    if (phase !== "idle" && phase !== "tapping") return;

    // per-tap sound, frequency climbs
    const idx = tapCountRef.current;
    tapCountRef.current = idx + 1;
    playSound([{ freq: 300 + idx * 50, start: 0, gain: 0.15 }]);

    setTapCounter((x) => x + 1); // re-triggers shake key
    setTapsLeft((t) => {
      const next = t - 1;
      if (next <= 0) {
        // Fire opening pipeline
        startOpening();
        return 0;
      }
      return next;
    });
  };

  const startOpening = () => {
    setPhase("opening");
    setBigShake(true);
    setRow(chest.openRow);
    setCol(0);

    // frame progression on openRow
    setTimeout(() => setCol(1), 400); // deksel achterover
    setTimeout(() => setCol(2), 500); // open idle
    setTimeout(() => {
      setFlash(true);
      playSound([
        { freq: 523, start: 0, gain: 0.25 },
        { freq: 659, start: 0.15, gain: 0.25 },
        { freq: 784, start: 0.3, gain: 0.25 },
        { freq: 1047, start: 0.45, gain: 0.25 },
      ]);
    }, 500);
    setTimeout(() => setBigShake(false), 600);
    setTimeout(() => setFlash(false), 1000);
    setTimeout(() => {
      setPhase("items");
      setShowItems(true);
    }, 1200);
    setTimeout(() => {
      setShowContinue(true);
      setPhase("done");
    }, 2000);
  };

  return (
    <div
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden"
      style={{
        maxWidth: 430,
        marginInline: "auto",
        background:
          "radial-gradient(ellipse at 50% 0%, #2d1a00 0%, var(--bg-mid) 35%, var(--bg-dark) 100%)",
      }}
    >
      {/* Background glow, intensifies with progress */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${chest.glowRGBA(0.08 + 0.2 * progress)} 0%, rgba(0,0,0,0) 60%)`,
          transition: "background 300ms ease",
        }}
      />

      {/* Particles */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.left}%`,
              bottom: -10,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              ["--drift" as string]: `${p.drift}px`,
              opacity: p.opacity,
              boxShadow: `0 0 6px ${chest.glowRGBA(0.6)}`,
            }}
          />
        ))}
      </div>

      {/* Top bar */}
      <div
        className="relative z-10 flex items-center justify-between"
        style={{ height: 56, padding: "0 16px" }}
      >
        <div className="flex items-center" style={{ width: "25%" }}>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="font-cinzel"
            style={{
              fontSize: 11,
              letterSpacing: "2px",
              color: "#C4A882",
              cursor: "pointer",
            }}
          >
            ← TERUG
          </button>
        </div>
        <div
          className="flex items-center justify-center"
          style={{ width: "50%", minWidth: 0 }}
        >
          <span
            className="font-cinzel"
            style={{
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "3px",
              color: chest.labelColor,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "100%",
            }}
          >
            {chest.label}
          </span>
        </div>
        <div style={{ width: "25%" }} />
      </div>

      {/* Main area */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-6">
        {/* Steam wisps during tapping */}
        {phase === "tapping" && progress > 0 && (
          <div
            aria-hidden
            className="pointer-events-none absolute"
            style={{
              width: 288,
              height: 192,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 6,
                  height: 6,
                  left: `${15 + i * 25}%`,
                  top: `${20 + (i % 2) * 10}%`,
                  background: chest.accent,
                  filter: "blur(4px)",
                  animation: `steam-pulse 1.5s ease-in-out ${i * 0.25}s infinite`,
                }}
              />
            ))}
          </div>
        )}

        <div className="relative">
          <ChestSprite
            src={sheet}
            row={row}
            col={col}
            glowColor={chest.glowRGBA(0.8)}
            progress={progress}
            shakeKey={tapCounter}
            bigShake={bigShake}
            onClick={
              phase === "idle" || phase === "tapping" ? handleTap : undefined
            }
          />
          <TapParticle color={chest.accent} burstKey={tapCounter} />
          <ExplosionParticles
            active={phase === "opening" || phase === "items"}
            accentColor={chest.accent}
          />
        </div>

        {/* Idle prompt */}
        {phase === "idle" && showTapPrompt && (
          <div
            className="flex flex-col items-center"
            style={{ marginTop: 24 }}
          >
            <span
              aria-hidden
              style={{
                fontSize: 22,
                color: chest.labelColor,
                animation: "arrow-bounce 1s ease-in-out infinite",
              }}
            >
              ↑
            </span>
            <span
              className="font-cinzel"
              style={{
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: "3px",
                color: chest.labelColor,
                animation: "tap-pulse 1.5s ease-in-out infinite",
                marginTop: 6,
              }}
            >
              TAP OM TE BEGINNEN
            </span>
          </div>
        )}

        {/* Tapping: progress bar + counter */}
        {phase === "tapping" && (
          <div
            className="flex flex-col items-center"
            style={{ marginTop: 24, width: 288 }}
          >
            <div
              className="relative overflow-hidden"
              style={{
                width: "100%",
                height: 8,
                background: "rgba(45, 26, 0, 0.8)",
                border: "1px solid var(--gold-dark)",
                borderRadius: 4,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress * 100}%`,
                  background: chest.accent,
                  boxShadow: `0 0 6px ${chest.accent}`,
                  transition: "width 150ms ease-out",
                }}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              {tapsLeft === 1 ? (
                <span
                  className="font-cinzel"
                  style={{
                    display: "inline-block",
                    fontSize: 24,
                    fontWeight: 700,
                    letterSpacing: "2px",
                    color: "#FFD700",
                    animation: "last-tap 0.5s ease-in-out infinite",
                  }}
                >
                  LAATSTE TAP!
                </span>
              ) : (
                <span
                  className="font-cinzel"
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    letterSpacing: "2px",
                    color: chest.labelColor,
                  }}
                >
                  NOG {tapsLeft} TAPS
                </span>
              )}
            </div>
          </div>
        )}

        {/* Items */}
        {showItems && (
          <div
            className="flex flex-col items-center"
            style={{ marginTop: 28, width: "100%", maxWidth: 360 }}
          >
            <span
              className="font-cinzel"
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "3px",
                color: "#C4A882",
                marginBottom: 12,
                animation: "slide-up 300ms ease-out both",
              }}
            >
              JE HEBT ONTVANGEN
            </span>
            <div className="flex w-full" style={{ gap: 8 }}>
              <ChestItem
                icon={<SwordIcon size={28} />}
                name="Boogschutter"
                rarity="rare"
                delayMs={0}
              />
              <ChestItem
                icon={<CoinsIcon size={28} />}
                name="150 Coins"
                rarity="common"
                delayMs={250}
              />
              <ChestItem
                icon={<CastleIcon size={28} />}
                name="Dorp Upgrade"
                rarity="epic"
                delayMs={500}
              />
            </div>
          </div>
        )}

        {/* Continue button */}
        {showContinue && (
          <button
            type="button"
            onClick={() => router.push("/")}
            className="font-cinzel select-none"
            style={{
              marginTop: 28,
              width: "calc(100% - 32px)",
              maxWidth: 380,
              height: 60,
              borderRadius: 16,
              border: "none",
              background:
                "linear-gradient(180deg, var(--amber) 0%, var(--red-action) 100%)",
              color: "#FFF5E4",
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: "3px",
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
              boxShadow:
                "0 6px 0 #8B2500, 0 8px 20px rgba(192, 57, 43, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              cursor: "pointer",
              animation: "slide-up 300ms ease-out both",
            }}
          >
            DOORGAAN
          </button>
        )}
      </main>

      {/* Full-screen flash on opening */}
      {flash && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-50"
          style={{
            background: "#fff",
            animation: "flash-overlay 500ms ease-out forwards",
          }}
        />
      )}
    </div>
  );
}

export default function KistPage() {
  return (
    <Suspense fallback={null}>
      <KistView />
    </Suspense>
  );
}
