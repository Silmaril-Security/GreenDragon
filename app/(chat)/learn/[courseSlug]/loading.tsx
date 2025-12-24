import { PageHeader } from "@/components/page-header";
import { Skeleton } from "@/components/ui/skeleton";

export default function CourseLoading() {
  return (
    <div className="flex h-full flex-col overflow-auto">
      <PageHeader />
      <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-8">
        {/* Back Link */}
        <Skeleton className="h-5 w-16 mb-6" />

        {/* Course Header */}
        <div className="flex items-start gap-4 mb-6">
          <Skeleton className="size-16 rounded-lg" />
          <div className="flex-1">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-5 w-48 mt-2" />
          </div>
        </div>

        {/* Description */}
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-3/4 mb-6" />

        {/* Stats Row */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-24 rounded-lg" />
          <Skeleton className="h-7 w-24 rounded-lg" />
          <Skeleton className="h-7 w-20 rounded-lg" />
        </div>

        {/* Curriculum Section */}
        <Skeleton className="h-4 w-24 mb-3" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-32 rounded-lg" />
          <Skeleton className="h-24 rounded-lg" />
          <Skeleton className="h-24 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
