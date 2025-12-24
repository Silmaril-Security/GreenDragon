import Link from "next/link";
import {
  Shield,
  Syringe,
  Bug,
  Lock,
  BookOpen,
  Target,
  Zap,
  Layers,
  Clock,
} from "lucide-react";
import type { Course } from "@/lib/db/schema";
import { DifficultyBadge } from "./difficulty-badge";

const iconMap: Record<string, React.ElementType> = {
  shield: Shield,
  syringe: Syringe,
  bug: Bug,
  lock: Lock,
  "book-open": BookOpen,
  target: Target,
  zap: Zap,
};

type CourseCardProps = {
  course: Course;
  moduleCount: number;
  lessonCount: number;
  totalMinutes: number;
};

export function CourseCard({
  course,
  moduleCount,
  lessonCount,
  totalMinutes,
}: CourseCardProps) {
  const IconComponent = iconMap[course.icon || "shield"] || Shield;

  return (
    <Link
      href={`/learn/${course.slug}`}
      className="group rounded-lg border bg-card p-6 transition-colors hover:border-emerald-500/50"
    >
      <div className="flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted">
          <IconComponent className="size-6 text-muted-foreground" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold truncate">{course.title}</h3>
          {course.subtitle && (
            <p className="text-sm text-muted-foreground truncate">
              {course.subtitle}
            </p>
          )}
        </div>
      </div>

      {course.difficulty && (
        <div className="mt-4">
          <DifficultyBadge difficulty={course.difficulty} />
        </div>
      )}

      <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Layers className="size-4" />
          {moduleCount} modules
        </span>
        <span className="flex items-center gap-1">
          <BookOpen className="size-4" />
          {lessonCount} lessons
        </span>
      </div>

      {course.tags && course.tags.length > 0 && (
        <>
          <div className="my-4 border-t" />
          <div className="flex flex-wrap gap-2">
            {course.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </>
      )}
    </Link>
  );
}
