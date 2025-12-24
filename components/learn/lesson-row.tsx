import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";
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
      href={`/learn/${courseSlug}/${moduleSlug}/${lesson.slug}`}
      className="flex items-center gap-4 px-4 py-3 hover:bg-accent/50 transition-colors"
    >
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
        {lessonNumber}
      </span>

      <div className="flex-1 min-w-0">
        <span className="font-medium truncate block">{lesson.title}</span>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground shrink-0">
        {lesson.estimatedMinutes && (
          <span className="hidden sm:flex items-center gap-1">
            <Clock className="size-4" />
            {lesson.estimatedMinutes} min
          </span>
        )}
        <ChevronRight className="size-4" />
      </div>
    </Link>
  );
}
