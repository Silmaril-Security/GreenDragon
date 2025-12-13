import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import type { LeaderboardUser } from "./podium";

type UserRankCardProps = {
  rank: number | null;
  user: LeaderboardUser | null;
  maxPossibleSolves: number;
};

export function UserRankCard({
  rank,
  user,
  maxPossibleSolves,
}: UserRankCardProps) {
  // Not logged in
  if (!user) {
    return (
      <div className="rounded-lg border bg-card p-6">
        <p className="text-muted-foreground">Sign in to track your rank</p>
      </div>
    );
  }

  // User has 0 points (not on leaderboard)
  if (rank === null) {
    return (
      <div className="rounded-lg border bg-card p-6">
        <p className="text-muted-foreground">
          Solve a challenge to appear on the leaderboard
        </p>
      </div>
    );
  }

  const completion =
    maxPossibleSolves > 0
      ? Math.round((user.solvedCount / maxPossibleSolves) * 100)
      : 0;
  const initial = user.email.charAt(0).toUpperCase();

  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-center gap-4">
        <Avatar className="size-12">
          <AvatarFallback className="bg-muted font-medium text-lg text-muted-foreground">
            {initial}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-2xl">#{rank}</span>
            <span className="truncate text-muted-foreground">
              {user.totalPoints.toLocaleString()} pts
            </span>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <Progress className="h-2 flex-1" value={completion} />
            <span className="whitespace-nowrap text-muted-foreground text-sm">
              {user.solvedCount}/{maxPossibleSolves} ({completion}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
