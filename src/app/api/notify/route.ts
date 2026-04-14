import { db } from "@/lib/db";
import { subscriptions } from "@/lib/schema";
import webPush from "@/lib/webpush";
import { NextResponse } from "next/server";
import { eq, arrayContains } from "drizzle-orm";

export async function POST(req: Request) {
  const { topic } = await req.json().catch(() => ({ topic: "All" }));

  let subs;
  if (topic && topic !== "All") {
    subs = await db.select().from(subscriptions).where(arrayContains(subscriptions.topics, [topic]));
  } else {
    subs = await db.select().from(subscriptions);
  }

  const payload = JSON.stringify({
    title: topic && topic !== "All" ? `PushPulse 🚀 - ${topic}` : "PushPulse 🚀",
    body: `New notification from your app${topic && topic !== "All" ? ` for ${topic}` : ""}!`,
  });

  await Promise.all(
    subs.map(async (sub) => {
      try {
        await webPush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: {
              p256dh: sub.p256dh,
              auth: sub.auth,
            },
          },
          payload,
        );
      } catch (err: any) {
        console.error("Push failed:", err);
        if (err.statusCode === 410 || err.statusCode === 404) {
          try {
            await db.delete(subscriptions).where(eq(subscriptions.endpoint, sub.endpoint));
            console.log("Deleted stale subscription:", sub.endpoint);
          } catch (deleteErr) {
            console.error("Failed to delete stale subscription:", deleteErr);
          }
        }
      }
    }),
  );

  return NextResponse.json({ message: "Notifications sent" });
}
