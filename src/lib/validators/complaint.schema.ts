import { z } from "zod";
import { COMPLAINT_CATEGORIES, COMPLAINT_MAX_CHARS } from "@/lib/constants";

export const createComplaintSchema = z.object({
  category: z.enum(COMPLAINT_CATEGORIES, { error: "Choose a category" }),
  description: z
    .string()
    .trim()
    .min(1, "Describe the problem")
    .max(COMPLAINT_MAX_CHARS, `Keep it under ${COMPLAINT_MAX_CHARS} characters`),
});

// Caretaker side (used when the caretaker screens are built). Students can never set Resolved.
export const updateComplaintStatusSchema = z.object({
  status: z.enum(["InProgress", "Resolved"]),
});

export type CreateComplaintInput = z.infer<typeof createComplaintSchema>;
