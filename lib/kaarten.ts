export type Rarity = "gewoon" | "zeldzaam" | "episch" | "legendarisch";

export interface Kaart {
  id: string;
  naam: string;
  rarity: Rarity;
  type: "held" | "npc";
  sprite: string;
  beschrijving: string;
  stats: {
    aanval: number;
    verdediging: number;
    snelheid: number;
    speciale: number;
  };
  upgradeKaarten: number[];
  maxLevel: number;
}

const STANDAARD_UPGRADE = [2, 4, 8, 16, 32, 64, 100];

export const kaarten: Kaart[] = [
  {
    id: "archer",
    naam: "Boogschutter",
    rarity: "zeldzaam",
    type: "held",
    sprite: "/assets/heroes/archer/archer_idle.png",
    beschrijving: "Snel en nauwkeurig, raakt vijanden van afstand.",
    stats: { aanval: 7, verdediging: 3, snelheid: 8, speciale: 6 },
    upgradeKaarten: STANDAARD_UPGRADE,
    maxLevel: 8,
  },
  {
    id: "dark_knight",
    naam: "Donkere Ridder",
    rarity: "episch",
    type: "held",
    sprite: "/assets/heroes/dark_knight/dark_knight_idle.png",
    beschrijving: "Zware aanvaller met hoge verdediging.",
    stats: { aanval: 9, verdediging: 8, snelheid: 4, speciale: 7 },
    upgradeKaarten: STANDAARD_UPGRADE,
    maxLevel: 8,
  },
  {
    id: "fire_knight",
    naam: "Vuurridder",
    rarity: "episch",
    type: "held",
    sprite: "/assets/heroes/fire_knight/fire_knight_idle.png",
    beschrijving: "Verbrandt vijanden met zijn vuurzwaard.",
    stats: { aanval: 10, verdediging: 6, snelheid: 5, speciale: 9 },
    upgradeKaarten: STANDAARD_UPGRADE,
    maxLevel: 8,
  },
  {
    id: "samurai",
    naam: "Samurai",
    rarity: "episch",
    type: "held",
    sprite: "/assets/heroes/samurai/samurai_idle.png",
    beschrijving: "Snel en dodelijk, meester van het zwaard.",
    stats: { aanval: 9, verdediging: 5, snelheid: 9, speciale: 8 },
    upgradeKaarten: STANDAARD_UPGRADE,
    maxLevel: 8,
  },
  {
    id: "mage",
    naam: "Magiër",
    rarity: "legendarisch",
    type: "held",
    sprite: "/assets/heroes/mage/mage_idle.png",
    beschrijving: "Machtige tovenaar die meerdere vijanden raakt.",
    stats: { aanval: 10, verdediging: 3, snelheid: 5, speciale: 10 },
    upgradeKaarten: STANDAARD_UPGRADE,
    maxLevel: 8,
  },
  {
    id: "healer",
    naam: "Genezer",
    rarity: "zeldzaam",
    type: "held",
    sprite: "/assets/heroes/healer/healer_idle.png",
    beschrijving: "Heelt bondgenoten tijdens de strijd.",
    stats: { aanval: 3, verdediging: 6, snelheid: 6, speciale: 10 },
    upgradeKaarten: STANDAARD_UPGRADE,
    maxLevel: 8,
  },
  {
    id: "cloaked_figure",
    naam: "Schaduwloper",
    rarity: "legendarisch",
    type: "held",
    sprite: "/assets/heroes/cloaked_figure/cloaked_figure_idle.png",
    beschrijving: "Onzichtbare aanvaller die toeslaat vanuit de schaduw.",
    stats: { aanval: 8, verdediging: 4, snelheid: 10, speciale: 9 },
    upgradeKaarten: STANDAARD_UPGRADE,
    maxLevel: 8,
  },
  {
    id: "smith",
    naam: "Smid",
    rarity: "gewoon",
    type: "npc",
    sprite: "/assets/npcs/idle/smith_idle.png",
    beschrijving: "Repareert wapens en maakt uitrusting.",
    stats: { aanval: 4, verdediging: 5, snelheid: 3, speciale: 7 },
    upgradeKaarten: STANDAARD_UPGRADE,
    maxLevel: 8,
  },
  {
    id: "angler",
    naam: "Visser",
    rarity: "gewoon",
    type: "npc",
    sprite: "/assets/npcs/idle/angler_idle.png",
    beschrijving: "Vangt vis voor voedsel en handel.",
    stats: { aanval: 2, verdediging: 3, snelheid: 5, speciale: 4 },
    upgradeKaarten: STANDAARD_UPGRADE,
    maxLevel: 8,
  },
  {
    id: "doctor",
    naam: "Dokter",
    rarity: "zeldzaam",
    type: "npc",
    sprite: "/assets/npcs/idle/doctor_idle.png",
    beschrijving: "Heelt gewonde krijgers na de strijd.",
    stats: { aanval: 1, verdediging: 4, snelheid: 4, speciale: 9 },
    upgradeKaarten: STANDAARD_UPGRADE,
    maxLevel: 8,
  },
  {
    id: "old_man",
    naam: "Oude Wijze",
    rarity: "zeldzaam",
    type: "npc",
    sprite: "/assets/npcs/idle/old_man_idle.png",
    beschrijving: "Geeft wijze raad en boost het moreel.",
    stats: { aanval: 1, verdediging: 2, snelheid: 2, speciale: 8 },
    upgradeKaarten: STANDAARD_UPGRADE,
    maxLevel: 8,
  },
  {
    id: "witch",
    naam: "Heks",
    rarity: "zeldzaam",
    type: "npc",
    sprite: "/assets/npcs/idle/witch_idle.png",
    beschrijving: "Brouwt drankjes en vervloekt vijanden.",
    stats: { aanval: 6, verdediging: 3, snelheid: 5, speciale: 8 },
    upgradeKaarten: STANDAARD_UPGRADE,
    maxLevel: 8,
  },
];

