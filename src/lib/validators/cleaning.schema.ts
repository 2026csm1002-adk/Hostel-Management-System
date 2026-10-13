import { z } from "zod";
import { SLOT_STARTS } from "@/lib/constants";
import { isValidISODate } from "@/lib/dates";

const date = z.string().refine(isValidISODate, "Choose a valid date");

// The floor is not sent: a student always books their own floor (from their profile).
// The 2-4 day window and the 3-seat limit are checked in the service.
export const bookingSchema = z.object({
  date,
  slotStart: z.enum(SLOT_STARTS, { error: "Choose a time slot" }),
});

export const availabilityQuerySchema = z.object({ date });

export type BookingInput = z.infer<typeof bookingSchema>;
