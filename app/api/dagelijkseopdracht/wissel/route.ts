import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { opdrachten } from "@/lib/opdrachten";

const wisselKey = (userId: string, duur: number, datum: string) =>
  `user:${userId}:wissel:${duur}:${datum}`;

const VALID_DUUR = new Set([5, 15, 30, 60]);

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  const datum = url.searchParams.get("datum");
  if (!userId || !datum) {
    return NextResponse.json(
      { success: false, error: "missing userId or datum" },
      { status: 400 },
    );
  }
  const used: Record<5 | 15 | 30 | 60, boolean> = {
    5: false,
    15: false,
    30: false,
    60: false,
  };
  for (const d of [5, 15, 30, 60] as const) {
    const v = await redis.get<boolean>(wisselKey(userId, d, datum));
    used[d] = v === true;
  }
  return NextResponse.json({ success: true, used });
}

export async function POST(req: Request) {
  let body: {
    userId?: string;
    datum?: string;
    duur?: 5 | 15 | 30 | 60;
    huidigId?: number;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "invalid json" },
      { status: 400 },
    );
  }
  const { userId, datum, duur, huidigId } = body;
  if (
    !userId ||
    !datum ||
    typeof huidigId !== "number" ||
    !duur ||
    !VALID_DUUR.has(duur)
  ) {
    return NextResponse.json(
      { success: false, error: "missing fields" },
      { status: 400 },
    );
  }

  const key = wisselKey(userId, duur, datum);
  const reeds = await redis.get<boolean>(key);
  if (reeds === true) {
    return NextResponse.json(
      { success: false, error: "al gewisseld" },
      { status: 403 },
    );
  }

  const pool = opdrachten.filter((o) => o.duur === duur && o.id !== huidigId);
  if (pool.length === 0) {
    return NextResponse.json(
      { success: false, error: "geen alternatief" },
      { status: 500 },
    );
  }
  const nieuwe = pool[Math.floor(Math.random() * pool.length)];

  await redis.set(key, true, { ex: 60 * 60 * 48 });

  return NextResponse.json({ success: true, opdracht: nieuwe });
}
