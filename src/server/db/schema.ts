import { sqliteTable, text } from "drizzle-orm/sqlite-core";
// Relative import on purpose: drizzle-kit does not understand the "@/" alias.
import { COURSES, STAFF_ROLES } from "../../lib/constants";

// Only the tables login needs. Aditya adds cleaning_booking, complaint,
// swap_request and attachment below, following the ER diagram.

export const hostel = sqliteTable("hostel", {
  hostelId: text("hostel_id").primaryKey(),
  name: text("name").notNull().unique(),
  type: text("type", { enum: ["Boys", "Girls"] }).notNull(),
});

export const student = sqliteTable("student", {
  studentId: text("student_id").primaryKey(), // roll number
  fullName: text("full_name").notNull(),
  googleEmail: text("google_email").notNull().unique(), // stored lower-case
  hostelId: text("hostel_id").notNull().references(() => hostel.hostelId),
  wing: text("wing").notNull(),
  roomNo: text("room_no").notNull(),
  course: text("course", { enum: COURSES }).notNull(),
  batch: text("batch").notNull(),
});

export const staffUser = sqliteTable("staff_user", {
  staffId: text("staff_id").primaryKey(),
  fullName: text("full_name").notNull(),
  googleEmail: text("google_email").notNull().unique(), // stored lower-case
  role: text("role", { enum: STAFF_ROLES }).notNull(),
  hostelId: text("hostel_id").references(() => hostel.hostelId), // null only for Supervisor
});
