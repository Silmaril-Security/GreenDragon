import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { LeaderboardUser } from "./podium";

interface RankingsListProps {
  rankings: LeaderboardUser[];
  currentUserId?: string;
  startRank: number;
  maxPossibleSolves: number;
}

export function RankingsList({
  rankings,
  currentUserId,
  startRank,
  maxPossibleSolves,
}: RankingsListProps) {
  if (rankings.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-card">
      <div className="divide-y">
        {rankings.map((user, index) => {
          const rank = startRank + index;
          const isCurrentUser = user.userId === currentUserId;
          const completion = maxPossibleSolves > 0
            ? Math.round((user.solvedCount / maxPossibleSolves) * 100)
            : 0;
          const initial = user.email.charAt(0).toUpperCase();

          return (
            <div
              key={user.userId}
              className={cn(
                "flex items-center gap-4 px-6 py-4",
                isCurrentUser && "bg-accent/50"
              )}
            >
              <span className="w-8 text-sm font-medium text-muted-foreground">
                {rank}
              </span>
              <Avatar className="size-10">
                <AvatarFallback className="bg-muted text-muted-foreground text-sm font-medium">
                  {initial}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate" title={user.email}>
                  {user.email.split("@")[0]}
                  {isCurrentUser && (
                    <span className="ml-2 text-sm text-muted-foreground">(you)</span>
                  )}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <Progress value={completion} className="flex-1 h-1.5 max-w-[120px]" />
                  <span className="text-sm text-muted-foreground">
                    {completion}%
                  </span>
                </div>
              </div>
              <span className="font-semibold">
                {user.totalPoints.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
