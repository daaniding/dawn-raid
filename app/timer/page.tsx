"use client";

import {
  ChestIcon,
  CoinsIcon,
  CrossedSwordsIcon,
} from "@/components/ui/GameIcon";
import { getOrCreateUserId } from "@/lib/userId";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";

const QUOTES = [
  "Elke minuut telt.",
  "Jouw dorp wacht op je.",
  "Blijf gefocust, held.",
  "Grote dingen kosten tijd.",
  "Je bent sterker dan je denkt.",
];

const REWARDS: Record<string, { label: string }> = {
  bronze: { label: "Bronzen Kist" },
  silver: { label: "Zilveren Kist" },
  gold: { label: "Gouden Kist" },
};

function pad(n: number) {
  return n.toString().padStart(2, "0");
}
function fmt(sec: number) {
  const m = Math.floor(Math.max(0, sec) / 60);
  const s = Math.max(0, sec) % 60;
  return `${pad(m)}:${pad(s)}`;
}

function urlBase64ToUint8Array(base64: string): Uint8Array<ArrayBuffer> {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(b64);
  const buf = new ArrayBuffer(raw.length);
  const arr = new Uint8Array(buf);
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  return arr;
}

async function ensurePushSubscription(userId: string) {
  try {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;
    const vapid = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!vapid) return;

    const reg =
      (await navigator.serviceWorker.getRegistration("/sw.js")) ||
      (await navigator.serviceWorker.register("/sw.js"));

    // Ask permission only if not previously denied; don't block UI on denial
    let perm = Notification.permission;
    if (perm === "default") perm = await Notification.requestPermission();
    if (perm !== "granted") return;

    const existing = await reg.pushManager.getSubscription();
    const sub =
      existing ??
      (await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapid),
      }));

    await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, subscription: sub.toJSON() }),
    });
  } catch {
    // Swallow: push is best-effort
  }
}

const PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  size: 3 + ((i * 7) % 4),
  left: (i * 53) % 100,
  duration: 4 + ((i * 3) % 5),
  delay: -((i * 11) % 8),
  drift: ((i * 17) % 40) - 20,
  opacity: 0.5 + ((i * 13) % 3) * 0.1,
}));

