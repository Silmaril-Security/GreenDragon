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
          <h1 className="font-bold text-2xl md:text-3xl">Leaderboard</h1>
        </div>

        <div className="flex flex-col gap-8">
          {/* Top Players */}
          <div>
            <h3 className="mb-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
              Top Players
            </h3>
            <Podium
              maxPossibleSolves={data.maxPossibleSolves}
              top3={data.rankings.slice(0, 3)}
            />
          </div>

          {/* Your Rank */}
          <div>
            <h3 className="mb-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
              Your Rank
            </h3>
            <UserRankCard
              maxPossibleSolves={data.maxPossibleSolves}
              rank={data.currentUser.rank}
              user={data.currentUser.data}
            />
          </div>

          {/* Rankings */}
          {data.rankings.length > 3 && (
            <div>
              <h3 className="mb-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                Rankings
              </h3>
              <RankingsList
                currentUserId={data.currentUser.data?.userId}
                maxPossibleSolves={data.maxPossibleSolves}
                rankings={data.rankings.slice(3)}
                startRank={4}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
