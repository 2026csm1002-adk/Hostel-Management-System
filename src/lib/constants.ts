// THE one place for every business number and fixed list.
// Change a rule here once and the whole app follows.

export const MAX_ROOMS_PER_SLOT = 3;
export const BOOKING_MIN_DAYS_AHEAD = 2;
export const BOOKING_MAX_DAYS_AHEAD = 4;
export const REREGISTER_AFTER_DAYS = 7;

// One-hour slots: 9-1 and 2-4
export const SLOT_STARTS = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00"] as const;

export const ROLES = ["Student", "Caretaker", "Supervisor", "Warden"] as const;
export const STAFF_ROLES = ["Caretaker", "Supervisor", "Warden"] as const;
export const COURSES = ["BTech", "MTech", "PhD", "Other"] as const;

export const COMPLAINT_CATEGORIES = [
  "Carpenter",
  "Plumbing",
  "Pest Control",
  "Drinking Water",
  "Horticulture",
  "Network & Wifi",
  "Electrical",
  "Others",
] as const;
export const COMPLAINT_STATUSES = ["Open", "InProgress", "Resolved"] as const;
export const SWAP_STATUSES = [
  "Pending",
  "Forwarded",
  "Accepted",
  "AwaitingRoom",
  "RoomAssigned",
  "Rejected",
  "Waiting",
] as const;

export const HOSTELS = [
  { id: "satluj", name: "Satluj", type: "Boys" },
  { id: "beas", name: "Beas", type: "Boys" },
  { id: "chenab", name: "Chenab", type: "Boys" },
  { id: "brahmaputra-south", name: "Brahmaputra South", type: "Boys" },
  { id: "brahmaputra-north", name: "Brahmaputra North", type: "Boys" },
  { id: "raavi", name: "Raavi", type: "Girls" },
  { id: "chintpurni", name: "Chintpurni", type: "Girls" },
  { id: "t6", name: "T6", type: "Girls" },
] as const;

// Where each role lands after login. Used by src/app/page.tsx and src/proxy.ts
export const ROLE_HOME = {
  Student: "/student",
  Caretaker: "/caretaker/complaints",
  Supervisor: "/supervisor/board",
  Warden: "/warden/swaps",
} as const;
