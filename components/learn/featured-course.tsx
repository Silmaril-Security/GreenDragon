import {
  ArrowRight,
  BookOpen,
  Bug,
  Clock,
  Layers,
  Lock,
  Shield,
  Syringe,
  Target,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Course } from "@/lib/db/schema";

const iconMap: Record<string, React.ElementType> = {
  shield: Shield,
  syringe: Syringe,
  bug: Bug,
  lock: Lock,
  "book-open": BookOpen,
  target: Target,
  zap: Zap,
};

type FeaturedCourseProps = {
  course: Course;
  moduleCount: number;
  lessonCount: number;
  totalMinutes: number;
};

export function FeaturedCourse({
  course,
  moduleCount,
  lessonCount,
  totalMinutes,
}: FeaturedCourseProps) {
  const IconComponent = iconMap[course.icon || "shield"] || Shield;
  const hours = Math.round(totalMinutes / 60);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.03] via-transparent to-transparent p-6 transition-all duration-500 hover:border-emerald-500/40 hover:shadow-emerald-500/5 hover:shadow-lg sm:p-8">
      {/* Ambient glow */}
      <div className="-right-20 -top-20 pointer-events-none absolute size-64 rounded-full bg-emerald-500/10 blur-3xl transition-all duration-500 group-hover:scale-110 group-hover:bg-emerald-500/15" />
      <div className="-bottom-32 -left-32 pointer-events-none absolute size-64 rounded-full bg-emerald-600/5 blur-3xl" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="relative flex size-14 shrink-0 items-center justify-center sm:size-16">
          {/* Icon glow */}
          <div className="absolute inset-0 rounded-2xl bg-emerald-500/20 blur-xl transition-all duration-500 group-hover:bg-emerald-500/30" />
          <div className="relative flex size-full items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-emerald-500/25 shadow-lg">
            <IconComponent className="size-7 text-white sm:size-8" />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-lg">{course.title}</h3>
          {course.subtitle && (
            <p className="text-muted-foreground">{course.subtitle}</p>
          )}
        </div>
      </div>

      <p className="relative mt-4 text-muted-foreground">
        {course.description}
      </p>

      <div className="relative mt-6 flex flex-wrap gap-3">
        <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 ring-1 ring-emerald-500/20">
          <Layers className="size-4 text-emerald-600 dark:text-emerald-400" />
          <span className="font-medium text-sm">{moduleCount}</span>
          <span className="text-muted-foreground text-sm">Modules</span>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 ring-1 ring-emerald-500/20">
          <BookOpen className="size-4 text-emerald-600 dark:text-emerald-400" />
          <span className="font-medium text-sm">{lessonCount}</span>
          <span className="text-muted-foreground text-sm">Lessons</span>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 ring-1 ring-emerald-500/20">
          <Clock className="size-4 text-emerald-600 dark:text-emerald-400" />
          <span className="font-medium text-sm">~{hours}</span>
          <span className="text-muted-foreground text-sm">hours</span>
        </div>
      </div>

      <div className="relative mt-6 flex justify-end">
        <Button asChild>
          <Link href={`/learn/${course.slug}`}>
            Start Learning
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
