import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import {
  subscriptionKey,
  type PushSubscriptionJSON,
} from "@/lib/webpush";

type Body = {
  userId?: string;
  subscription?: PushSubscriptionJSON;
};

function isValid(sub: unknown): sub is PushSubscriptionJSON {
  if (!sub || typeof sub !== "object") return false;
  const s = sub as Record<string, unknown>;
  if (typeof s.endpoint !== "string") return false;
  if (!s.keys || typeof s.keys !== "object") return false;
  const keys = s.keys as Record<string, unknown>;
  return typeof keys.p256dh === "string" && typeof keys.auth === "string";
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "invalid json" },
      { status: 400 },
    );
  }
  const { userId, subscription } = body;
  if (!userId || !isValid(subscription)) {
    return NextResponse.json(
      { success: false, error: "bad request" },
      { status: 400 },
    );
  }
  // Keep subscriptions for 30d; renewed every timer start
  await redis.set(subscriptionKey(userId), subscription, {
    ex: 60 * 60 * 24 * 30,
  });
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const userId = new URL(req.url).searchParams.get("userId");
  if (!userId) {
    return NextResponse.json(
      { success: false, error: "missing userId" },
      { status: 400 },
    );
  }
  await redis.del(subscriptionKey(userId));
  return NextResponse.json({ success: true });
}
