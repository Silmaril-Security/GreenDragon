"use client";

import { BookOpen, ChevronDown, ChevronRight, Clock } from "lucide-react";
import { useState } from "react";
import type { Lesson, Module } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { DifficultyBadge } from "./difficulty-badge";
import { LessonRow } from "./lesson-row";

type ModuleAccordionProps = {
  module: Module;
  lessons: Lesson[];
  courseSlug: string;
  defaultOpen?: boolean;
  moduleNumber: number;
};

export function ModuleAccordion({
  module,
  lessons,
  courseSlug,
  defaultOpen = false,
  moduleNumber,
}: ModuleAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const totalMinutes = lessons.reduce(
    (sum, lesson) => sum + (lesson.estimatedMinutes || 0),
    0
  );

  return (
    <div className="rounded-lg border bg-card">
      <button
        className="flex w-full items-start gap-3 rounded-t-lg p-4 text-left transition-colors hover:bg-accent/50"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <div className="mt-1">
          {isOpen ? (
            <ChevronDown className="size-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="size-4 text-muted-foreground" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <span className="font-medium text-muted-foreground text-xs uppercase">
              Module {moduleNumber}
            </span>
            {module.difficulty && (
              <DifficultyBadge difficulty={module.difficulty} />
            )}
          </div>

          <h3 className="mt-1 font-semibold">{module.title}</h3>

          {module.description && (
            <p className="mt-1 text-muted-foreground text-sm">
              {module.description}
            </p>
          )}

          <div className="mt-2 flex items-center gap-4 text-muted-foreground text-sm">
            <span className="flex items-center gap-1">
              <BookOpen className="size-4" />
              {lessons.length} lessons
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-4" />~{totalMinutes} min
            </span>
          </div>
        </div>
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all",
          isOpen ? "max-h-[2000px]" : "max-h-0"
        )}
      >
        <div className="divide-y border-t">
          {lessons.map((lesson, index) => (
            <LessonRow
              courseSlug={courseSlug}
              key={lesson.id}
              lesson={lesson}
              lessonNumber={index + 1}
              moduleSlug={module.slug}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
