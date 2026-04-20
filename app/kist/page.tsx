"use client";

import ChestItem from "@/components/kist/ChestItem";
import ChestSprite from "@/components/kist/ChestSprite";
import ExplosionParticles from "@/components/kist/ExplosionParticles";
import Smith from "@/components/kist/Smith";
import TapParticle from "@/components/kist/TapParticle";
import {
  CastleIcon,
  CoinsIcon,
  SwordIcon,
} from "@/components/ui/GameIcon";
import {
  ITEM_SETS,
  type ChestSize,
  type ChestType,
  type IconId,
} from "@/components/kist/itemSets";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Phase = "idle" | "tapping" | "opening" | "items" | "done";

type ChestConfig = {
  label: string;
  labelColor: string;
  accent: string;
  rgb: string; // "R, G, B"
  closedRow: number;
  openRow: number;
};

const CHESTS: Record<ChestType, ChestConfig> = {
  bronze: {
    label: "BRONZEN KIST",
    labelColor: "#CD7F32",
    accent: "#CD7F32",
    rgb: "205, 127, 50",
    closedRow: 0,
    openRow: 1,
  },
  silver: {
    label: "ZILVEREN KIST",
    labelColor: "#C0C0C0",
    accent: "#C0C0C0",
    rgb: "192, 192, 192",
    closedRow: 2,
    openRow: 3,
  },
  epic: {
    label: "GOUDEN KIST",
    labelColor: "#FFD700",
    accent: "#FFD700",
    rgb: "255, 215, 0",
    closedRow: 4,
    openRow: 5,
  },
  legendary: {
    label: "LEGENDARISCHE KIST",
    labelColor: "#64C8FF",
    accent: "#64C8FF",
    rgb: "100, 200, 255",
    closedRow: 6,
    openRow: 7,
  },
};

function bgOverlay(size: ChestSize, rgb: string): string {
  switch (size) {
    case "small":
      return `radial-gradient(ellipse 50% 35% at 50% 55%, rgba(${rgb}, 0.08) 0%, transparent 70%)`;
    case "medium":
      return `radial-gradient(ellipse 65% 45% at 50% 55%, rgba(${rgb}, 0.14) 0%, transparent 70%)`;
    case "large":
      return `radial-gradient(ellipse 80% 60% at 50% 55%, rgba(${rgb}, 0.22) 0%, transparent 70%)`;
    case "mega":
      return [
        `radial-gradient(ellipse 100% 80% at 50% 55%, rgba(${rgb}, 0.35) 0%, transparent 65%)`,
        `radial-gradient(ellipse 60% 40% at 50% 60%, rgba(${rgb}, 0.20) 0%, transparent 60%)`,
      ].join(", ");
  }
}

