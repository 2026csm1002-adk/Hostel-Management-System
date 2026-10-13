import { z } from "zod";
import { COURSES, HOSTELS } from "@/lib/constants";
import { floorFromRoom } from "@/lib/room";

// Shape checks only. "Roll no already taken" is a service rule.
export const profileSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(80, "Name is too long"),
  hostelId: z
    .string()
    .refine((id) => HOSTELS.some((h) => h.id === id), "Choose your hostel"),
  wing: z.string().trim().min(1, "Enter your wing").max(10, "Wing is too long"),
  roomNo: z
    .string()
    .trim()
    .min(1, "Enter your room number")
    .max(10, "Room number is too long")
    .refine((r) => floorFromRoom(r) !== null, "Enter a room number like 105 or 207 (3 digits or more)"),
  course: z.enum(COURSES, { error: "Choose your course" }),
  // Normally read from the institute email. Only needed when the email does not contain them,
  // and only used on the very first save.
  rollNo: z
    .string()
    .trim()
    .regex(/^[A-Za-z0-9]{6,15}$/, "Enter a valid roll number")
    .optional(),
  batch: z
    .string()
    .trim()
    .regex(/^\d{4}$/, "Enter the batch as a 4-digit year")
    .optional(),
});

export type ProfileInput = z.infer<typeof profileSchema>;
