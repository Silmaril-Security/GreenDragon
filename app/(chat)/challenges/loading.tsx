import { Skeleton } from "@/components/ui/skeleton";

function StatCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-3 w-6" />
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <Skeleton className="h-7 w-6" />
        <Skeleton className="h-4 w-8" />
      </div>
      <Skeleton className="mt-3 h-1.5 w-full rounded-full" />
    </div>
  );
}

function TableRowSkeleton() {
  return (
    <div className="px-4 py-3">
      {/* Mobile layout */}
      <div className="flex items-start gap-3 sm:hidden">
        <Skeleton className="mt-0.5 size-5 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="mt-1 h-3 w-full" />
          <div className="mt-1.5 flex items-center gap-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-10" />
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden sm:grid sm:grid-cols-[70px_1fr_140px_100px_60px] sm:items-center sm:gap-4">
        <Skeleton className="size-5 rounded-full" />
        <div>
          <Skeleton className="h-5 w-40" />
          <Skeleton className="mt-1 h-3 w-64" />
        </div>
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-14" />
        <Skeleton className="ml-auto h-4 w-8" />
      </div>
    </div>
  );
}

export default function ChallengesLoading() {
  return (
    <div className="flex h-full flex-col overflow-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center gap-2 bg-background px-2 py-1.5 md:px-2">
        <Skeleton className="size-8 rounded-md" />
        <div className="ml-auto flex items-center gap-2">
          <Skeleton className="size-8 rounded-md" />
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-8">
        {/* Page title */}
        <div className="mb-6">
          <Skeleton className="h-8 w-48 md:h-9" />
          <Skeleton className="mt-1 h-5 w-56" />
        </div>

        <div className="flex flex-col gap-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <StatCardSkeleton key={i} />
            ))}
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Skeleton className="h-10 flex-1 sm:max-w-xs" />
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Skeleton className="h-10 w-[160px]" />
              <Skeleton className="h-10 w-[140px]" />
              <Skeleton className="h-10 w-[140px]" />
            </div>
          </div>

          {/* Table */}
          <div className="flex flex-col gap-4">
            <div className="rounded-lg border bg-card">
              {/* Table header - desktop only */}
              <div className="hidden border-b px-4 py-3 sm:grid sm:grid-cols-[70px_1fr_140px_100px_60px] sm:gap-4">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-14" />
                <Skeleton className="ml-auto h-4 w-10" />
              </div>

              {/* Table rows */}
              <div className="divide-y">
                {Array.from({ length: 5 }).map((_, i) => (
                  <TableRowSkeleton key={i} />
                ))}
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-32" />
              <div className="flex items-center gap-2">
                <Skeleton className="size-8 rounded-md" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="size-8 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
