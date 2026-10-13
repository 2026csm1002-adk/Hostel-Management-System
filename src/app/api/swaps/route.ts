import { submitSwapSchema } from "@/lib/validators/swap.schema";
import { requireStudentEmail, respond } from "@/server/api-helpers";
import { swapService } from "@/server/services/swap.service";

// POST /api/swaps  (multipart form: reason + optional file)
export function POST(req: Request) {
  return respond(async () => {
    const email = await requireStudentEmail();
    const form = await req.formData();
    const input = submitSwapSchema.parse({ reason: form.get("reason") });
    const file = form.get("file");
    return { swap: await swapService.submit(email, input, file instanceof File ? file : null) };
  }, 201);
}

// GET /api/swaps -> my swap requests (caretaker / warden lists are added with their screens)
export function GET() {
  return respond(async () => {
    const email = await requireStudentEmail();
    return { swaps: await swapService.listMine(email) };
  });
}