function renderIcon(id: IconId) {
  if (id === "sword") return <SwordIcon size={28} />;
  if (id === "coin") return <CoinsIcon size={28} />;
  return <CastleIcon size={28} />;
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
  const [smithAttacking, setSmithAttacking] = useState(false);
  const [bigShake, setBigShake] = useState(false);
  const [flashLayers, setFlashLayers] = useState(0);
  const [flashKey, setFlashKey] = useState(0);
  const [screenShaking, setScreenShaking] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showTapPrompt, setShowTapPrompt] = useState(false);
  const [ringKey, setRingKey] = useState(0);
  const [openingBurst, setOpeningBurst] = useState(false);
  const [popup, setPopup] = useState<{
    text: string;
    size: number;
    color: string;
    glow?: boolean;
    mega?: boolean;
  } | null>(null);
  const [popupKey, setPopupKey] = useState(0);
  const [itemOffsets, setItemOffsets] = useState<
    { dx: number; dy: number }[]
  >([]);

  // Random thresholds — small ~50%, medium ~20%, large ~17%, mega ~13%
  const thresholdsRef = useRef<{
    medium: number | null;
    large: number | null;
    mega: number | null;
    open: number;
  } | null>(null);
  if (!thresholdsRef.current) {
    const tierRoll = Math.random();
    let openAt: number;
    if (tierRoll < 0.78) {
      // Small: 78% — openAt 3..8
      openAt = Math.floor(Math.random() * 6) + 3;
    } else if (tierRoll < 0.91) {
      // Medium: 13% — openAt 12..16
      openAt = Math.floor(Math.random() * 5) + 12;
    } else if (tierRoll < 0.97) {
      // Large: 6% — openAt 19..22
      openAt = Math.floor(Math.random() * 4) + 19;
    } else {
      // Mega: 3% — openAt 25..27
      openAt = Math.floor(Math.random() * 3) + 25;
    }
    thresholdsRef.current = {
      medium: openAt >= 12 ? Math.floor(openAt * 0.55) : null,
      large: openAt >= 19 ? Math.floor(openAt * 0.72) : null,
      mega: openAt >= 25 ? Math.floor(openAt * 0.88) : null,
      open: openAt,
    };
  }
  const thresholds = thresholdsRef.current;

  // Dynamic scales per viewport
  const scaleRef = useRef<Record<ChestSize, number>>({
    small: 1,
    medium: 1.4,
    large: 1.8,
    mega: 2.4,
  });
  const [scaleReady, setScaleReady] = useState(false);
  useEffect(() => {
    const maxW = window.innerWidth * 0.72;
    const maxH = window.innerHeight * 0.42;
    const max = Math.min(maxW / 288, maxH / 192);
    scaleRef.current = {
      small: max * 0.45,
      medium: max * 0.65,
      large: max * 0.82,
      mega: max * 1.0,
    };
    setScaleReady(true);
  }, []);

  const finalSizeRef = useRef<ChestSize>("small");
  const chestStageRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const id = setTimeout(() => setShowTapPrompt(true), 500);
    return () => clearTimeout(id);
  }, []);

  const SIZE_IDLE_MS: Record<ChestSize, number> = {
    small: 200,
    medium: 150,
    large: 150,
    mega: 120,
  };
  useEffect(() => {
    if (phase !== "idle" && phase !== "tapping") return;
    const id = setInterval(() => {
      setCol((c) => (c + 1) % 5);
    }, SIZE_IDLE_MS[chestSize]);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, chestSize]);

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
      /* no audio */
    }
  };

  const POPUP_SPEC: Record<
    Exclude<ChestSize, "small">,
    { text: string; size: number; color: string; mega?: boolean; glow?: boolean }
  > = {
    medium: { text: "GEMIDDELD", size: 22, color: "#FFB347" },
    large: { text: "GROOT", size: 26, color: "#FFD700" },
    mega: { text: "MEGA!", size: 32, color: "#FFD700", mega: true, glow: true },
  };

  const triggerSizeUpgrade = (newSize: Exclude<ChestSize, "small">) => {
    setChestSize(newSize);
    setRingKey((k) => k + 1);
    setPopup(POPUP_SPEC[newSize]);
    setPopupKey((k) => k + 1);
    window.setTimeout(() => setPopup(null), 920);
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
    setOpeningBurst(true);

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
    window.setTimeout(() => setOpeningBurst(false), 300);
    window.setTimeout(() => {
      setPhase("items");
      setShowItems(true);
    }, 1200);
    window.setTimeout(() => {
      setShowContinue(true);
      setPhase("done");
    }, 2000 + (ITEM_SETS[typeParam]?.[chestSize]?.length ?? 3) * 200);
  };

  const handleTap = () => {
    if (phase !== "idle" && phase !== "tapping") return;
    if (smithAttacking) return; // wait for current swing
    if (phase === "idle") {
      setPhase("tapping");
      setShowTapPrompt(false);
    }
    // Smith starts swinging; shake fires on hammer impact
    setSmithAttacking(true);
    const next = tapCount + 1;
    setTapCount(next);

    const freq = Math.min(800, 300 + next * 40);
    playSound([{ freq, start: 0, gain: 0.15, duration: 0.1 }]);

    if (
      thresholds.mega !== null &&
      next >= thresholds.mega &&
      chestSize !== "mega"
    ) {
      triggerSizeUpgrade("mega");
    } else if (
      thresholds.large !== null &&
      next >= thresholds.large &&
      chestSize !== "large" &&
      chestSize !== "mega"
    ) {
      triggerSizeUpgrade("large");
    } else if (
      thresholds.medium !== null &&
      next >= thresholds.medium &&
      chestSize === "small"
    ) {
      triggerSizeUpgrade("medium");
    }

    if (next >= thresholds.open) {
      window.setTimeout(startOpening, 260);
    }
  };

  const progress = Math.min(1, tapCount / thresholds.open);

  const finalItemList = useMemo(() => {
    if (phase !== "items" && phase !== "done") return [];
    return ITEM_SETS[typeParam]?.[finalSizeRef.current] ?? [];
  }, [phase, typeParam]);

  useLayoutEffect(() => {
    if (phase !== "items" && phase !== "done") return;
    const id = window.setTimeout(() => {
      if (!chestStageRef.current) return;
      const chestRect = chestStageRef.current.getBoundingClientRect();
      const cx = chestRect.left + chestRect.width / 2;
      const cy = chestRect.top + chestRect.height / 2;
      const offsets = itemRefs.current.map((el) => {
        if (!el) return { dx: 0, dy: 0 };
        const r = el.getBoundingClientRect();
        return {
          dx: cx - (r.left + r.width / 2),
          dy: cy - (r.top + r.height / 2),
        };
      });
      setItemOffsets(offsets);
    }, 50);
    return () => clearTimeout(id);
  }, [phase, finalItemList.length]);

  // Background overlay style (size + burst)
  const overlayBg = openingBurst
    ? `radial-gradient(ellipse 150% 120% at 50% 55%, rgba(${chest.rgb}, 0.65) 0%, transparent 55%)`
    : bgOverlay(chestSize, chest.rgb);
  const overlayTransition = openingBurst
    ? "background 300ms ease"
    : "background 1000ms ease";
  const showMegaWarmTint =
    (phase === "opening" || phase === "items" || phase === "done") &&
    finalSizeRef.current === "mega";

  return (
    <div
      onClick={handleTap}
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden"
      style={{
        maxWidth: 430,
        marginInline: "auto",
        background: "linear-gradient(180deg, #0d0600 0%, #1a0f00 100%)",
        animation: screenShaking
          ? "screen-shake 0.15s linear infinite"
          : undefined,
        cursor:
          phase === "idle" || phase === "tapping" ? "pointer" : "default",
      }}
    >
      {/* Ambient warm base glow, always visible */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 55%, rgba(255, 179, 71, 0.10) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      {/* Dynamic glow overlay tied to size */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: overlayBg,
          transition: overlayTransition,
          zIndex: 0,
        }}
      />
      {/* Mega warm tint overlay during opening & after */}
      {showMegaWarmTint && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `rgba(${chest.rgb}, 0.05)`,
            zIndex: 0,
          }}
        />
      )}

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
              boxShadow: `0 0 6px rgba(${chest.rgb}, 0.6)`,
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
            onClick={(e) => {
              e.stopPropagation();
              router.push("/");
            }}
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

      {/* Fixed-centered stage: smith + chest row with prompt/items/continue stacked */}
      <div
        className="px-4"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          zIndex: 10,
          width: "100%",
          maxWidth: 430,
          pointerEvents: "none",
        }}
      >
        {/* Smith + chest row, bottom-aligned */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: 32,
          }}
        >
          {(phase === "idle" || phase === "tapping") && (
            <div style={{ alignSelf: "flex-end" }}>
              <Smith
                isAttacking={smithAttacking}
                onAttackComplete={() => setSmithAttacking(false)}
                onHammerImpact={() => setShakeKey((k) => k + 1)}
                scale={4}
              />
            </div>
          )}

          {/* Chest stage */}
          <div
            ref={chestStageRef}
            className="relative"
            style={{ width: 288, height: 192, pointerEvents: "auto" }}
          >
          {popup && (
            <span
              key={popupKey}
              className="font-cinzel absolute"
              style={{
                top: 10,
                left: "50%",
                fontSize: popup.size,
                fontWeight: 700,
                color: popup.color,
                textShadow: popup.glow
                  ? "0 0 20px rgba(255, 215, 0, 0.8)"
                  : "0 0 10px rgba(0, 0, 0, 0.5)",
                whiteSpace: "nowrap",
                animation: popup.mega
                  ? "popup-mega 600ms ease-out forwards"
                  : "popup-text 900ms ease-out forwards",
                zIndex: 3,
              }}
            >
              {popup.text}
            </span>
          )}

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

          <div
            style={{
              position: "relative",
              transform: `scale(${scaleReady ? scaleRef.current[chestSize] : 0.5})`,
              transformOrigin: "center bottom",
              transition:
                "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              visibility: scaleReady ? "visible" : "hidden",
              pointerEvents: "none",
            }}
          >
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
                  glowColor={`rgba(${chest.rgb}, 0.8)`}
                  progress={progress}
                  shakeKey={shakeKey}
                  bigShake={bigShake}
                />
                <TapParticle color={chest.accent} burstKey={shakeKey} />
                <ExplosionParticles
                  active={phase === "opening" || phase === "items"}
                  accentColor={chest.accent}
                />
              </div>
            </div>
          </div>

          {(chestSize === "medium" ||
            chestSize === "large" ||
            chestSize === "mega") &&
            (phase === "idle" || phase === "tapping") &&
            Array.from({
              length:
                chestSize === "medium" ? 2 : chestSize === "large" ? 4 : 6,
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

          {chestSize === "mega" &&
            (phase === "idle" || phase === "tapping") &&
            Array.from({ length: 8 }).map((_, i) => (
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
          </div>
        </div>

        {/* Prompt under the row */}
        {phase === "idle" && showTapPrompt && (
          <div
            className="flex flex-col items-center"
            style={{ marginTop: 16, width: "100%", textAlign: "center" }}
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
              TAP DE KIST OPEN
            </span>
          </div>
        )}

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
              {finalItemList.map((it, idx) => {
                const off = itemOffsets[idx];
                return (
                  <ChestItem
                    key={idx}
                    innerRef={(el) => {
                      itemRefs.current[idx] = el;
                    }}
                    icon={renderIcon(it.icon)}
                    name={it.name}
                    rarity={it.rarity}
                    rainbow={it.rainbow}
                    delayMs={idx * 180}
                    useFly={!!off}
                    dx={off?.dx ?? 0}
                    dy={off?.dy ?? 0}
                    peak={finalSizeRef.current === "mega" ? 90 : 55}
                  />
                );
              })}
            </div>
          </div>
        )}

        {showContinue && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              router.push("/");
            }}
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
              pointerEvents: "auto",
              animation: "slide-up 300ms ease-out both",
            }}
          >
            DOORGAAN
          </button>
        )}
      </div>

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
