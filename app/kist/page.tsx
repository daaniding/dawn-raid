"use client";

import ChestItem, { type Rarity } from "@/components/kist/ChestItem";
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
type ChestSize = "small" | "medium" | "large" | "mega";
type Phase = "idle" | "tapping" | "opening" | "items" | "done";

type ChestConfig = {
  label: string;
  labelColor: string;
  accent: string;
  glowRGBA: (a: number) => string;
  closedRow: number;
  openRow: number;
};

const CHESTS: Record<ChestType, ChestConfig> = {
  bronze: {
    label: "BRONZEN KIST",
    labelColor: "#CD7F32",
    accent: "#CD7F32",
    glowRGBA: (a) => `rgba(205, 127, 50, ${a})`,
    closedRow: 0,
    openRow: 1,
  },
  silver: {
    label: "ZILVEREN KIST",
    labelColor: "#C0C0C0",
    accent: "#C0C0C0",
    glowRGBA: (a) => `rgba(192, 192, 192, ${a})`,
    closedRow: 2,
    openRow: 3,
  },
  epic: {
    label: "GOUDEN KIST",
    labelColor: "#FFD700",
    accent: "#FFD700",
    glowRGBA: (a) => `rgba(255, 215, 0, ${a})`,
    closedRow: 4,
    openRow: 5,
  },
  legendary: {
    label: "LEGENDARISCHE KIST",
    labelColor: "#64C8FF",
    accent: "#64C8FF",
    glowRGBA: (a) => `rgba(100, 200, 255, ${a})`,
    closedRow: 6,
    openRow: 7,
  },
};

const SIZE_SPEC: Record<
  ChestSize,
  { scale: number; glowAlpha: number; idleMs: number }
> = {
  small:  { scale: 1.0, glowAlpha: 0.4,  idleMs: 200 },
  medium: { scale: 1.4, glowAlpha: 0.55, idleMs: 150 },
  large:  { scale: 1.8, glowAlpha: 0.7,  idleMs: 150 },
  mega:   { scale: 2.4, glowAlpha: 0.9,  idleMs: 120 },
};

type Item = { name: string; icon: "sword" | "coin" | "castle"; rarity: Rarity };
const ITEMS_BY_SIZE: Record<ChestSize, Item[]> = {
  small: [
    { name: "Boogschutter", icon: "sword", rarity: "common" },
    { name: "50 Coins", icon: "coin", rarity: "common" },
  ],
  medium: [
    { name: "Boogschutter", icon: "sword", rarity: "rare" },
    { name: "150 Coins", icon: "coin", rarity: "common" },
    { name: "Hout x5", icon: "castle", rarity: "rare" },
  ],
  large: [
    { name: "Dark Knight", icon: "sword", rarity: "epic" },
    { name: "300 Coins", icon: "coin", rarity: "rare" },
    { name: "Hout x10", icon: "castle", rarity: "rare" },
    { name: "Dorp Upgrade", icon: "castle", rarity: "epic" },
  ],
  mega: [
    { name: "Samurai", icon: "sword", rarity: "legendary" },
    { name: "500 Coins", icon: "coin", rarity: "epic" },
    { name: "Hout x20", icon: "castle", rarity: "epic" },
    { name: "Dorp Upgrade", icon: "castle", rarity: "epic" },
    { name: "Geheim Held", icon: "sword", rarity: "legendary" },
  ],
};

function renderIcon(id: Item["icon"]) {
  if (id === "sword") return <SwordIcon size={28} />;
  if (id === "coin") return <CoinsIcon size={28} />;
  return <CastleIcon size={28} />;
}

