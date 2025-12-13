"use server";

import { auth } from "@/app/(auth)/auth";
import { getChallenges, getUserChallengeProgress } from "@/lib/db/queries";
import type { Category, Difficulty, ChallengeStatus } from "./data";

export type SolvedModel = {
  modelId: string;
  earnedPoints: number;
};

export type ChallengeWithStatus = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: Category;
  difficulty: Difficulty;
  points: number;
  status: ChallengeStatus;
  solvedModels: SolvedModel[];
};

export async function getChallengesWithStatus(): Promise<ChallengeWithStatus[]> {
  const [challenges, session] = await Promise.all([getChallenges(), auth()]);

  // Map challengeId -> array of models solved
  const solvedByChallenge = new Map<string, SolvedModel[]>();

  if (session?.user?.id) {
    const progress = await getUserChallengeProgress({ userId: session.user.id });
    for (const p of progress) {
      const existing = solvedByChallenge.get(p.challengeId) || [];
      existing.push({ modelId: p.modelId, earnedPoints: p.earnedPoints });
      solvedByChallenge.set(p.challengeId, existing);
    }
  }

  return challenges.map((c) => {
    const solvedModels = solvedByChallenge.get(c.id) || [];
    return {
      id: c.id,
      slug: c.slug,
      title: c.title,
      description: c.description,
      category: c.category as Category,
      difficulty: c.difficulty as Difficulty,
      points: c.points,
      status: solvedModels.length > 0 ? "solved" : "not-started",
      solvedModels,
    };
  });
}
