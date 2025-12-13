import { Skeleton } from "@/components/ui/skeleton";

function PodiumUserSkeleton({ isFirst }: { isFirst?: boolean }) {
  if (isFirst) {
    return (
      <div className="flex flex-col items-center">
        <Skeleton className="size-16 rounded-full" />
        <div className="mt-4 flex flex-col items-center">
          <Skeleton className="h-3 w-4" />
          <Skeleton className="mt-1 h-4 w-16" />
          <Skeleton className="mt-1 h-7 w-12" />
          <Skeleton className="mt-1 h-3 w-14" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center pb-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="mt-3 flex flex-col items-center">
        <Skeleton className="h-3 w-4" />
        <Skeleton className="mt-1 h-4 w-14" />
        <Skeleton className="mt-1 h-5 w-10" />
        <Skeleton className="mt-1 h-3 w-8" />
      </div>
    </div>
  );
}

function RankingRowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-6 py-4">
      <Skeleton className="h-4 w-6" />
      <Skeleton className="size-10 rounded-full" />
      <div className="min-w-0 flex-1">
        <Skeleton className="h-4 w-24" />
        <div className="mt-1 flex items-center gap-2">
          <Skeleton className="h-1.5 w-24 rounded-full" />
          <Skeleton className="h-3 w-8" />
        </div>
      </div>
      <Skeleton className="h-4 w-10" />
    </div>
  );
}

export default function LeaderboardLoading() {
  return (
    <div className="flex h-full flex-col overflow-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center gap-2 bg-background px-2 py-1.5 md:px-2">
        <Skeleton className="size-8 rounded-md" />
        <div className="ml-auto flex items-center gap-2">
          <Skeleton className="size-8 rounded-md" />
        </div>
      </header>

      <div className="mx-auto w-full max-w-4xl px-4 py-6 md:px-6 md:py-8">
        <div className="mb-8">
          <Skeleton className="h-8 w-32" />
        </div>

        <div className="flex flex-col gap-8">
          {/* Top Players */}
          <div>
            <Skeleton className="mb-3 h-3 w-20" />
            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-end justify-center gap-6 sm:gap-10">
                <PodiumUserSkeleton />
                <PodiumUserSkeleton isFirst />
                <PodiumUserSkeleton />
              </div>
            </div>
          </div>

          {/* Your Rank */}
          <div>
            <Skeleton className="mb-3 h-3 w-16" />
            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center gap-4">
                <Skeleton className="size-12 rounded-full" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <Skeleton className="h-7 w-12" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <Skeleton className="h-2 flex-1 rounded-full" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rankings */}
          <div>
            <Skeleton className="mb-3 h-3 w-16" />
            <div className="rounded-lg border bg-card">
              <div className="divide-y">
                <RankingRowSkeleton key="ranking-1" />
                <RankingRowSkeleton key="ranking-2" />
                <RankingRowSkeleton key="ranking-3" />
                <RankingRowSkeleton key="ranking-4" />
                <RankingRowSkeleton key="ranking-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
