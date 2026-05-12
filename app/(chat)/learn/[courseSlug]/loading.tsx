import { PageHeader } from "@/components/page-header";
import { Skeleton } from "@/components/ui/skeleton";

export default function CourseLoading() {
  return (
    <div className="flex h-full flex-col overflow-auto">
      <PageHeader />
      <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-8">
        {/* Back Link */}
        <Skeleton className="mb-6 h-5 w-16" />

        {/* Course Header */}
        <div className="mb-6 flex items-start gap-4">
          <Skeleton className="size-16 rounded-lg" />
          <div className="flex-1">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="mt-2 h-5 w-48" />
          </div>
        </div>

        {/* Description */}
        <Skeleton className="mb-2 h-5 w-full" />
        <Skeleton className="mb-6 h-5 w-3/4" />

        {/* Stats Row */}
        <div className="mb-8 flex flex-wrap gap-3">
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-24 rounded-lg" />
          <Skeleton className="h-7 w-24 rounded-lg" />
          <Skeleton className="h-7 w-20 rounded-lg" />
        </div>

        {/* Curriculum Section */}
        <Skeleton className="mb-3 h-4 w-24" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-32 rounded-lg" />
          <Skeleton className="h-24 rounded-lg" />
          <Skeleton className="h-24 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
