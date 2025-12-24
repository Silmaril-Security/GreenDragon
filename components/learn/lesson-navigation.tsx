import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Lesson } from "@/lib/db/schema";

type LessonNavigationProps = {
  prev: Lesson | null;
  next: Lesson | null;
  courseSlug: string;
  moduleSlug: string;
};

export function LessonNavigation({
  prev,
  next,
  courseSlug,
  moduleSlug,
}: LessonNavigationProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      {prev ? (
        <Link
          href={`/learn/${courseSlug}/${moduleSlug}/${prev.slug}`}
          className="flex items-center gap-2 rounded-lg border bg-card px-4 py-3 hover:bg-accent/50 transition-colors min-w-0 flex-1 sm:max-w-[48%]"
        >
          <ChevronLeft className="size-4 shrink-0" />
          <div className="text-left min-w-0">
            <span className="text-xs text-muted-foreground">Previous</span>
            <p className="font-medium text-sm truncate">{prev.title}</p>
          </div>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {next ? (
        <Link
          href={`/learn/${courseSlug}/${moduleSlug}/${next.slug}`}
          className="flex items-center gap-2 rounded-lg border bg-card px-4 py-3 hover:bg-accent/50 transition-colors min-w-0 flex-1 sm:max-w-[48%] sm:ml-auto"
        >
          <div className="text-right min-w-0 flex-1">
            <span className="text-xs text-muted-foreground">Next</span>
            <p className="font-medium text-sm truncate">{next.title}</p>
          </div>
          <ChevronRight className="size-4 shrink-0" />
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}
    </div>
  );
}
