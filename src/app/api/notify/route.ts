import { db } from "@/lib/db";
import { subscriptions } from "@/lib/schema";
import webPush from "@/lib/webpush";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST() {
  const subs = await db.select().from(subscriptions);

  const payload = JSON.stringify({
    title: "PushPulse 🚀",
    body: "New notification from your app!",
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
