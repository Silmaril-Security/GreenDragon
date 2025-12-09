"use server";

import { z } from "zod";

import { createUser, getUser, transferGuestProgress } from "@/lib/db/queries";

import { auth, signIn } from "./auth";

const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginActionState = {
  status: "idle" | "in_progress" | "success" | "failed" | "invalid_data";
};

export const login = async (
  _: LoginActionState,
  formData: FormData
): Promise<LoginActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    });

    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }

    return { status: "failed" };
  }
};

export type RegisterActionState = {
  status:
    | "idle"
    | "in_progress"
    | "success"
    | "failed"
    | "user_exists"
    | "invalid_data";
};

export const register = async (
  _: RegisterActionState,
  formData: FormData
): Promise<RegisterActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const [existingUser] = await getUser(validatedData.email);

    if (existingUser) {
      return { status: "user_exists" } as RegisterActionState;
    }

    // Check if current session is a guest before creating new user
    const session = await auth();
    const guestUserId = session?.user?.type === "guest" ? session.user.id : null;

    await createUser(validatedData.email, validatedData.password);

    // Transfer guest progress to new account
    if (guestUserId) {
      const [newUser] = await getUser(validatedData.email);
      if (newUser) {
        await transferGuestProgress({
          guestUserId,
          newUserId: newUser.id,
        });
      }
    }

    await signIn("credentials", {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    });

    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }

    return { status: "failed" };
  }
};
