import { Podium } from "@/components/leaderboard/podium";
import { RankingsList } from "@/components/leaderboard/rankings-list";
import { UserRankCard } from "@/components/leaderboard/user-rank-card";
import { PageHeader } from "@/components/page-header";
import { getLeaderboardData } from "@/lib/leaderboard/actions";

export default async function LeaderboardPage() {
  const data = await getLeaderboardData();

  return (
    <div className="flex h-full flex-col overflow-auto">
      <PageHeader />
      <div className="mx-auto w-full max-w-4xl px-4 py-6 md:px-6 md:py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold md:text-3xl">Leaderboard</h1>
        </div>

        <div className="flex flex-col gap-8">
          {/* Top Players */}
          <div>
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Top Players
            </h3>
            <Podium
              top3={data.rankings.slice(0, 3)}
              maxPossibleSolves={data.maxPossibleSolves}
            />
          </div>

          {/* Your Rank */}
          <div>
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Your Rank
            </h3>
            <UserRankCard
              rank={data.currentUser.rank}
              user={data.currentUser.data}
              maxPossibleSolves={data.maxPossibleSolves}
            />
          </div>

          {/* Rankings */}
          {data.rankings.length > 3 && (
            <div>
              <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Rankings
              </h3>
              <RankingsList
                rankings={data.rankings.slice(3)}
                currentUserId={data.currentUser.data?.userId}
                startRank={4}
                maxPossibleSolves={data.maxPossibleSolves}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
