import { HOSTELS } from "@/lib/constants";
import { floorFromRoom, floorLabel } from "@/lib/room";
import { parseStudentEmail } from "@/lib/student-identity";
import type { ProfileInput } from "@/lib/validators/profile.schema";
import type { StudentRow } from "@/server/db/memory-store";
import { ConflictError, ValidationError } from "@/server/errors";
import { studentRepo } from "@/server/repositories/student.repo";
import type { StudentProfile } from "@/types";

/** Database row -> what the browser receives (adds hostel name and the floor). */
export function toProfile(row: StudentRow): StudentProfile {
  const floor = floorFromRoom(row.roomNo) ?? 0;
  return {
    studentId: row.studentId,
    fullName: row.fullName,
    email: row.googleEmail,
    hostelId: row.hostelId,
    hostelName: HOSTELS.find((h) => h.id === row.hostelId)?.name ?? row.hostelId,
    wing: row.wing,
    roomNo: row.roomNo,
    floor,
    floorLabel: floorLabel(floor),
    course: row.course as StudentProfile["course"],
    batch: row.batch,
  };
}

export const profileService = {
  /** null while the student has not saved a profile yet. */
  async getProfile(email: string): Promise<StudentProfile | null> {
    const row = await studentRepo.findByEmail(email.trim().toLowerCase());
    return row ? toProfile(row) : null;
  },

  /** Every request feature (cleaning, complaint, swap) needs a saved profile. */
  async requireProfile(email: string): Promise<StudentRow> {
    const row = await studentRepo.findByEmail(email.trim().toLowerCase());
    if (!row) throw new ValidationError("Please complete your profile first.");
    return row;
  },

  async upsertProfile(email: string, data: ProfileInput): Promise<StudentProfile> {
    const identity = parseStudentEmail(email);
    const existing = await studentRepo.findByEmail(identity.email);

    // Roll no and batch are read-only once the profile exists.
    const studentId = existing?.studentId ?? identity.rollNo ?? data.rollNo?.toUpperCase();
    const batch = existing?.batch ?? identity.batch ?? data.batch;
    if (!studentId) throw new ValidationError("Enter your roll number.");
    if (!batch) throw new ValidationError("Enter your batch.");

    if (!existing && (await studentRepo.findById(studentId))) {
      throw new ConflictError("This roll number already belongs to another profile.");
    }
    if (floorFromRoom(data.roomNo) === null) {
      throw new ValidationError("Enter a valid room number.");
    }

    const saved = await studentRepo.upsert({
      studentId,
      fullName: data.fullName,
      googleEmail: identity.email,
      hostelId: data.hostelId,
      wing: data.wing.toUpperCase(),
      roomNo: data.roomNo,
      course: data.course,
      batch,
    });
    return toProfile(saved);
  },
};