export const STARTER_KAART_IDS = ["archer", "smith"] as const;

export const RARITY_COLORS: Record<
  Rarity,
  { bg: string; border: string; accent: string; label: string }
> = {
  gewoon: {
    bg: "#1a1a2e",
    border: "#9B9B9B",
    accent: "#C0C0C0",
    label: "GEWOON",
  },
  zeldzaam: {
    bg: "#0d1b2a",
    border: "#4A90D9",
    accent: "#4A90D9",
    label: "ZELDZAAM",
  },
  episch: {
    bg: "#1a0d2e",
    border: "#9B59B6",
    accent: "#B983D9",
    label: "EPISCH",
  },
  legendarisch: {
    bg: "#1a1200",
    border: "#FFD700",
    accent: "#FFD700",
    label: "LEGENDARISCH",
  },
};

export function kaartenNodigVoorLevel(
  kaart: Kaart,
  level: number,
): number | null {
  if (level >= kaart.maxLevel) return null;
  return kaart.upgradeKaarten[level - 1] ?? null;
}

export function getKaart(id: string): Kaart | undefined {
  return kaarten.find((k) => k.id === id);
}

// ─── Reward rolling ────────────────────────────────────────────────

export type KistType = "bronze" | "silver" | "epic" | "legendary";
export type KistSize = "small" | "medium" | "large" | "mega";
export type ResourceType = "hout" | "steen" | "goud";

export type Reward =
  | { type: "coins"; amount: number }
  | { type: "resource"; resource: ResourceType; amount: number }
  | { type: "kaart"; kaart: Kaart; rarity: Rarity; amount: number };

const SLOTS_PER_SIZE: Record<KistSize, number> = {
  small: 3,
  medium: 4,
  large: 5,
  mega: 6,
};

// [min, max] coin/resource amount per slot, per kist + size
const COIN_RANGES: Record<KistType, Record<KistSize, [number, number]>> = {
  bronze: {
    small: [25, 50],
    medium: [30, 60],
    large: [40, 80],
    mega: [60, 100],
  },
  silver: {
    small: [50, 100],
    medium: [75, 125],
    large: [100, 175],
    mega: [150, 250],
  },
  epic: {
    small: [100, 200],
    medium: [150, 275],
    large: [200, 350],
    mega: [300, 500],
  },
  legendary: {
    small: [200, 400],
    medium: [300, 550],
    large: [400, 700],
    mega: [600, 1000],
  },
};

