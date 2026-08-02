import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  email: z.string().trim().email("Please enter a valid email address.").max(254),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  subject: z.string().trim().min(3, "Please add a subject.").max(120),
  message: z.string().trim().min(10, "Please write a little more detail.").max(3000),
  website: z.string().max(0).optional(),
});

export const chatSchema = z.object({
  message: z.string().trim().min(1).max(500),
  conversationId: z.string().uuid().optional(),
});
