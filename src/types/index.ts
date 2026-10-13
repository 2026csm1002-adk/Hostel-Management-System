import type {
  CLEANING_STATUSES,
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
export type CleaningStatus = (typeof CLEANING_STATUSES)[number];

export type SessionUser = {
  email: string;
  role: Role;
  userId: string | null;   // null = student who has not created a profile yet
  hostelId: string | null; // null for the Supervisor and for such a student
};

// ---------------------------------------------------------------------------
// Data shapes the API sends to the browser (DTOs). Services build these from
// database rows, so the UI never depends on table column names.
// ---------------------------------------------------------------------------

export type StudentProfile = {
  studentId: string; // roll no
  fullName: string;
  email: string;
  hostelId: string;
  hostelName: string;
  wing: string;
  roomNo: string;
  floor: number;      // worked out from roomNo: 0 = ground floor
  floorLabel: string; // "Ground floor", "1st floor", ...
  course: Course;
  batch: string;
};

export type SlotAvailability = {
  slotStart: string; // "09:00"
  label: string;     // "9:00–10:00 AM"
  filled: number;
  capacity: number;
  status: "Available" | "Full";
  bookedByMe: boolean; // my room already holds a seat in this slot
};

export type CleaningBookingDTO = {
  id: string;
  date: string; // YYYY-MM-DD
  slotStart: string;
  label: string;
  floor: number;
  floorLabel: string;
  roomNo: string;
  seat: number;
  status: CleaningStatus;
};

export type ComplaintDTO = {
  id: string;
  category: ComplaintCategory;
  description: string;
  status: ComplaintStatus;
  createdAt: string; // ISO timestamp
  daysOld: number;
  canReregister: boolean;
  reregisteredFrom: string | null;
  reregistered: boolean; // a newer complaint already replaced this one
};

export type SwapDTO = {
  id: string;
  reason: string;
  status: SwapStatus;
  createdAt: string;
  attachmentName: string | null;
  assignedRoom: string | null;
  wardenComment: string | null;
};
