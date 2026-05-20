import { PageHeader } from "@/components/page-header";
import { Skeleton } from "@/components/ui/skeleton";

export default function LessonLoading() {
  return (
    <div className="flex h-full flex-col overflow-auto">
      <PageHeader />
      <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-8">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center gap-2">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-5 w-4" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-4" />
          <Skeleton className="h-5 w-24" />
        </div>

        {/* Lesson Header */}
        <div className="mb-6">
          <Skeleton className="h-9 w-96" />
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>

        {/* Separator */}
        <hr className="mb-8" />

        {/* Content Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />

          <div className="h-4" />

          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />

          <div className="h-4" />

          <Skeleton className="h-32 w-full rounded-lg" />

          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        {/* Separator */}
        <hr className="my-8" />

        {/* Navigation Skeleton */}
        <div className="flex justify-between gap-4">
          <Skeleton className="h-16 w-48 rounded-lg" />
          <Skeleton className="h-16 w-48 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
