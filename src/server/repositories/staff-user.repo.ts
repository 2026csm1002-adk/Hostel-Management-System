import { eq } from "drizzle-orm";
import { db } from "@/server/db/client";
import { staffUser } from "@/server/db/schema";

export const staffUserRepo = {
  async findById(staffId: string) {
    const [row] = await db.select().from(staffUser).where(eq(staffUser.staffId, staffId)).limit(1);
    return row;
  },
  async findByEmail(email: string) {
    const [row] = await db.select().from(staffUser).where(eq(staffUser.googleEmail, email)).limit(1);
    return row;
  },
  // findWardenOfHostel(hostelId) is added later for the swap flow
};
