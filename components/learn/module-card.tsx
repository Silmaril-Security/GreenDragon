import { BookOpen, Clock } from "lucide-react";
import Link from "next/link";
import type { Module } from "@/lib/db/schema";
import { DifficultyBadge } from "./difficulty-badge";

type ModuleCardProps = {
  module: Module;
  courseSlug: string;
  lessonCount: number;
  totalMinutes: number;
  moduleNumber: number;
};

export function ModuleCard({
  module,
  courseSlug,
  lessonCount,
  totalMinutes,
  moduleNumber,
}: ModuleCardProps) {
  return (
    <Link
      className="group rounded-lg border bg-card p-5 transition-colors hover:border-emerald-500/50"
      href={`/learn/${courseSlug}#${module.slug}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 font-semibold text-emerald-500 text-sm">
          {moduleNumber}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-sm">{module.title}</h3>
          {module.description && (
            <p className="mt-1 line-clamp-2 text-muted-foreground text-xs">
              {module.description}
            </p>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3 text-muted-foreground text-xs">
        <span className="flex items-center gap-1">
          <BookOpen className="size-3.5" />
          {lessonCount} lessons
        </span>
        {totalMinutes > 0 && (
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {totalMinutes} min
          </span>
        )}
        {module.difficulty && (
          <DifficultyBadge
            className="px-2 py-0"
            difficulty={module.difficulty}
          />
        )}
      </div>
    </Link>
  );
}
