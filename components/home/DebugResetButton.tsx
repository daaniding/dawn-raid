"use client";

import { getOrCreateUserId } from "@/lib/userId";
import { useEffect, useState } from "react";

export default function DebugResetButton() {
  const [show, setShow] = useState(false);
  const [bezig, setBezig] = useState(false);

  useEffect(() => {
    const isDev = process.env.NODE_ENV !== "production";
    const hasFlag =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("debug") === "true";
    setShow(isDev || hasFlag);
  }, []);

  if (!show) return null;

  const reset = async () => {
    if (bezig) return;
    setBezig(true);
    try {
      const userId = getOrCreateUserId();
      await fetch(
        `/api/debug/reset-dag?userId=${encodeURIComponent(userId)}&secret=debug123`,
        { cache: "no-store" },
      );
      window.location.reload();
    } catch {
      setBezig(false);
    }
  };

  return (
    <button
      type="button"
      onClick={reset}
      disabled={bezig}
      className="font-cinzel"
      style={{
        position: "fixed",
        bottom: 80,
        right: 16,
        zIndex: 90,
        background: "rgba(20, 12, 0, 0.85)",
        border: "1px solid rgba(196,168,130,0.3)",
        borderRadius: 8,
        padding: "6px 10px",
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "1px",
        color: "#C4A882",
        cursor: bezig ? "wait" : "pointer",
        opacity: bezig ? 0.6 : 1,
        backdropFilter: "blur(4px)",
      }}
    >
      {bezig ? "..." : "Reset dag"}
    </button>
  );
}
