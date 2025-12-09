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

      <div className="mx-auto w-full max-w-2xl px-4 py-6">
        <Skeleton className="mb-6 h-8 w-24" />

        {/* Account Section */}
        <section className="mb-6 rounded-lg border bg-card">
          <div className="border-b px-4 py-2">
            <Skeleton className="h-3 w-14" />
          </div>
          <div className="divide-y">
            <div className="flex items-center gap-3 p-4">
              <Skeleton className="size-10 shrink-0 rounded-full" />
              <Skeleton className="h-5 w-48" />
            </div>
            <div className="flex items-center justify-between gap-4 p-4">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-9 w-20 rounded-md" />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-6 rounded-lg border bg-card">
          <div className="border-b px-4 py-2">
            <Skeleton className="h-3 w-10" />
          </div>
          <div className="divide-y">
            <div className="flex justify-between p-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="flex justify-between p-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-14" />
            </div>
            <div className="flex justify-between p-4">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-8" />
            </div>
          </div>
        </section>

        {/* Appearance Section */}
        <section className="mb-6 rounded-lg border bg-card">
          <div className="border-b px-4 py-2">
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="flex items-center justify-between p-4">
            <Skeleton className="h-4 w-12" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-14 rounded-md" />
              <Skeleton className="h-8 w-14 rounded-md" />
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="rounded-lg border border-destructive bg-card">
          <div className="border-b border-destructive px-4 py-2">
            <Skeleton className="h-3 w-24" />
          </div>
          <div className="flex items-center justify-between gap-4 p-4">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-9 w-16 rounded-md" />
          </div>
        </section>
      </div>
    </div>
  );
}
