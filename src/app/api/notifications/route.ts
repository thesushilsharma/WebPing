import { db } from "@/lib/db";
import { notifications } from "@/lib/schema";

export async function GET() {
  const data = await db.select().from(notifications);
  return Response.json(data);
}