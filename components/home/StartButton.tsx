"use client";

import {
  getHuidigeOpdracht,
  isVandaagVoltooid,
  OPDRACHT_EVENT,
  type HuidigeOpdracht,
} from "@/lib/huidigeOpdracht";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function StartButton() {
  const router = useRouter();
  const [op, setOp] = useState<HuidigeOpdracht | null>(null);
  const [voltooid, setVoltooid] = useState(false);

  useEffect(() => {
    const sync = () => {
      setOp(getHuidigeOpdracht());
      setVoltooid(isVandaagVoltooid());
    };
    sync();
    window.addEventListener(OPDRACHT_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(OPDRACHT_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const disabled = !op || voltooid;

  const start = () => {
    if (!op || voltooid) return;
    const params = new URLSearchParams({
      duration: String(op.duur * 60),
      name: op.titel,
      chestType: op.chestType,
      reward: op.chestType,
    });
    router.push(`/timer?${params.toString()}`);
  };

  return (
    <button
      type="button"
      onClick={start}
      disabled={disabled}
      className="btn-start font-cinzel select-none"
      style={{
        width: "calc(100% - 32px)",
        maxWidth: 380,
        height: 64,
        borderRadius: 16,
        background: voltooid
          ? "rgba(76,175,80,0.3)"
          : disabled
            ? "linear-gradient(180deg, #4a3418 0%, #2a1b0a 100%)"
            : "linear-gradient(180deg, var(--amber) 0%, var(--red-action) 100%)",
        color: voltooid ? "#4CAF50" : disabled ? "#7a6a50" : "#FFF5E4",
        fontSize: 22,
        fontWeight: 900,
        letterSpacing: "3px",
        textShadow: disabled ? "none" : "0 1px 2px rgba(0,0,0,0.4)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: voltooid ? 0.7 : disabled ? 0.65 : 1,
        pointerEvents: voltooid ? "none" : undefined,
        border: voltooid ? "1px solid #4CAF50" : "none",
      }}
    >
      {voltooid ? "VOLTOOID" : "START OPDRACHT"}
    </button>
  );
}
