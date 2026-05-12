import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
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
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {prev ? (
        <Link
          className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border bg-card px-4 py-3 transition-colors hover:bg-accent/50 sm:max-w-[48%]"
          href={`/learn/${courseSlug}/${moduleSlug}/${prev.slug}`}
        >
          <ChevronLeft className="size-4 shrink-0" />
          <div className="min-w-0 text-left">
            <span className="text-muted-foreground text-xs">Previous</span>
            <p className="truncate font-medium text-sm">{prev.title}</p>
          </div>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {next ? (
        <Link
          className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border bg-card px-4 py-3 transition-colors hover:bg-accent/50 sm:ml-auto sm:max-w-[48%]"
          href={`/learn/${courseSlug}/${moduleSlug}/${next.slug}`}
        >
          <div className="min-w-0 flex-1 text-right">
            <span className="text-muted-foreground text-xs">Next</span>
            <p className="truncate font-medium text-sm">{next.title}</p>
          </div>
          <ChevronRight className="size-4 shrink-0" />
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}
    </div>
  );
}
