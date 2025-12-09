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
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8">
      <h1 className="text-2xl font-bold">Leaderboard</h1>

      <Podium
        top3={data.rankings.slice(0, 3)}
        totalChallenges={data.totalChallenges}
      />

      <UserRankCard
        rank={data.currentUser.rank}
        user={data.currentUser.data}
        totalChallenges={data.totalChallenges}
      />

      <RankingsList
        rankings={data.rankings.slice(3)}
        currentUserId={data.currentUser.data?.userId}
        startRank={4}
        totalChallenges={data.totalChallenges}
      />
      </div>
    </div>
  );
}
