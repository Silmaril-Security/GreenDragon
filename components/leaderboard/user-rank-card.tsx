import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import type { LeaderboardUser } from "./podium";

interface UserRankCardProps {
  rank: number | null;
  user: LeaderboardUser | null;
  maxPossibleSolves: number;
}

export function UserRankCard({ rank, user, maxPossibleSolves }: UserRankCardProps) {
  // Not logged in
  if (!user) {
    return (
      <div className="rounded-lg border bg-card p-6">
        <p className="text-muted-foreground">
          Sign in to track your rank
        </p>
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

  const completion = maxPossibleSolves > 0
    ? Math.round((user.solvedCount / maxPossibleSolves) * 100)
    : 0;
  const initial = user.email.charAt(0).toUpperCase();

  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-center gap-4">
        <Avatar className="size-12">
          <AvatarFallback className="bg-muted text-muted-foreground text-lg font-medium">
            {initial}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">#{rank}</span>
            <span className="text-muted-foreground truncate">
              {user.totalPoints.toLocaleString()} pts
            </span>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <Progress value={completion} className="flex-1 h-2" />
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {user.solvedCount}/{maxPossibleSolves} ({completion}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
