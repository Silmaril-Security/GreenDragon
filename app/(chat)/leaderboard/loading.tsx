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
    <div className="flex items-center gap-4 px-4 py-3">
      <Skeleton className="h-4 w-6" />
      <Skeleton className="size-8 rounded-full" />
      <div className="flex-1 min-w-0">
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

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8">
        <Skeleton className="h-8 w-32" />

        {/* Podium */}
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-end justify-center gap-4 sm:gap-8">
            <PodiumUserSkeleton />
            <PodiumUserSkeleton isFirst />
            <PodiumUserSkeleton />
          </div>
        </div>

        {/* User Rank Card */}
        <div className="rounded-lg border bg-card p-4">
          <Skeleton className="h-3 w-16" />
          <div className="mt-3 flex items-center gap-4">
            <Skeleton className="size-10 rounded-full" />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <Skeleton className="h-7 w-10" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="mt-2 flex items-center gap-3">
                <Skeleton className="h-2 flex-1 rounded-full" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </div>
        </div>

        {/* Rankings List */}
        <div className="rounded-lg border bg-card">
          <div className="border-b px-4 py-3">
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="divide-y">
            {Array.from({ length: 5 }).map((_, i) => (
              <RankingRowSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
