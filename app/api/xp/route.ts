import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import {
  LEVEL_REWARDS,
  getLevelVanXp,
  type LevelReward,
} from "@/lib/levels";
import { STARTER_KAART_IDS, getKaart } from "@/lib/kaarten";

const xpKey = (uid: string) => `user:${uid}:xp`;
const walletKey = (uid: string) => `user:${uid}:wallet`;
const kaartKey = (uid: string, kid: string) => `user:${uid}:kaart:${kid}`;

type KaartState = { level: number; kaarten: number; ontgrendeld: boolean };

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }
  const xpRaw = await redis.get(xpKey(userId));
  const totalXp = typeof xpRaw === "number" ? xpRaw : Number(xpRaw ?? 0);
  const info = getLevelVanXp(totalXp);
  return NextResponse.json(info);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, amount, bron } = body as {
    userId: string;
    amount: number;
    bron?: string;
  };
  if (!userId || typeof amount !== "number") {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const xpRaw = await redis.get(xpKey(userId));
  const oudTotaal = typeof xpRaw === "number" ? xpRaw : Number(xpRaw ?? 0);
  const oudInfo = getLevelVanXp(oudTotaal);

  const nieuwTotaal = oudTotaal + amount;
  const nieuwInfo = getLevelVanXp(nieuwTotaal);

  const levelsOmhoog = nieuwInfo.level - oudInfo.level;
  const levelUp = levelsOmhoog > 0;
  const rewards: Array<LevelReward & { level: number }> = [];

  if (levelUp) {
    for (let lvl = oudInfo.level + 1; lvl <= nieuwInfo.level; lvl++) {
      const reward = LEVEL_REWARDS[lvl];
      if (!reward) continue;
      rewards.push({ ...reward, level: lvl });

      if (reward.coins) {
        await redis.hincrby(walletKey(userId), "coins", reward.coins);
      }
      if (reward.resource && reward.resourceAmount) {
        await redis.hincrby(
          walletKey(userId),
          reward.resource,
          reward.resourceAmount,
        );
      }
      if (reward.nieuweKaart) {
        const kaart = getKaart(reward.nieuweKaart);
        if (kaart) {
          const key = kaartKey(userId, kaart.id);
          const huidig =
            ((await redis.get(key)) as KaartState | null) ?? {
              level: 0,
              kaarten: 0,
              ontgrendeld: false,
            };
          if (!huidig.ontgrendeld) {
            await redis.set(key, {
              level: 1,
              kaarten: 0,
              ontgrendeld: true,
            });
          }
          await redis.set(`user:${userId}:kaart_unlocked:${kaart.id}`, true);
        }
      }
    }
  }

  await redis.set(xpKey(userId), nieuwTotaal);

  return NextResponse.json({
    xp: nieuwTotaal,
    level: nieuwInfo.level,
    levelUp,
    levelsOmhoog,
    rewards,
    progress: nieuwInfo.progress,
    xpInHuidigLevel: nieuwInfo.xpInHuidigLevel,
    xpVoorVolgendLevel: nieuwInfo.xpVoorVolgendLevel,
    bron: bron ?? null,
    starters: STARTER_KAART_IDS,
  });
}
