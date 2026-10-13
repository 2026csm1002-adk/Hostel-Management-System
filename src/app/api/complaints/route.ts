import { createComplaintSchema } from "@/lib/validators/complaint.schema";
import { requireStudentEmail, respond } from "@/server/api-helpers";
import { complaintService } from "@/server/services/complaint.service";

// POST /api/complaints  { category, description }
export function POST(req: Request) {
  return respond(async () => {
    const email = await requireStudentEmail();
    const input = createComplaintSchema.parse(await req.json());
    return { complaint: await complaintService.create(email, input) };
  }, 201);
}

// GET /api/complaints -> my complaints (caretaker version is added with the caretaker screens)
export function GET() {
  return respond(async () => {
    const email = await requireStudentEmail();
    return { complaints: await complaintService.listMine(email) };
  });
}
