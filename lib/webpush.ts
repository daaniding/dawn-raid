import webpush from "web-push";
import { redis } from "./redis";

const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const privateKey = process.env.VAPID_PRIVATE_KEY;
const subject = process.env.VAPID_SUBJECT;

let configured = false;
function ensureConfigured() {
  if (configured) return true;
  if (!publicKey || !privateKey || !subject) return false;
  webpush.setVapidDetails(subject, publicKey, privateKey);
  configured = true;
  return true;
}

export type PushSubscriptionJSON = {
  endpoint: string;
  keys: { p256dh: string; auth: string };
};

export const subscriptionKey = (userId: string) => `sub:${userId}`;

export async function sendPush(
  userId: string,
  payload: { title: string; body: string; url?: string; tag?: string },
): Promise<void> {
  if (!ensureConfigured()) return;
  const sub = await redis.get<PushSubscriptionJSON>(subscriptionKey(userId));
  if (!sub) return;
  try {
    await webpush.sendNotification(sub, JSON.stringify(payload));
  } catch (err: unknown) {
    // If endpoint is gone (410) or invalid (404), drop the subscription
    const statusCode =
      typeof err === "object" && err !== null && "statusCode" in err
        ? Number((err as { statusCode?: number }).statusCode)
        : 0;
    if (statusCode === 404 || statusCode === 410) {
      await redis.del(subscriptionKey(userId));
    }
  }
}
