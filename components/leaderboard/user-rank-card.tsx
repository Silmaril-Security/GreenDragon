import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import type { LeaderboardUser } from "./podium";

interface UserRankCardProps {
  rank: number | null;
  user: LeaderboardUser | null;
  totalChallenges: number;
}

export function UserRankCard({ rank, user, totalChallenges }: UserRankCardProps) {
  // Not logged in
  if (!user) {
    return (
      <div className="rounded-lg border bg-card p-4">
        <p className="text-xs font-medium tracking-wider text-muted-foreground">Your Rank</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to track your rank
        </p>
      </div>
    );
  }

  // User has 0 points (not on leaderboard)
  if (rank === null) {
    return (
      <div className="rounded-lg border bg-card p-4">
        <p className="text-xs font-medium tracking-wider text-muted-foreground">Your Rank</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Solve a challenge to appear on the leaderboard
        </p>
      </div>
    );
  }

  const completion = totalChallenges > 0
    ? Math.round((user.solvedCount / totalChallenges) * 100)
    : 0;
  const initial = user.email.charAt(0).toUpperCase();

  return (
    <div className="rounded-lg border bg-card p-4">
      <p className="text-xs font-medium tracking-wider text-muted-foreground">Your Rank</p>
      <div className="mt-3 flex items-center gap-4">
        <Avatar className="size-10">
          <AvatarFallback className="bg-muted text-muted-foreground text-sm font-medium">
            {initial}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">#{rank}</span>
            <span className="text-sm text-muted-foreground truncate">
              {user.totalPoints.toLocaleString()} pts
            </span>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <Progress value={completion} className="flex-1 h-2" />
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {user.solvedCount}/{totalChallenges} ({completion}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
