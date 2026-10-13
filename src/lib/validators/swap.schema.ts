import { z } from "zod";
import { SWAP_REASON_MAX_CHARS, SWAP_REASON_MIN_CHARS } from "@/lib/constants";

export const submitSwapSchema = z.object({
  reason: z
    .string()
    .trim()
    .min(SWAP_REASON_MIN_CHARS, `Please explain the reason (at least ${SWAP_REASON_MIN_CHARS} characters)`)
    .max(SWAP_REASON_MAX_CHARS, `Keep the reason under ${SWAP_REASON_MAX_CHARS} characters`),
});

// Warden / caretaker schemas are added with their screens:
//   decisionSchema (Accept/Reject/Waiting, comment required unless Accept), assignRoomSchema (room)

export type SubmitSwapInput = z.infer<typeof submitSwapSchema>;
