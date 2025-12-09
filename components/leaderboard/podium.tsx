import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ProgressRing } from "./progress-ring";

export interface LeaderboardUser {
  userId: string;
  email: string;
  totalPoints: number;
  solvedCount: number;
}

interface PodiumProps {
  top3: LeaderboardUser[];
  totalChallenges: number;
}

function PodiumUser({
  user,
  rank,
  totalChallenges,
  isFirst,
}: {
  user: LeaderboardUser;
  rank: number;
  totalChallenges: number;
  isFirst?: boolean;
}) {
  const completion = totalChallenges > 0
    ? Math.round((user.solvedCount / totalChallenges) * 100)
    : 0;
  const initial = user.email.charAt(0).toUpperCase();

  if (isFirst) {
    return (
      <div className="flex flex-col items-center">
        <ProgressRing progress={completion} size="lg">
          <Avatar className="size-16">
            <AvatarFallback className="bg-muted text-muted-foreground text-xl font-medium">
              {initial}
            </AvatarFallback>
          </Avatar>
        </ProgressRing>
        <div className="mt-4 text-center">
          <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400 bg-clip-text text-transparent dark:from-emerald-300 dark:via-emerald-400 dark:to-emerald-300 text-xs font-semibold">
            #1
          </span>
          <p className="text-sm font-medium truncate max-w-[120px]" title={user.email}>
            {user.email.split("@")[0]}
          </p>
          <p className="text-2xl font-bold">{user.totalPoints.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">
            {completion}% complete
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <ProgressRing progress={completion} size="md">
        <Avatar className="size-12">
          <AvatarFallback className="bg-muted text-muted-foreground text-sm font-medium">
            {initial}
          </AvatarFallback>
        </Avatar>
      </ProgressRing>
      <div className="mt-3 text-center">
        <span className="text-xs font-semibold text-muted-foreground">#{rank}</span>
        <p className="text-sm font-medium truncate max-w-[100px]" title={user.email}>
          {user.email.split("@")[0]}
        </p>
        <p className="text-lg font-bold">{user.totalPoints.toLocaleString()}</p>
        <p className="text-xs text-muted-foreground">
          {completion}%
        </p>
      </div>
    </div>
  );
}

export function Podium({ top3, totalChallenges }: PodiumProps) {
  if (top3.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-8 text-center">
        <p className="text-muted-foreground">No rankings yet. Be the first!</p>
      </div>
    );
  }

  const first = top3[0];
  const second = top3[1];
  const third = top3[2];

  // Layout: #2 | #1 | #3 (podium style)
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-end justify-center gap-4 sm:gap-8">
        {/* #2 - Left */}
        {second ? (
          <div className="flex flex-col items-center pb-4">
            <PodiumUser user={second} rank={2} totalChallenges={totalChallenges} />
          </div>
        ) : (
          <div className="w-[100px]" />
        )}

        {/* #1 - Center (elevated) */}
        <div className="flex flex-col items-center">
          <PodiumUser user={first} rank={1} totalChallenges={totalChallenges} isFirst />
        </div>

        {/* #3 - Right */}
        {third ? (
          <div className="flex flex-col items-center pb-4">
            <PodiumUser user={third} rank={3} totalChallenges={totalChallenges} />
          </div>
        ) : (
          <div className="w-[100px]" />
        )}
      </div>
    </div>
  );
}
