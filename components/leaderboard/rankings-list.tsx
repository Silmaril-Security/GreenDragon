import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { LeaderboardUser } from "./podium";

type RankingsListProps = {
  rankings: LeaderboardUser[];
  currentUserId?: string;
  startRank: number;
  maxPossibleSolves: number;
};

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
          const completion =
            maxPossibleSolves > 0
              ? Math.round((user.solvedCount / maxPossibleSolves) * 100)
              : 0;
          const initial = user.email.charAt(0).toUpperCase();

          return (
            <div
              className={cn(
                "flex items-center gap-4 px-6 py-4",
                isCurrentUser && "bg-accent/50"
              )}
              key={user.userId}
            >
              <span className="w-8 font-medium text-muted-foreground text-sm">
                {rank}
              </span>
              <Avatar className="size-10">
                <AvatarFallback className="bg-muted font-medium text-muted-foreground text-sm">
                  {initial}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium" title={user.email}>
                  {user.email.split("@")[0]}
                  {isCurrentUser && (
                    <span className="ml-2 text-muted-foreground text-sm">
                      (you)
                    </span>
                  )}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <Progress
                    className="h-1.5 max-w-[120px] flex-1"
                    value={completion}
                  />
                  <span className="text-muted-foreground text-sm">
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
