import { requireStudentEmail, respond } from "@/server/api-helpers";
import { complaintService } from "@/server/services/complaint.service";

// POST /api/complaints/:id/reregister
export function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  return respond(async () => {
    const email = await requireStudentEmail();
    const { id } = await params;
    return { complaint: await complaintService.reregister(email, id) };
  }, 201);
}
