"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/app/(auth)/auth";
import { clearUserProgress } from "@/lib/db/queries";

export async function resetProgress() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await clearUserProgress({ userId: session.user.id });
  revalidatePath("/profile");
  revalidatePath("/challenges");
  revalidatePath("/leaderboard");
}
