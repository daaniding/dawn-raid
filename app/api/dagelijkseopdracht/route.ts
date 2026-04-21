import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

type StoredOpdracht = {
  opdrachtId: number;
  duur: 5 | 15 | 30 | 60;
  gekozenOp: number;
};

const key = (userId: string, datum: string) =>
  `user:${userId}:dagelijkseopdracht:${datum}`;

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
  const record = await redis.get<StoredOpdracht>(key(userId, datum));
  return NextResponse.json({ success: true, opdracht: record ?? null });
}

export async function POST(req: Request) {
  let body: { userId?: string; datum?: string; opdrachtId?: number; duur?: 5 | 15 | 30 | 60 };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "invalid json" },
      { status: 400 },
    );
  }
  const { userId, datum, opdrachtId, duur } = body;
  if (
    !userId ||
    !datum ||
    typeof opdrachtId !== "number" ||
    (duur !== 5 && duur !== 15 && duur !== 30 && duur !== 60)
  ) {
    return NextResponse.json(
      { success: false, error: "missing fields" },
      { status: 400 },
    );
  }
  const record: StoredOpdracht = { opdrachtId, duur, gekozenOp: Date.now() };
  // 48h TTL — covers the day plus a buffer
  await redis.set(key(userId, datum), record, { ex: 60 * 60 * 48 });
  return NextResponse.json({ success: true });
}
