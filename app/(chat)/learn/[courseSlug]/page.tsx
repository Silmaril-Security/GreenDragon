import {
  BookOpen,
  Bug,
  ChevronLeft,
  Clock,
  Layers,
  Lock,
  Shield,
  Syringe,
  Target,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DifficultyBadge } from "@/components/learn/difficulty-badge";
import { ModuleAccordion } from "@/components/learn/module-accordion";
import { PageHeader } from "@/components/page-header";
import {
  getCourseWithModulesAndLessons,
  getTotalLessonsInCourse,
  getTotalMinutesInCourse,
} from "@/lib/learn/actions";

const iconMap: Record<string, React.ElementType> = {
  shield: Shield,
  syringe: Syringe,
  bug: Bug,
  lock: Lock,
  "book-open": BookOpen,
  target: Target,
  zap: Zap,
};

type CoursePageProps = {
  params: Promise<{ courseSlug: string }>;
};

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseSlug } = await params;
  const courseData = await getCourseWithModulesAndLessons(courseSlug);

  if (!courseData) {
    notFound();
  }

  const lessonCount = await getTotalLessonsInCourse(courseData.id);
  const totalMinutes = await getTotalMinutesInCourse(courseData.id);
  const hours = Math.round(totalMinutes / 60);

  const IconComponent = iconMap[courseData.icon || "shield"] || Shield;

  return (
    <div className="flex h-full flex-col overflow-auto">
      <PageHeader />
      <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-8">
        {/* Back Link */}
        <Link
          className="mb-6 inline-flex items-center gap-1 text-muted-foreground text-sm transition-colors hover:text-foreground"
          href="/learn"
        >
          <ChevronLeft className="size-4" />
          Learn
        </Link>

        {/* Course Header Card */}
        <div className="relative mb-8 overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.03] via-transparent to-transparent p-6 sm:p-8">
          {/* Ambient glow */}
          <div className="-right-20 -top-20 pointer-events-none absolute size-64 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="-bottom-32 -left-32 pointer-events-none absolute size-64 rounded-full bg-emerald-600/5 blur-3xl" />

          <div className="relative mb-4 flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="relative flex size-16 shrink-0 items-center justify-center">
              {/* Icon glow */}
              <div className="absolute inset-0 rounded-2xl bg-emerald-500/20 blur-xl" />
              <div className="relative flex size-full items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-emerald-500/25 shadow-lg">
                <IconComponent className="size-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="font-bold text-2xl md:text-3xl">
                {courseData.title}
              </h1>
              {courseData.subtitle && (
                <p className="mt-1 text-muted-foreground">
                  {courseData.subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="relative mb-6 text-muted-foreground">
            {courseData.description}
          </p>

          {/* Stats Row */}
          <div className="relative flex flex-wrap gap-3">
            {courseData.difficulty && (
              <DifficultyBadge difficulty={courseData.difficulty} />
            )}
            <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 ring-1 ring-emerald-500/20">
              <Layers className="size-4 text-emerald-600 dark:text-emerald-400" />
              <span className="font-medium text-sm">
                {courseData.modules.length}
              </span>
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
        </div>

        {/* Curriculum Section */}
        <div className="mb-8">
          <h3 className="mb-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
            Curriculum
          </h3>
          <div className="flex flex-col gap-4">
            {courseData.modules.map((mod, index) => (
              <ModuleAccordion
                courseSlug={courseSlug}
                defaultOpen={index === 0}
                key={mod.id}
                lessons={mod.lessons}
                module={mod}
                moduleNumber={index + 1}
              />
            ))}
          </div>
        </div>

        {/* References Section (placeholder) */}
        {/* Will be populated from course data later */}
      </div>
    </div>
  );
}
