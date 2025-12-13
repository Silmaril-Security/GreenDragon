import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ProgressRing } from "./progress-ring";

export type LeaderboardUser = {
  userId: string;
  email: string;
  totalPoints: number;
  solvedCount: number;
};

type PodiumProps = {
  top3: LeaderboardUser[];
  maxPossibleSolves: number;
};

function PodiumUser({
  user,
  rank,
  maxPossibleSolves,
  isFirst,
}: {
  user: LeaderboardUser;
  rank: number;
  maxPossibleSolves: number;
  isFirst?: boolean;
}) {
  const completion =
    maxPossibleSolves > 0
      ? Math.round((user.solvedCount / maxPossibleSolves) * 100)
      : 0;
  const initial = user.email.charAt(0).toUpperCase();

  if (isFirst) {
    return (
      <div className="flex flex-col items-center">
        <ProgressRing progress={completion} size="lg">
          <Avatar className="size-16">
            <AvatarFallback className="bg-muted font-medium text-muted-foreground text-xl">
              {initial}
            </AvatarFallback>
          </Avatar>
        </ProgressRing>
        <div className="mt-4 text-center">
          <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400 bg-clip-text font-semibold text-transparent text-xs dark:from-emerald-300 dark:via-emerald-400 dark:to-emerald-300">
            #1
          </span>
          <p
            className="max-w-[120px] truncate font-medium text-sm"
            title={user.email}
          >
            {user.email.split("@")[0]}
          </p>
          <p className="font-bold text-2xl">
            {user.totalPoints.toLocaleString()}
          </p>
          <p className="text-muted-foreground text-xs">
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
          <AvatarFallback className="bg-muted font-medium text-muted-foreground text-sm">
            {initial}
          </AvatarFallback>
        </Avatar>
      </ProgressRing>
      <div className="mt-3 text-center">
        <span className="font-semibold text-muted-foreground text-xs">
          #{rank}
        </span>
        <p
          className="max-w-[100px] truncate font-medium text-sm"
          title={user.email}
        >
          {user.email.split("@")[0]}
        </p>
        <p className="font-bold text-lg">{user.totalPoints.toLocaleString()}</p>
        <p className="text-muted-foreground text-xs">{completion}%</p>
      </div>
    </div>
  );
}

export function Podium({ top3, maxPossibleSolves }: PodiumProps) {
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
            <PodiumUser
              maxPossibleSolves={maxPossibleSolves}
              rank={2}
              user={second}
            />
          </div>
        ) : (
          <div className="w-[100px]" />
        )}

        {/* #1 - Center (elevated) */}
        <div className="flex flex-col items-center">
          <PodiumUser
            isFirst
            maxPossibleSolves={maxPossibleSolves}
            rank={1}
            user={first}
          />
        </div>

        {/* #3 - Right */}
        {third ? (
          <div className="flex flex-col items-center pb-4">
            <PodiumUser
              maxPossibleSolves={maxPossibleSolves}
              rank={3}
              user={third}
            />
          </div>
        ) : (
          <div className="w-[100px]" />
        )}
      </div>
    </div>
  );
}
