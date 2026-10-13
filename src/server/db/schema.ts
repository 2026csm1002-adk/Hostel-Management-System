import {
  sqliteTable,
  text,
  integer,
  unique,
  check,
  foreignKey,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// 1. HOSTEL
export const hostel = sqliteTable(
  "hostel",
  {
    hostelId: text("hostel_id").primaryKey(),
    name: text("name").notNull().unique(),
    type: text("type").notNull(), // CHECK(Boys, Girls)
  },
  (table) => [
    check("hostel_type_check", sql`${table.type} IN ('Boys', 'Girls')`),
  ]
);

// 2. STAFF USER
export const staffUser = sqliteTable(
  "staff_user",
  {
    staffId: text("staff_id").primaryKey(),
    fullName: text("full_name").notNull(),
    googleEmail: text("google_email").notNull().unique(),
    role: text("role").notNull(), // Caretaker, Supervisor, Warden
    hostelId: text("hostel_id").references(() => hostel.hostelId),
  },
  (table) => [
    check(
      "staff_role_check",
      sql`${table.role} IN ('Caretaker', 'Supervisor', 'Warden')`
    ),
  ]
);

// 3. STUDENT
export const student = sqliteTable(
  "student",
  {
    studentId: text("student_id").primaryKey(), // Institute roll no.
    fullName: text("full_name").notNull(),
    googleEmail: text("google_email").notNull().unique(),
    hostelId: text("hostel_id")
      .notNull()
      .references(() => hostel.hostelId),
    wing: text("wing").notNull(),
    roomNo: text("room_no").notNull(),
    course: text("course").notNull(), // BTech, MTech, PhD, Other
    batch: text("batch").notNull(),
  },
  (table) => [
    check(
      "student_course_check",
      sql`${table.course} IN ('BTech', 'MTech', 'PhD', 'Other')`
    ),
  ]
);

// 4. CLEANING BOOKING
export const cleaningBooking = sqliteTable(
  "cleaning_booking",
  {
    bookingId: text("booking_id").primaryKey(),
    studentId: text("student_id")
      .notNull()
      .references(() => student.studentId),
    hostelId: text("hostel_id")
      .notNull()
      .references(() => hostel.hostelId),
    floor: integer("floor").notNull(),
    roomNo: text("room_no").notNull(),
    bookingDate: text("booking_date").notNull(), // YYYY-MM-DD
    slotStart: text("slot_start").notNull(), // HH:MM
    seat: integer("seat").notNull(), // CHECK(1 to 3)
    status: text("status").notNull(), // Confirmed, Done
  },
  (table) => [
    check("cleaning_seat_check", sql`${table.seat} BETWEEN 1 AND 3`),
    check(
      "cleaning_status_check",
      sql`${table.status} IN ('Confirmed', 'Done')`
    ),
    unique("cleaning_slot_unique").on(
      table.hostelId,
      table.floor,
      table.bookingDate,
      table.slotStart,
      table.seat
    ),
  ]
);

// 5. COMPLAINT (Self-referencing FK)
export const complaint = sqliteTable(
  "complaint",
  {
    complaintId: text("complaint_id").primaryKey(),
    studentId: text("student_id")
      .notNull()
      .references(() => student.studentId),
    category: text("category").notNull(),
    description: text("description").notNull(),
    status: text("status").notNull(), // Open, InProgress, Resolved
    createdAt: text("created_at").notNull(),
    resolvedAt: text("resolved_at"),
    reregisteredFrom: text("reregistered_from"),
  },
  (table) => [
    check(
      "complaint_status_check",
      sql`${table.status} IN ('Open', 'InProgress', 'Resolved')`
    ),
    foreignKey({
      columns: [table.reregisteredFrom],
      foreignColumns: [table.complaintId],
      name: "fk_complaint_reregistered",
    }),
  ]
);

// 6. ATTACHMENT
export const attachment = sqliteTable("attachment", {
  attachmentId: text("attachment_id").primaryKey(),
  storageFileId: text("storage_file_id").notNull(),
  fileName: text("file_name").notNull(),
  uploadedAt: text("uploaded_at").notNull(),
});

// 7. SWAP REQUEST
export const swapRequest = sqliteTable(
  "swap_request",
  {
    swapId: text("swap_id").primaryKey(),
    studentId: text("student_id")
      .notNull()
      .references(() => student.studentId),
    reason: text("reason").notNull(),
    attachmentId: text("attachment_id").references(
      () => attachment.attachmentId
    ),
    status: text("status").notNull(),
    assignedRoom: text("assigned_room"),
    caretakerId: text("caretaker_id").references(() => staffUser.staffId),
    wardenId: text("warden_id").references(() => staffUser.staffId),
    wardenComment: text("warden_comment"),
    createdAt: text("created_at").notNull(),
  },
  (table) => [
    check(
      "swap_status_check",
      sql`${table.status} IN ('Pending', 'Forwarded', 'Accepted', 'AwaitingRoom', 'RoomAssigned', 'Rejected', 'Waiting')`
    ),
  ]
);