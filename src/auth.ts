import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const allowedDomain = process.env.ALLOWED_EMAIL_DOMAIN?.trim().toLowerCase() || null;

// TEMPORARY: login only proves WHO the person is (Google account). It does not
// decide student vs admin yet and it does not touch the database.
// When roles are decided, add `jwt` and `session` callbacks below that call
// resolveRole() from src/server/services/auth.service.ts and store role/userId/hostelId.
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      // Always show Google's account chooser, even if Chrome is already signed in.
      // No "hd" hint on purpose: it can make Google skip the chooser on phones.
      // The real institute-email check is the signIn callback below.
      authorization: { params: { prompt: "select_account" } },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login", error: "/login" },
  callbacks: {
    // The real security check: only institute emails may sign in.
    async signIn({ account, profile }) {
      if (account?.provider !== "google") return false;
      const email = profile?.email?.toLowerCase();
      if (!email || profile?.email_verified !== true) return false;

      // A missing domain must never mean "everyone" in production.
      if (!allowedDomain) return process.env.NODE_ENV !== "production";
      return email.endsWith("@" + allowedDomain);
    },
  },
});
