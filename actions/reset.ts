"use server";

import * as z from "zod";

import { ResetSchema } from "@/schema";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/token";
import { sendPasswordResetEmail } from "@/lib/mail";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid Email",
    };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return {
      error: "User not found",
    };
  }

  const passweordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(
    passweordResetToken.email,
    passweordResetToken.token
  );

  return {
    success: "Password reset email sent",
  };
};
