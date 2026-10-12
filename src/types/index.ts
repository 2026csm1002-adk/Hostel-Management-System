import type {
  COMPLAINT_CATEGORIES,
  COMPLAINT_STATUSES,
  COURSES,
  ROLES,
  SWAP_STATUSES,
} from "@/lib/constants";

export type Role = (typeof ROLES)[number];
export type Course = (typeof COURSES)[number];
export type ComplaintCategory = (typeof COMPLAINT_CATEGORIES)[number];
export type ComplaintStatus = (typeof COMPLAINT_STATUSES)[number];
export type SwapStatus = (typeof SWAP_STATUSES)[number];

export type SessionUser = {
  email: string;
  role: Role;
  userId: string | null;   // null = student who has not created a profile yet
  hostelId: string | null; // null for the Supervisor and for such a student
};
