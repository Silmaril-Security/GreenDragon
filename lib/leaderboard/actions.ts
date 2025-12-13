"use server";

import { auth } from "@/app/(auth)/auth";
import { chatModels } from "@/lib/ai/models";
import { getChallenges, getLeaderboard } from "@/lib/db/queries";

export type LeaderboardUser = {
  userId: string;
  email: string;
  totalPoints: number;
  solvedCount: number;
};

export type LeaderboardData = {
  rankings: LeaderboardUser[];
  currentUser: {
    rank: number | null;
    data: LeaderboardUser | null;
  };
  totalChallenges: number;
  totalModels: number;
  maxPossibleSolves: number;
};

export async function getLeaderboardData(): Promise<LeaderboardData> {
  const [rankings, challenges, session] = await Promise.all([
    getLeaderboard({ limit: 100 }),
    getChallenges(),
    auth(),
  ]);

  const totalChallenges = challenges.length;
  const totalModels = chatModels.length;
  const maxPossibleSolves = totalChallenges * totalModels;
  const userId = session?.user?.id;

  let currentUserRank: number | null = null;
  let currentUserData: LeaderboardUser | null = null;

  if (userId) {
    const rankIndex = rankings.findIndex((r) => r.userId === userId);
    if (rankIndex !== -1) {
      currentUserRank = rankIndex + 1;
      currentUserData = rankings[rankIndex];
    } else {
      // User exists but has 0 points (not in leaderboard)
      currentUserData = {
        userId,
        email: session.user?.email || "",
        totalPoints: 0,
        solvedCount: 0,
      };
    }
  }

  return {
    rankings,
    currentUser: {
      rank: currentUserRank,
      data: currentUserData,
    },
    totalChallenges,
    totalModels,
    maxPossibleSolves,
  };
}
