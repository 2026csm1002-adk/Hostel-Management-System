import { availabilityQuerySchema } from "@/lib/validators/cleaning.schema";
import { requireStudentEmail, respond } from "@/server/api-helpers";
import { cleaningService } from "@/server/services/cleaning.service";

// GET /api/cleaning/slots?date=2026-10-16  -> the six slots of the student's own floor.
// (The supervisor/caretaker version with hostelId + floor is added with the supervisor board.)
export function GET(req: Request) {
  return respond(async () => {
    const email = await requireStudentEmail();
    const { searchParams } = new URL(req.url);
    const { date } = availabilityQuerySchema.parse({ date: searchParams.get("date") });
    return { slots: await cleaningService.getAvailability(email, date) };
  });
}
