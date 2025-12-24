"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, BookOpen, Clock } from "lucide-react";
import type { Module, Lesson } from "@/lib/db/schema";
import { DifficultyBadge } from "./difficulty-badge";
import { LessonRow } from "./lesson-row";
import { cn } from "@/lib/utils";

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
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-start gap-3 p-4 text-left hover:bg-accent/50 transition-colors rounded-t-lg"
      >
        <div className="mt-1">
          {isOpen ? (
            <ChevronDown className="size-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="size-4 text-muted-foreground" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-muted-foreground uppercase">
              Module {moduleNumber}
            </span>
            {module.difficulty && (
              <DifficultyBadge difficulty={module.difficulty} />
            )}
          </div>

          <h3 className="font-semibold mt-1">{module.title}</h3>

          {module.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {module.description}
            </p>
          )}

          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
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
        <div className="border-t divide-y">
          {lessons.map((lesson, index) => (
            <LessonRow
              key={lesson.id}
              lesson={lesson}
              courseSlug={courseSlug}
              moduleSlug={module.slug}
              lessonNumber={index + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