function rand(min: number, max: number) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

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

  const isWinter = useMemo(() => {
    const m = new Date().getMonth();
    return m === 11 || m === 0;
  }, []);
  const sheet = isWinter
    ? "/assets/chests/Animated%20Chests/Chests_Snow.png"
    : "/assets/chests/Animated%20Chests/Chests.png";

  const [chestSize, setChestSize] = useState<ChestSize>("small");
  const [tapCount, setTapCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [col, setCol] = useState(0);
  const [row, setRow] = useState(chest.closedRow);
  const [shakeKey, setShakeKey] = useState(0);
  const [bigShake, setBigShake] = useState(false);
  const [flashLayers, setFlashLayers] = useState(0); // 0..3
  const [flashKey, setFlashKey] = useState(0);
  const [screenShaking, setScreenShaking] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showTapPrompt, setShowTapPrompt] = useState(false);
  const [ringKey, setRingKey] = useState(0);
  const [popupText, setPopupText] = useState<string | null>(null);
  const [popupKey, setPopupKey] = useState(0);

  // Random thresholds fixed for this session
  const thresholdsRef = useRef<{
    medium: number;
    large: number;
    mega: number;
    open: number;
  } | null>(null);
  if (!thresholdsRef.current) {
    thresholdsRef.current = {
      medium: rand(2, 4),
      large: rand(5, 8),
      mega: rand(9, 13),
      open: rand(14, 18),
    };
  }
  const thresholds = thresholdsRef.current;

  // Size snapshot at opening, for item array selection
  const finalSizeRef = useRef<ChestSize>("small");

  // Tap prompt after 500ms
  useEffect(() => {
    const id = setTimeout(() => setShowTapPrompt(true), 500);
    return () => clearTimeout(id);
  }, []);

  // Idle frame loop — speed scales with size
  useEffect(() => {
    if (phase !== "idle" && phase !== "tapping") return;
    const id = setInterval(() => {
      setCol((c) => (c + 1) % 5);
    }, SIZE_SPEC[chestSize].idleMs);
    return () => clearInterval(id);
  }, [phase, chestSize]);

  // Audio helper
  const playSound = (
    tones: { freq: number; start: number; gain: number; duration?: number }[],
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
        const d = t.duration ?? 0.4;
        gain.gain.setValueAtTime(t.gain, s);
        gain.gain.exponentialRampToValueAtTime(0.001, s + d);
        osc.start(s);
        osc.stop(s + d + 0.05);
      });
    } catch {
      /* audio unavailable */
    }
  };

  const triggerSizeUpgrade = (newSize: ChestSize) => {
    setChestSize(newSize);
    setRingKey((k) => k + 1);
    const label =
      newSize === "medium"
        ? "+GROTER!"
        : newSize === "large"
          ? "++GROTER!!"
          : "MEGA KIST!!!";
    setPopupText(label);
    setPopupKey((k) => k + 1);
    window.setTimeout(() => setPopupText(null), 820);
    playSound([
      { freq: 600, start: 0, gain: 0.3, duration: 0.15 },
      { freq: 800, start: 0.15, gain: 0.3, duration: 0.15 },
      { freq: 1000, start: 0.3, gain: 0.3, duration: 0.15 },
    ]);
    if (newSize === "mega") {
      window.setTimeout(() => {
        playSound([
          { freq: 523, start: 0, gain: 0.3 },
          { freq: 659, start: 0.1, gain: 0.3 },
          { freq: 784, start: 0.2, gain: 0.3 },
          { freq: 1047, start: 0.3, gain: 0.3 },
          { freq: 1319, start: 0.4, gain: 0.3 },
        ]);
      }, 350);
    }
  };

  const startOpening = () => {
    finalSizeRef.current = chestSize;
    setPhase("opening");
    setBigShake(true);
    setRow(chest.openRow);
    setCol(0);

    const flashCount =
      chestSize === "mega" ? 3 : chestSize === "large" ? 2 : 1;
    setFlashLayers(flashCount);
    setFlashKey((k) => k + 1);

    if (chestSize === "mega") {
      setScreenShaking(true);
      window.setTimeout(() => setScreenShaking(false), 1000);
    }

    window.setTimeout(() => setCol(1), 400);
    window.setTimeout(() => setCol(2), 500);
    window.setTimeout(() => {
      playSound([
        { freq: 523, start: 0, gain: 0.25 },
        { freq: 659, start: 0.15, gain: 0.25 },
        { freq: 784, start: 0.3, gain: 0.25 },
        { freq: 1047, start: 0.45, gain: 0.25 },
      ]);
    }, 500);
    window.setTimeout(() => setBigShake(false), 600);
    window.setTimeout(() => setFlashLayers(0), 1000);
    window.setTimeout(() => {
      setPhase("items");
      setShowItems(true);
    }, 1200);
    window.setTimeout(() => {
      setShowContinue(true);
      setPhase("done");
    }, 2000);
  };

  const handleTap = () => {
    if (phase !== "idle" && phase !== "tapping") return;
    if (phase === "idle") {
      setPhase("tapping");
      setShowTapPrompt(false);
    }
    const next = tapCount + 1;
    setTapCount(next);
    setShakeKey((k) => k + 1);

    // tap sound
    const freq = Math.min(800, 300 + next * 40);
    playSound([{ freq, start: 0, gain: 0.15, duration: 0.1 }]);

    // size upgrades: evaluate highest reached threshold
    if (next >= thresholds.open) {
      // snap to mega (or keep current if already mega) then open
      if (chestSize !== "mega") {
        triggerSizeUpgrade("mega");
      }
      window.setTimeout(startOpening, 260);
      return;
    }
    if (next >= thresholds.mega && chestSize !== "mega") {
      triggerSizeUpgrade("mega");
    } else if (
      next >= thresholds.large &&
      chestSize !== "large" &&
      chestSize !== "mega"
    ) {
      triggerSizeUpgrade("large");
    } else if (
      next >= thresholds.medium &&
      chestSize === "small"
    ) {
      triggerSizeUpgrade("medium");
    }
  };

  const progress = Math.min(1, tapCount / thresholds.open);
  const sizeSpec = SIZE_SPEC[chestSize];

  const itemList = phase === "items" || phase === "done"
    ? ITEMS_BY_SIZE[finalSizeRef.current]
    : [];

  return (
    <div
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden"
      style={{
        maxWidth: 430,
        marginInline: "auto",
        background:
          "radial-gradient(ellipse at 50% 0%, #2d1a00 0%, var(--bg-mid) 35%, var(--bg-dark) 100%)",
        animation: screenShaking
          ? "screen-shake 0.15s linear infinite"
          : undefined,
      }}
    >
      {/* Radial glow, grows with size */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${chest.glowRGBA(0.08 + 0.28 * progress)} 0%, rgba(0,0,0,0) ${60 + 20 * progress}%)`,
          transition: "background 400ms ease",
        }}
      />

      {/* Ambient particles */}
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

      {/* Main */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-6">
        {/* Chest stage: size-scale wrapper > ambient-shake wrapper > sprite */}
        <div
          className="relative flex items-center justify-center"
          style={{
            width: 360,
            height: 360,
          }}
        >
          {/* Popup text */}
          {popupText && (
            <span
              key={popupKey}
              className="font-cinzel absolute"
              style={{
                top: 30,
                left: "50%",
                fontSize: 20,
                fontWeight: 700,
                color: "#FFD700",
                textShadow: "0 0 12px rgba(255, 215, 0, 0.8)",
                whiteSpace: "nowrap",
                animation: "popup-text 800ms ease-out forwards",
                zIndex: 3,
              }}
            >
              {popupText}
            </span>
          )}

          {/* Expanding ring on size upgrade */}
          {ringKey > 0 && (
            <span
              key={ringKey}
              aria-hidden
              className="absolute pointer-events-none"
              style={{
                left: "50%",
                top: "50%",
                width: 180,
                height: 180,
                border: `3px solid ${chest.accent}`,
                borderRadius: "50%",
                animation: "ring-expand 400ms ease-out forwards",
                zIndex: 1,
              }}
            />
          )}

          {/* Size scale wrapper (elastic) */}
          <div
            style={{
              transform: `scale(${sizeSpec.scale})`,
              transition:
                "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            {/* Ambient shake wrapper (large/mega constant) */}
            <div
              style={{
                animation:
                  chestSize === "mega"
                    ? "mega-shake 0.15s linear infinite"
                    : chestSize === "large"
                      ? "gentle-shake 0.3s linear infinite"
                      : undefined,
              }}
            >
              <div className="relative">
                <ChestSprite
                  src={sheet}
                  row={row}
                  col={col}
                  glowColor={chest.glowRGBA(sizeSpec.glowAlpha)}
                  progress={progress}
                  shakeKey={shakeKey}
                  bigShake={bigShake}
                  onClick={
                    phase === "idle" || phase === "tapping"
                      ? handleTap
                      : undefined
                  }
                />
                <TapParticle color={chest.accent} burstKey={shakeKey} />
                <ExplosionParticles
                  active={phase === "opening" || phase === "items"}
                  accentColor={chest.accent}
                />
              </div>
            </div>
          </div>

          {/* Steam wisps */}
          {(chestSize === "medium" ||
            chestSize === "large" ||
            chestSize === "mega") &&
            (phase === "idle" || phase === "tapping") && (
              <>
                {Array.from({
                  length:
                    chestSize === "medium"
                      ? 2
                      : chestSize === "large"
                        ? 4
                        : 6,
                }).map((_, i) => (
                  <span
                    key={i}
                    aria-hidden
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      width: 8,
                      height: 8,
                      left: `${20 + ((i * 17) % 60)}%`,
                      top: `${20 + ((i * 13) % 60)}%`,
                      background: chest.accent,
                      filter: "blur(4px)",
                      animation: `steam-pulse 2s ease-in-out ${i * 0.3}s infinite`,
                      zIndex: 0,
                    }}
                  />
                ))}
              </>
            )}

          {/* Orbit particles at mega */}
          {chestSize === "mega" && (phase === "idle" || phase === "tapping") && (
            <>
              {Array.from({ length: 8 }).map((_, i) => (
                <span
                  key={i}
                  aria-hidden
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: 8,
                    height: 8,
                    marginLeft: -4,
                    marginTop: -4,
                    background: "#FFD700",
                    boxShadow: "0 0 8px rgba(255, 215, 0, 0.9)",
                    animation: `orbit 3s linear ${(i * 3) / 8}s infinite`,
                    zIndex: 0,
                  }}
                />
              ))}
            </>
          )}
        </div>

        {/* Idle prompt */}
        {phase === "idle" && showTapPrompt && (
          <div className="flex flex-col items-center" style={{ marginTop: 24 }}>
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
              TAP DE KIST
            </span>
          </div>
        )}

        {/* Items */}
        {showItems && (
          <div
            className="flex flex-col items-center"
            style={{ marginTop: 28, width: "100%", maxWidth: 420 }}
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
            <div
              className="flex w-full flex-wrap justify-center"
              style={{ gap: 8 }}
            >
              {itemList.map((it, idx) => (
                <ChestItem
                  key={idx}
                  icon={renderIcon(it.icon)}
                  name={it.name}
                  rarity={it.rarity}
                  delayMs={idx * 200}
                />
              ))}
            </div>
          </div>
        )}

        {/* Continue */}
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

      {/* Flash overlays (stacked for double/triple) */}
      {flashLayers > 0 &&
        Array.from({ length: flashLayers }).map((_, i) => (
          <div
            key={`${flashKey}-${i}`}
            aria-hidden
            className="pointer-events-none fixed inset-0 z-50"
            style={{
              background: "#fff",
              animation: `flash-overlay 500ms ease-out ${i * 150}ms forwards`,
            }}
          />
        ))}
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
