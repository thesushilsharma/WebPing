import { db } from "@/lib/db";
import { notifications } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await db
    .update(notifications)
    .set({ read: true })
    .where(eq(notifications.id, id));

  return Response.json({ success: true });
}
