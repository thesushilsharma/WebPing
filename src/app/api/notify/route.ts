import { db } from "@/lib/db";
import { subscriptions } from "@/lib/schema";
import webPush from "@/lib/webpush";

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
      } catch (err) {
        console.error("Push failed:", err);
      }
    }),
  );

  return new Response("Notifications sent");
}
