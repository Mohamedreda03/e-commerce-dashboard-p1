"use server";

import { EmailResetPasswordTemplate } from "@/components/constants/email-template-reset-password";
import { EmailVerificationTemplate } from "@/components/constants/email-template-verification";
import env from "@/lib/env";
import { Resend } from "resend";

const resend = new Resend(env.resend.RESEND_API_KEY);

export async function sendEmailResetPassword(email: string, url: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [email],
      subject: "Reset your password",
      react: EmailResetPasswordTemplate({ url }),
    });

    if (error) {
      return { error };
    }

    return { data };
  } catch (error) {
    return { error };
  }
}
