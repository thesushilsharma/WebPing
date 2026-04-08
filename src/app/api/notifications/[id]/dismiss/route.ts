import { db } from "@/lib/db";
import { notifications } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await db
    .update(notifications)
    .set({ read: true })
    .where(eq(notifications.id, params.id));

  return Response.json({ success: true });
}