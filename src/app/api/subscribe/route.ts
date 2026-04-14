import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { subscriptions } from "@/lib/schema";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const sub = data.sub || data;
    const topics = data.topics || ["General"];

    await db
      .insert(subscriptions)
      .values({
        id: randomUUID(),
        endpoint: sub.endpoint,
        p256dh: sub.keys.p256dh,
        auth: sub.keys.auth,
        topics,
      })
      .onConflictDoUpdate({
        target: subscriptions.endpoint,
        set: { topics },
      });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
