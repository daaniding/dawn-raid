export type ResourceType = "hout" | "steen" | "goud";

export interface LevelReward {
  coins?: number;
  resource?: ResourceType;
  resourceAmount?: number;
  nieuweKaart?: string;
}

export const MAX_LEVEL = 60;

export function getXpVoorLevel(level: number): number {
  if (level >= 50) return 500;
  if (level >= 40) return 450;
  if (level >= 30) return 400;
  if (level >= 20) return 350;
  if (level >= 10) return 300;
  if (level >= 1) return 25 + level * 25; // 50, 75, 100, ..., 250
  return 50;
}

export function getLevelVanXp(totalXp: number): {
  level: number;
  xpInHuidigLevel: number;
  xpVoorVolgendLevel: number;
  totalXp: number;
  progress: number;
} {
  let level = 1;
  let cumulatieve = 0;
  while (level < MAX_LEVEL) {
    const nodig = getXpVoorLevel(level);
    if (cumulatieve + nodig > totalXp) break;
    cumulatieve += nodig;
    level++;
  }
  const xpInHuidigLevel = totalXp - cumulatieve;
  const xpVoorVolgendLevel = level >= MAX_LEVEL ? 0 : getXpVoorLevel(level);
  const progress =
    xpVoorVolgendLevel === 0 ? 1 : xpInHuidigLevel / xpVoorVolgendLevel;
  return { level, xpInHuidigLevel, xpVoorVolgendLevel, totalXp, progress };
}

const r = (
  coins?: number,
  resource?: ResourceType,
  amt?: number,
): LevelReward => ({
  ...(coins !== undefined && { coins }),
  ...(resource && { resource, resourceAmount: amt }),
});

const k = (kaartId: string): LevelReward => ({ nieuweKaart: kaartId });

export const LEVEL_REWARDS: Record<number, LevelReward> = {
  2: r(150),
  3: r(200, "hout", 20),
  4: r(250, "steen", 15),
  5: r(300, "hout", 30),
  6: r(350, "goud", 10),
  7: r(400, "steen", 25),
  8: r(450, "hout", 40),
  9: r(500, "goud", 15),
  10: k("healer"),
  11: r(200, "hout", 20),
  12: r(225, "steen", 15),
  13: r(250, "goud", 10),
  14: r(275, "hout", 25),
  15: r(300, "steen", 20),
  16: r(325, "goud", 15),
  17: r(350, "hout", 30),
  18: r(375, "steen", 25),
  19: r(400, "goud", 20),
  20: k("dark_knight"),
  21: r(200, "hout", 25),
  22: r(225, "goud", 15),
  23: r(250, "steen", 20),
  24: r(275, "hout", 30),
  25: r(300, "goud", 20),
  26: r(325, "steen", 25),
  27: r(350, "hout", 35),
  28: r(375, "goud", 25),
  29: r(400, "steen", 30),
  30: k("samurai"),
  31: r(225, "hout", 30),
  32: r(250, "goud", 20),
  33: r(275, "steen", 25),
  34: r(300, "hout", 35),
  35: r(325, "goud", 25),
  36: r(350, "steen", 30),
  37: r(375, "hout", 40),
  38: r(400, "goud", 30),
  39: r(425, "steen", 35),
  40: k("fire_knight"),
  41: r(250, "hout", 35),
  42: r(275, "goud", 25),
  43: r(300, "steen", 30),
  44: r(325, "hout", 40),
  45: r(350, "goud", 30),
  46: r(375, "steen", 35),
  47: r(400, "hout", 45),
  48: r(425, "goud", 35),
  49: r(450, "steen", 40),
  50: k("mage"),
  51: r(275, "hout", 40),
  52: r(300, "goud", 30),
  53: r(325, "steen", 35),
  54: r(350, "hout", 45),
  55: r(375, "goud", 35),
  56: r(400, "steen", 40),
  57: r(425, "hout", 50),
  58: r(450, "goud", 40),
  59: r(475, "steen", 45),
  60: k("cloaked_figure"),
};

export const XP_BRONNEN = {
  opdracht_5min: 25,
  opdracht_15min: 50,
  opdracht_30min: 100,
  opdracht_60min: 200,
  streak_bonus: 25,
  kist_bronze_small: 10,
  kist_bronze_medium: 15,
  kist_bronze_large: 20,
  kist_bronze_mega: 30,
  kist_silver_small: 20,
  kist_silver_medium: 30,
  kist_silver_large: 45,
  kist_silver_mega: 60,
  kist_epic_small: 40,
  kist_epic_medium: 60,
  kist_epic_large: 80,
  kist_epic_mega: 120,
  kist_legendary_small: 80,
  kist_legendary_medium: 120,
  kist_legendary_large: 160,
  kist_legendary_mega: 250,
  kaart_upgrade: 20,
  aanval_winnen: 50,
} as const;

export type XpBron = keyof typeof XP_BRONNEN;
