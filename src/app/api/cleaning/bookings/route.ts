import { bookingSchema } from "@/lib/validators/cleaning.schema";
import { requireStudentEmail, respond } from "@/server/api-helpers";
import { cleaningService } from "@/server/services/cleaning.service";

// POST /api/cleaning/bookings  { date, slotStart }
export function POST(req: Request) {
  return respond(async () => {
    const email = await requireStudentEmail();
    const input = bookingSchema.parse(await req.json());
    return { booking: await cleaningService.bookSlot(email, input) };
  }, 201);
}

// GET /api/cleaning/bookings -> my bookings
export function GET() {
  return respond(async () => {
    const email = await requireStudentEmail();
    return { bookings: await cleaningService.listMine(email) };
  });
}
