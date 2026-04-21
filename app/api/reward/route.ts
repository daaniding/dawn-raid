import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { getKaart, STARTER_KAART_IDS, type Reward } from "@/lib/kaarten";

type KaartState = { level: number; kaarten: number; ontgrendeld: boolean };

const walletKey = (userId: string) => `user:${userId}:wallet`;
const kaartKey = (userId: string, kaartId: string) =>
  `user:${userId}:kaart:${kaartId}`;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, rewards } = body as { userId: string; rewards: Reward[] };

  if (!userId || !Array.isArray(rewards)) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  let coinsDelta = 0;
  const resourceDelta: Record<string, number> = { hout: 0, steen: 0, goud: 0 };

  for (const r of rewards) {
    if (r.type === "coins") {
      coinsDelta += r.amount;
    } else if (r.type === "resource") {
      resourceDelta[r.resource] = (resourceDelta[r.resource] ?? 0) + r.amount;
    } else if (r.type === "kaart") {
      const kaart = getKaart(r.kaart.id);
      if (!kaart) continue;
      const key = kaartKey(userId, kaart.id);
      const huidig = ((await redis.get(key)) as KaartState | null) ?? {
        level: (STARTER_KAART_IDS as readonly string[]).includes(kaart.id)
          ? 1
          : 0,
        kaarten: 0,
        ontgrendeld: (STARTER_KAART_IDS as readonly string[]).includes(
          kaart.id,
        ),
      };
      const nieuw: KaartState = {
        level: huidig.level === 0 ? 1 : huidig.level,
        kaarten: huidig.kaarten + r.amount,
        ontgrendeld: true,
      };
      await redis.set(key, nieuw);
    }
  }

  if (coinsDelta > 0) {
    await redis.hincrby(walletKey(userId), "coins", coinsDelta);
  }
  for (const [res, amount] of Object.entries(resourceDelta)) {
    if (amount > 0) {
      await redis.hincrby(walletKey(userId), res, amount);
    }
  }

  const wallet = (await redis.hgetall(walletKey(userId))) ?? {};
  return NextResponse.json({ wallet });
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }
  const wallet = (await redis.hgetall(walletKey(userId))) ?? {};
  return NextResponse.json({ wallet });
}
