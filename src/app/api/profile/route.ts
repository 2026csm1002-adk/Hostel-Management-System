import { profileSchema } from "@/lib/validators/profile.schema";
import { requireStudentEmail, respond } from "@/server/api-helpers";
import { profileService } from "@/server/services/profile.service";

export function GET() {
  return respond(async () => {
    const email = await requireStudentEmail();
    return { profile: await profileService.getProfile(email) };
  });
}

export function PUT(req: Request) {
  return respond(async () => {
    const email = await requireStudentEmail();
    const data = profileSchema.parse(await req.json());
    return { profile: await profileService.upsertProfile(email, data) };
  });
}
