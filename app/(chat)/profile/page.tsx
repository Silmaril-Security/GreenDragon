import { redirect } from "next/navigation";
import { auth } from "@/app/(auth)/auth";
import { ProfileContent } from "@/components/profile/profile-content";
import { ProfileHeader } from "@/components/profile/profile-header";
import { getChallenges, getLeaderboard, getUser } from "@/lib/db/queries";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id || !session.user.email) {
    redirect("/sign-in");
  }

  const [[user], challenges, leaderboard] = await Promise.all([
    getUser(session.user.email),
    getChallenges(),
    getLeaderboard({ limit: 100 }),
  ]);

  const rank = leaderboard.findIndex((u) => u.userId === session.user.id) + 1;

  return (
    <div className="flex h-dvh flex-col overflow-auto">
      <ProfileHeader />
      <ProfileContent
        email={session.user.email}
        rank={rank || null}
        solvedCount={user?.solvedCount ?? 0}
        totalChallenges={challenges.length}
        totalPoints={user?.totalPoints ?? 0}
      />
    </div>
  );
}
