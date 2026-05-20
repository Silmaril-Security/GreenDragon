import { ChevronRight, Clock } from "lucide-react";
import Link from "next/link";
import type { Lesson } from "@/lib/db/schema";

type LessonRowProps = {
  lesson: Lesson;
  courseSlug: string;
  moduleSlug: string;
  lessonNumber: number;
};

export function LessonRow({
  lesson,
  courseSlug,
  moduleSlug,
  lessonNumber,
}: LessonRowProps) {
  return (
    <Link
      className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-accent/50"
      href={`/learn/${courseSlug}/${moduleSlug}/${lesson.slug}`}
    >
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-medium text-muted-foreground text-xs">
        {lessonNumber}
      </span>

      <div className="min-w-0 flex-1">
        <span className="block truncate font-medium">{lesson.title}</span>
      </div>

      <div className="flex shrink-0 items-center gap-4 text-muted-foreground text-sm">
        {lesson.estimatedMinutes && (
          <span className="hidden items-center gap-1 sm:flex">
            <Clock className="size-4" />
            {lesson.estimatedMinutes} min
          </span>
        )}
        <ChevronRight className="size-4" />
      </div>
    </Link>
  );
}
