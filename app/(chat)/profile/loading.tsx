import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className="flex h-dvh flex-col overflow-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center gap-2 bg-background px-2 py-1.5 md:px-2">
        <Skeleton className="size-8 rounded-md" />
        <div className="ml-auto flex items-center gap-2">
          <Skeleton className="size-8 rounded-md" />
        </div>
      </header>

      <div className="mx-auto w-full max-w-4xl px-4 py-6 md:px-6 md:py-8">
        <div className="mb-8">
          <Skeleton className="h-8 w-24" />
        </div>

        <div className="flex flex-col gap-8">
          {/* Account Section */}
          <div>
            <Skeleton className="mb-3 h-3 w-14" />
            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center gap-4">
                <Skeleton className="size-12 shrink-0 rounded-full" />
                <div className="min-w-0 flex-1">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="mt-1 h-4 w-16" />
                </div>
                <Skeleton className="h-9 w-20 rounded-md" />
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div>
            <Skeleton className="mb-3 h-3 w-10" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-lg border bg-card p-6">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="mt-2 h-8 w-16" />
              </div>
              <div className="rounded-lg border bg-card p-6">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="mt-2 h-8 w-20" />
              </div>
              <div className="rounded-lg border bg-card p-6">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="mt-2 h-8 w-12" />
              </div>
            </div>
          </div>

          {/* Appearance Section */}
          <div>
            <Skeleton className="mb-3 h-3 w-20" />
            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <Skeleton className="h-5 w-12" />
                  <Skeleton className="mt-1 h-4 w-40" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-14 rounded-md" />
                  <Skeleton className="h-8 w-14 rounded-md" />
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div>
            <Skeleton className="mb-3 h-3 w-24" />
            <div className="rounded-lg border border-destructive bg-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="mt-1 h-4 w-56" />
                </div>
                <Skeleton className="h-9 w-16 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
