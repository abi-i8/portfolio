import { chatSchema } from "@/lib/validation";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const parsed = chatSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Please enter a shorter message." }, { status: 400 });
  const supabase = await createClient();
  const { data: conversation } = await supabase.from("chat_conversations")
    .upsert({ id: parsed.data.conversationId, updated_at: new Date().toISOString() }, { onConflict: "id" }).select("id").single();
  if (conversation) await supabase.from("chat_messages").insert({ conversation_id: conversation.id, role: "user", content: parsed.data.message });
  return Response.json({ conversationId: conversation?.id ?? null });
}
