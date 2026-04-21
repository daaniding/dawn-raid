"use client";

import { useEffect, useState } from "react";
import LevelUp from "@/components/LevelUp";
import { type LevelReward } from "@/lib/levels";

const KEY = "dawnraid:pendingLevelUp";

interface PendingPayload {
  level: number;
  rewards: Array<LevelReward & { level: number }>;
}

export default function LevelUpWatcher() {
  const [pending, setPending] = useState<PendingPayload | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (!raw) return;
      const j = JSON.parse(raw);
      if (j?.level) {
        setPending({ level: j.level, rewards: j.rewards ?? [] });
      }
    } catch {
      window.localStorage.removeItem(KEY);
    }
  }, []);

  if (!pending) return null;

  return (
    <LevelUp
      newLevel={pending.level}
      rewards={pending.rewards}
      onClose={() => {
        window.localStorage.removeItem(KEY);
        setPending(null);
      }}
    />
  );
}
