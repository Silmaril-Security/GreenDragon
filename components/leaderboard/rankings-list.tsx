import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { LeaderboardUser } from "./podium";

interface RankingsListProps {
  rankings: LeaderboardUser[];
  currentUserId?: string;
  startRank: number;
  totalChallenges: number;
}

export function RankingsList({
  rankings,
  currentUserId,
  startRank,
  totalChallenges,
}: RankingsListProps) {
  if (rankings.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-card">
      <div className="border-b px-4 py-3">
        <p className="text-xs font-medium tracking-wider text-muted-foreground">Rankings</p>
      </div>
      <div className="divide-y">
        {rankings.map((user, index) => {
          const rank = startRank + index;
          const isCurrentUser = user.userId === currentUserId;
          const completion = totalChallenges > 0
            ? Math.round((user.solvedCount / totalChallenges) * 100)
            : 0;
          const initial = user.email.charAt(0).toUpperCase();

          return (
            <div
              key={user.userId}
              className={cn(
                "flex items-center gap-4 px-4 py-3",
                isCurrentUser && "bg-accent/50"
              )}
            >
              <span className="w-8 text-sm font-medium text-muted-foreground">
                {rank}
              </span>
              <Avatar className="size-8">
                <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
                  {initial}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" title={user.email}>
                  {user.email.split("@")[0]}
                  {isCurrentUser && (
                    <span className="ml-2 text-xs text-muted-foreground">(you)</span>
                  )}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <Progress value={completion} className="flex-1 h-1.5 max-w-[100px]" />
                  <span className="text-xs text-muted-foreground">
                    {completion}%
                  </span>
                </div>
              </div>
              <span className="text-sm font-semibold">
                {user.totalPoints.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
