import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "./db";
import env from "./env";
import * as schema from "./db/schema";
import { sendEmailVerification } from "@/actions/sendEmailVerification";
import { sendEmailResetPassword } from "@/actions/sendEmailResetPassword";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  rateLimit: {
    window: 60,
    max: 100,
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmailVerification(user.email, url);
    },

    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      await sendEmailResetPassword(user.email, url);
    },
  },
  socialProviders: {
    google: {
      clientId: env.auth.GOOGLE_CLIENT_ID,
      clientSecret: env.auth.GOOGLE_CLIENT_SECRET,
    },
  },
});