// Rarity kansen (percentages tellen op tot 100)
type RarityOdds = Partial<Record<Rarity, number>>;
const RARITY_ODDS: Record<KistType, Record<KistSize, RarityOdds>> = {
  bronze: {
    small: { gewoon: 80, zeldzaam: 20 },
    medium: { gewoon: 70, zeldzaam: 28, episch: 2 },
    large: { gewoon: 55, zeldzaam: 38, episch: 7 },
    mega: { gewoon: 40, zeldzaam: 45, episch: 13, legendarisch: 2 },
  },
  silver: {
    small: { gewoon: 50, zeldzaam: 45, episch: 5 },
    medium: { gewoon: 30, zeldzaam: 50, episch: 18, legendarisch: 2 },
    large: { gewoon: 15, zeldzaam: 50, episch: 30, legendarisch: 5 },
    mega: { zeldzaam: 40, episch: 45, legendarisch: 15 },
  },
  epic: {
    small: { gewoon: 10, zeldzaam: 40, episch: 45, legendarisch: 5 },
    medium: { zeldzaam: 25, episch: 60, legendarisch: 15 },
    large: { zeldzaam: 10, episch: 65, legendarisch: 25 },
    mega: { episch: 60, legendarisch: 40 },
  },
  legendary: {
    small: { zeldzaam: 10, episch: 50, legendarisch: 40 },
    medium: { episch: 45, legendarisch: 55 },
    large: { episch: 30, legendarisch: 70 },
    mega: { episch: 10, legendarisch: 90 },
  },
};

function rollCoinAmount(kistType: KistType, kistSize: KistSize): number {
  const [min, max] = COIN_RANGES[kistType][kistSize];
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rollRarity(kistType: KistType, kistSize: KistSize): Rarity {
  const odds = RARITY_ODDS[kistType][kistSize];
  const rand = Math.random() * 100;
  let cum = 0;
  for (const [rarity, kans] of Object.entries(odds) as [Rarity, number][]) {
    cum += kans;
    if (rand < cum) return rarity;
  }
  // Fallback (should be unreachable als odds optellen tot 100)
  return "gewoon";
}

function combineerDuplicaten(rewards: Reward[]): Reward[] {
  const gecombineerd: Reward[] = [];
  for (const r of rewards) {
    if (r.type === "kaart") {
      const bestaand = gecombineerd.find(
        (g) => g.type === "kaart" && g.kaart.id === r.kaart.id,
      ) as Extract<Reward, { type: "kaart" }> | undefined;
      if (bestaand) {
        bestaand.amount += r.amount;
        continue;
      }
    }
    gecombineerd.push({ ...r });
  }
  return gecombineerd;
}

export function rollRewards(
  kistType: KistType,
  kistSize: KistSize,
): Reward[] {
  const slots = SLOTS_PER_SIZE[kistSize];
  const resources: ResourceType[] = ["hout", "steen", "goud"];
  const rewards: Reward[] = [];

  for (let i = 0; i < slots; i++) {
    const roll = Math.random();
    if (roll < 0.4) {
      rewards.push({
        type: "coins",
        amount: rollCoinAmount(kistType, kistSize),
      });
    } else if (roll < 0.75) {
      rewards.push({
        type: "resource",
        resource: resources[Math.floor(Math.random() * resources.length)],
        amount: rollCoinAmount(kistType, kistSize),
      });
    } else {
      const rarity = rollRarity(kistType, kistSize);
      const pool = kaarten.filter((k) => k.rarity === rarity);
      const kaart = pool[Math.floor(Math.random() * pool.length)];
      rewards.push({ type: "kaart", kaart, rarity, amount: 1 });
    }
  }

  return combineerDuplicaten(rewards);
}