function TimerView() {
  const router = useRouter();
  const params = useSearchParams();

  const duration = useMemo(() => {
    const raw = Number(params.get("duration"));
    return Number.isFinite(raw) && raw > 0 ? raw : 30 * 60;
  }, [params]);
  const name = params.get("name") ?? "Focus & Conquer";
  const rewardKey = (params.get("reward") ?? "silver").toLowerCase();
  const reward = REWARDS[rewardKey] ?? REWARDS.silver;
  const rewardCoins = {
    bronze: 50,
    silver: 150,
    gold: 400,
  }[rewardKey] ?? 150;

  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteKey, setQuoteKey] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const userIdRef = useRef<string>("");

  // Keep latest timeLeft in a ref so visibility handler reads fresh value
  const timeLeftRef = useRef(duration);
  timeLeftRef.current = timeLeft;

  // Persist userId + POST timer + register SW + subscribe to push on mount
  useEffect(() => {
    const userId = getOrCreateUserId();
    userIdRef.current = userId;
    fetch("/api/timer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        startTime: Date.now(),
        duration,
        name,
      }),
    }).catch(() => {});

    void ensurePushSubscription(userId);
  }, [duration, name]);

  const patchStatus = (
    status: "running" | "paused" | "completed",
    extra?: { timeLeft?: number },
  ) => {
    const userId = userIdRef.current;
    if (!userId) return;
    fetch("/api/timer", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, status, ...extra }),
    }).catch(() => {});
  };

  const playSuccessSound = () => {
    try {
      const Ctx =
        (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext) as typeof AudioContext;
      const ctx = new Ctx();
      [523, 659, 784].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        osc.connect(gain);
        gain.connect(ctx.destination);
        const start = ctx.currentTime + i * 0.1;
        gain.gain.setValueAtTime(0.3, start);
        gain.gain.exponentialRampToValueAtTime(0.01, start + 0.5);
        osc.start(start);
        osc.stop(start + 0.55);
      });
    } catch {
      // AudioContext unavailable or blocked — ignore
    }
  };

  const handleTimerComplete = () => {
    setIsRunning(false);
    setIsCompleted(true);
    playSuccessSound();
    patchStatus("completed");
    // Map timer duration to chest tier
    const mins = Math.round(duration / 60);
    const chestType =
      mins >= 60 ? "epic" : mins >= 30 ? "silver" : "bronze";
    setTimeout(() => {
      router.push(`/kist?type=${chestType}`);
    }, 2000);
  };

  // Countdown
  const runningRef = useRef(isRunning);
  runningRef.current = isRunning;
  useEffect(() => {
    const id = setInterval(() => {
      if (!runningRef.current) return;
      setTimeLeft((t) => {
        if (t <= 1) return 0;
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // When timeLeft hits 0, fire completion once
  const completedRef = useRef(false);
  useEffect(() => {
    if (timeLeft <= 0 && !completedRef.current) {
      completedRef.current = true;
      handleTimerComplete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  // Pause when hidden, resume when visible; sync status to Redis
  useEffect(() => {
    function onVisibility() {
      if (completedRef.current) return;
      if (document.hidden) {
        setIsRunning(false);
        setIsPaused(true);
        patchStatus("paused", { timeLeft: timeLeftRef.current });
      } else {
        setIsRunning(true);
        setIsPaused(false);
        patchStatus("running");
      }
    }
    document.addEventListener("visibilitychange", onVisibility);
    return () =>
      document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Rotate motivational quote every 30s
  useEffect(() => {
    const id = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % QUOTES.length);
      setQuoteKey((k) => k + 1);
    }, 30000);
    return () => clearInterval(id);
  }, []);

  // Circle geometry (320px outer, 8px stroke → r=156)
  const R = 156;
  const C = 2 * Math.PI * R;
  const progress = isCompleted
    ? 1
    : Math.max(0, Math.min(1, timeLeft / duration));
  const dashOffset = C * (1 - progress);
  const percentCompleted = Math.min(
    100,
    Math.max(0, Math.round(((duration - timeLeft) / duration) * 100)),
  );

  // Confetti only on completion
  const confetti = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        left: (i * 37) % 100,
        delay: (i % 10) * 0.08,
        duration: 2.2 + (i % 5) * 0.35,
        hue: i % 3 === 0 ? "#FFD700" : i % 3 === 1 ? "#FFB347" : "#FF8C00",
        rotate: (i * 23) % 360,
      })),
    [],
  );

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
      {/* Particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
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
              boxShadow: "0 0 6px rgba(255, 179, 71, 0.6)",
            }}
          />
        ))}
      </div>

      {/* Top bar */}
      <div
        className="relative z-10 flex items-center justify-between"
        style={{ height: 56, padding: "0 16px" }}
      >
        <div className="flex items-center justify-start" style={{ width: "25%" }}>
          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-1.5 font-cinzel"
            style={{
              fontSize: 11,
              letterSpacing: "2px",
              color: "#C4A882",
              cursor: "pointer",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            STOP
          </button>
        </div>
        <div
          className="flex items-center justify-center"
          style={{ width: "50%", minWidth: 0 }}
        >
          <span
            className="font-cinzel"
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#FFD700",
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </span>
        </div>
        <div style={{ width: "25%" }} />
      </div>

      {/* Main — timer + status + quote, vertically centered between top/bottom bars */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4">
        <div
          className="relative"
          style={{
            width: 320,
            height: 320,
            filter:
              "drop-shadow(0 0 20px rgba(255,179,71,0.9)) drop-shadow(0 0 10px rgba(255,179,71,0.5))",
          }}
        >
          <svg width="320" height="320" viewBox="0 0 320 320">
            <circle
              cx="160"
              cy="160"
              r={R}
              fill="none"
              stroke="#B8860B"
              strokeWidth="8"
              strokeOpacity="0.35"
            />
            <circle
              cx="160"
              cy="160"
              r={R}
              fill="none"
              stroke="#FFB347"
              strokeWidth={isCompleted ? 12 : 8}
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 160 160)"
              style={{
                transition:
                  "stroke-dashoffset 1s linear, stroke-width 0.4s ease",
                filter: isCompleted
                  ? "drop-shadow(0 0 22px rgba(255,179,71,0.95))"
                  : undefined,
              }}
            />
          </svg>
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ gap: 6 }}
          >
            <span style={{ color: "#FFB347", lineHeight: 0 }}>
              <CrossedSwordsIcon size={40} />
            </span>
            <span
              className="font-cinzel tabular-nums"
              style={{
                fontSize: 72,
                fontWeight: 700,
                letterSpacing: "6px",
                color: "#FFE4B5",
                lineHeight: 1,
                textShadow: "0 0 20px rgba(255, 179, 71, 0.3)",
              }}
            >
              {fmt(timeLeft)}
            </span>
            <span
              className="font-cinzel"
              style={{
                fontSize: 11,
                letterSpacing: "3px",
                color: "#C4A882",
              }}
            >
              RESTEREND
            </span>
            <span
              className="font-cinzel tabular-nums"
              style={{
                fontSize: 12,
                color: "#C4A882",
                marginTop: 2,
              }}
            >
              {percentCompleted}% voltooid
            </span>
          </div>
        </div>

        {/* Status */}
        <div style={{ height: 28, marginTop: 20 }}>
          {isCompleted ? null : isPaused ? (
            <span
              className="font-cinzel paused-pulse"
              style={{
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: "2px",
                color: "#E74C3C",
              }}
            >
              GEPAUZEERD
            </span>
          ) : (
            <span
              className="font-nunito"
              style={{ fontSize: 16, color: "#C4A882" }}
            >
              Je timer loopt...
            </span>
          )}
        </div>

        {/* Motivational quote */}
        <p
          key={quoteKey}
          className="font-cinzel italic text-center px-6"
          style={{
            fontSize: 14,
            color: "#C4A882",
            marginTop: 18,
            animation: "quote-fade 30s ease-in-out forwards",
          }}
        >
          “{QUOTES[quoteIndex]}”
        </p>
      </main>

      {/* Bottom bar — reward */}
      <div
        className="relative z-10 grid items-stretch"
        style={{
          gridTemplateColumns: "1fr 1px 1fr",
          minHeight: 90,
          padding: "16px 20px",
          paddingBottom: "max(16px, env(safe-area-inset-bottom))",
          background:
            "linear-gradient(180deg, rgba(45, 26, 0, 0.95) 0%, rgba(13, 6, 0, 0.98) 100%)",
          borderTop: "2px solid #FFB347",
          columnGap: 16,
        }}
      >
        {/* Left column — reward */}
        <div className="flex flex-col justify-center" style={{ gap: 6 }}>
          <span
            className="font-cinzel"
            style={{
              fontSize: 10,
              letterSpacing: "3px",
              color: "#C4A882",
            }}
          >
            BELONING
          </span>
          <span className="flex items-center gap-2">
            <span style={{ color: "#FFB347", lineHeight: 0 }}>
              <ChestIcon size={24} />
            </span>
            <span
              className="font-cinzel"
              style={{ fontSize: 16, fontWeight: 700, color: "#FFD700" }}
            >
              {reward.label}
            </span>
          </span>
          <span
            className="font-nunito"
            style={{ fontSize: 12, color: "#FFB347" }}
          >
            Na voltooiing
          </span>
        </div>

        {/* Vertical divider */}
        <div
          aria-hidden
          style={{
            width: 1,
            alignSelf: "stretch",
            background: "rgba(255, 179, 71, 0.2)",
          }}
        />

        {/* Right column — coins */}
        <div
          className="flex flex-col items-end justify-center"
          style={{ gap: 6 }}
        >
          <span
            className="font-cinzel"
            style={{
              fontSize: 10,
              letterSpacing: "3px",
              color: "#C4A882",
            }}
          >
            COINS
          </span>
          <span className="flex items-center gap-2">
            <span style={{ color: "#FFD700", lineHeight: 0 }}>
              <CoinsIcon size={24} />
            </span>
            <span
              className="font-cinzel tabular-nums coin-shimmer-bright"
              style={{ fontSize: 24, fontWeight: 700 }}
            >
              {rewardCoins}
            </span>
          </span>
          <span
            className="font-nunito"
            style={{ fontSize: 12, color: "#FFB347" }}
          >
            +bonus bij streak
          </span>
        </div>
      </div>

      {/* Completion overlay */}
      {isCompleted && (
        <>
          <div
            aria-hidden
            className="completion-flash pointer-events-none fixed inset-0 z-40"
          />
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
          >
            {confetti.map((c, i) => (
              <span
                key={i}
                className="confetti"
                style={{
                  left: `${c.left}%`,
                  background: c.hue,
                  animationDelay: `${c.delay}s`,
                  animationDuration: `${c.duration}s`,
                  transform: `rotate(${c.rotate}deg)`,
                }}
              />
            ))}
          </div>
          <div className="pointer-events-none fixed inset-0 z-45 flex items-center justify-center">
            <span
              className="pop-in font-cinzel"
              style={{
                fontSize: 48,
                fontWeight: 900,
                letterSpacing: "4px",
                color: "#FFD700",
                textShadow:
                  "0 0 18px rgba(255, 215, 0, 0.85), 0 2px 0 rgba(0,0,0,0.6)",
              }}
            >
              VOLTOOID!
            </span>
          </div>
        </>
      )}

      {/* Cancel confirm dialog */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          style={{ background: "rgba(0, 0, 0, 0.75)", backdropFilter: "blur(6px)" }}
        >
          <div
            className="flex w-full flex-col items-center gap-5"
            style={{
              maxWidth: 340,
              padding: 22,
              background:
                "linear-gradient(180deg, var(--bg-light) 0%, var(--bg-mid) 100%)",
              border: "1px solid var(--gold-dark)",
              borderRadius: 16,
              boxShadow: "0 0 30px rgba(255, 179, 71, 0.2)",
            }}
          >
            <h3
              className="font-cinzel text-center"
              style={{ fontSize: 18, fontWeight: 700, color: "#FFD700" }}
            >
              Weet je zeker?
            </h3>
            <p
              className="font-nunito text-center"
              style={{ fontSize: 14, color: "#C4A882" }}
            >
              Je verliest je voortgang.
            </p>
            <div className="flex w-full gap-3">
              <button
                type="button"
                onClick={() => router.push("/")}
                className="font-cinzel flex-1 rounded-xl py-3"
                style={{
                  background:
                    "linear-gradient(180deg, #E74C3C 0%, #8B2500 100%)",
                  color: "#FFF5E4",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  border: "1.5px solid #8B2500",
                  cursor: "pointer",
                }}
              >
                JA, STOP
              </button>
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="font-cinzel flex-1 rounded-xl py-3"
                style={{
                  background:
                    "linear-gradient(180deg, #FFB347 0%, #B8860B 100%)",
                  color: "#2a1b10",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  border: "1.5px solid #8a5a0a",
                  cursor: "pointer",
                }}
              >
                NEE, GA DOOR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TimerPage() {
  return (
    <Suspense fallback={null}>
      <TimerView />
    </Suspense>
  );
}
