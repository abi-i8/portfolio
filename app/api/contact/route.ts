import { NextRequest } from "next/server";
import { contactSchema } from "@/lib/validation";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const payload = contactSchema.safeParse(await request.json().catch(() => null));
  if (!payload.success) return Response.json({ error: payload.error.issues[0]?.message ?? "Invalid form." }, { status: 400 });
  if (payload.data.website) return Response.json({ ok: true });

  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert({
    name: payload.data.name, email: payload.data.email, phone: payload.data.phone || null,
    subject: payload.data.subject, message: payload.data.message,
  });
  if (error) return Response.json({ error: "We couldn't send your message. Please try again shortly." }, { status: 500 });
  return Response.json({ ok: true });
}
