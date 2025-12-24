import { PageHeader } from "@/components/page-header";
import { Skeleton } from "@/components/ui/skeleton";

export default function LearnLoading() {
  return (
    <div className="flex h-full flex-col overflow-auto">
      <PageHeader />
      <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-8">
        {/* Page Title */}
        <div className="mb-8">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="mt-2 h-5 w-80" />
        </div>

        <div className="flex flex-col gap-8">
          {/* Featured Section */}
          <div>
            <Skeleton className="mb-3 h-4 w-20" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>

          {/* All Courses Section */}
          <div>
            <Skeleton className="mb-3 h-4 w-24" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Skeleton className="h-48 rounded-lg" />
              <Skeleton className="h-48 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
