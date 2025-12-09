"use server";

import { auth } from "@/app/(auth)/auth";
import { getChallenges, getUserChallengeProgress } from "@/lib/db/queries";
import type { Category, Difficulty, ChallengeStatus } from "./data";

export type ChallengeWithStatus = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: Category;
  difficulty: Difficulty;
  points: number;
  status: ChallengeStatus;
};

export async function getChallengesWithStatus(): Promise<ChallengeWithStatus[]> {
  const [challenges, session] = await Promise.all([getChallenges(), auth()]);

  let solvedIds = new Set<string>();

  if (session?.user?.id) {
    const progress = await getUserChallengeProgress({ userId: session.user.id });
    progress.forEach((p) => solvedIds.add(p.challengeId));
  }

  return challenges.map((c) => ({
    id: c.id,
    slug: c.slug,
    title: c.title,
    description: c.description,
    category: c.category as Category,
    difficulty: c.difficulty as Difficulty,
    points: c.points,
    status: solvedIds.has(c.id) ? "solved" : "not-started",
  }));
}
