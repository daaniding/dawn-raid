"use client";

import {
  ChestIcon,
  CoinsIcon,
  CrossedSwordsIcon,
} from "@/components/ui/GameIcon";
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

  const [remaining, setRemaining] = useState(duration);
  const [status, setStatus] = useState<"running" | "paused" | "completed">(
    "running",
  );
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteKey, setQuoteKey] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  // Tick every second when running
  const statusRef = useRef(status);
  statusRef.current = status;
  useEffect(() => {
    const id = setInterval(() => {
      if (statusRef.current !== "running") return;
      setRemaining((r) => {
        if (r <= 1) {
          setStatus("completed");
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Pause when page is hidden, resume when visible
  useEffect(() => {
    function onVisibility() {
      if (statusRef.current === "completed") return;
      if (document.visibilityState === "hidden") setStatus("paused");
      else setStatus("running");
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

  // Circle geometry
  const R = 136;
  const C = 2 * Math.PI * R;
  const progress = Math.max(0, Math.min(1, remaining / duration));
  const dashOffset = C * (1 - progress);

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
        className="relative z-10 grid items-center px-3"
        style={{ height: 60, gridTemplateColumns: "110px 1fr 110px" }}
      >
        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          className="flex items-center gap-1.5 px-2 py-1 font-cinzel justify-self-start"
          style={{ fontSize: 12, letterSpacing: "2px", color: "#C4A882", cursor: "pointer" }}
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
          ANNULEREN
        </button>
        <span
          className="font-cinzel text-center truncate"
          style={{ fontSize: 16, fontWeight: 700, color: "#FFD700" }}
        >
          {name}
        </span>
        <span />
      </div>

      {/* Main — timer + status + quote */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-4">
        <div
          className="relative"
          style={{
            width: 280,
            height: 280,
            filter: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))",
          }}
        >
          <svg width="280" height="280" viewBox="0 0 280 280">
            <circle
              cx="140"
              cy="140"
              r={R}
              fill="none"
              stroke="#B8860B"
              strokeWidth="8"
              strokeOpacity="0.35"
            />
            <circle
              cx="140"
              cy="140"
              r={R}
              fill="none"
              stroke="#FFD700"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 140 140)"
              style={{ transition: "stroke-dashoffset 1s linear" }}
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
                fontSize: 64,
                fontWeight: 700,
                letterSpacing: "4px",
                color: "#FFF5E4",
                lineHeight: 1,
              }}
            >
              {fmt(remaining)}
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
          </div>
        </div>

        {/* Status */}
        <div style={{ height: 28, marginTop: 20 }}>
          {status === "paused" ? (
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
          ) : status === "completed" ? (
            <span
              className="font-cinzel"
              style={{ fontSize: 16, fontWeight: 700, color: "#FFD700" }}
            >
              VOLTOOID
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
        className="relative z-10 flex items-center justify-between"
        style={{
          padding: "14px 16px",
          background: "rgba(45, 26, 0, 0.8)",
          borderTop: "1px solid #B8860B",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex flex-col" style={{ gap: 2 }}>
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
            <span className="flex items-center gap-1.5">
              <span style={{ color: "#FFD700", lineHeight: 0 }}>
                <ChestIcon size={22} />
              </span>
              <span
                className="font-cinzel"
                style={{ fontSize: 14, fontWeight: 700, color: "#FFF5E4" }}
              >
                {reward.label}
              </span>
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end" style={{ gap: 2 }}>
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
          <span className="flex items-center gap-1.5">
            <span style={{ color: "#FFD700", lineHeight: 0 }}>
              <CoinsIcon size={20} />
            </span>
            <span
              className="font-cinzel tabular-nums"
              style={{ fontSize: 16, fontWeight: 700, color: "#FFD700" }}
            >
              {rewardCoins}
            </span>
          </span>
        </div>
      </div>

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
