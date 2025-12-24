import { notFound } from "next/navigation";
import { Clock, BookOpen } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Breadcrumbs } from "@/components/learn/breadcrumbs";
import { DifficultyBadge } from "@/components/learn/difficulty-badge";
import { LessonContent } from "@/components/learn/lesson-content";
import { LessonNavigation } from "@/components/learn/lesson-navigation";
import {
  getLessonBySlug,
  getAdjacentLessons,
  getLessonsByModule,
} from "@/lib/learn/actions";

type LessonPageProps = {
  params: Promise<{
    courseSlug: string;
    moduleSlug: string;
    lessonSlug: string;
  }>;
};

export default async function LessonPage({ params }: LessonPageProps) {
  const { courseSlug, moduleSlug, lessonSlug } = await params;
  const data = await getLessonBySlug(courseSlug, moduleSlug, lessonSlug);

  if (!data) {
    notFound();
  }

  const { course, module, lesson } = data;

  const [adjacentLessons, moduleLessons] = await Promise.all([
    getAdjacentLessons(module.id, lesson.sortOrder),
    getLessonsByModule(module.id),
  ]);

  // Calculate lesson position within module
  const lessonIndex = moduleLessons.findIndex((l) => l.id === lesson.id) + 1;
  const moduleLessonCount = moduleLessons.length;

  const breadcrumbItems = [
    { label: "Learn", href: "/learn" },
    { label: course.title, href: `/learn/${courseSlug}` },
    { label: module.title },
  ];

  return (
    <div className="flex h-full flex-col overflow-auto">
      <PageHeader />
      <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        {/* Lesson Header */}
        <div className="mb-6">
          <h1 className="font-bold text-2xl md:text-3xl">{lesson.title}</h1>

          <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-muted-foreground">
            {lesson.estimatedMinutes && (
              <span className="flex items-center gap-1">
                <Clock className="size-4" />
                {lesson.estimatedMinutes} min read
              </span>
            )}
            {module.difficulty && (
              <DifficultyBadge difficulty={module.difficulty} />
            )}
            <span className="flex items-center gap-1">
              <BookOpen className="size-4" />
              Lesson {lessonIndex} of {moduleLessonCount}
            </span>
          </div>
        </div>

        {/* Separator */}
        <hr className="mb-8" />

        {/* Lesson Content */}
        <LessonContent content={lesson.content} />

        {/* Separator */}
        <hr className="my-8" />

        {/* Lesson Navigation */}
        <LessonNavigation
          prev={adjacentLessons.prev}
          next={adjacentLessons.next}
          courseSlug={courseSlug}
          moduleSlug={moduleSlug}
        />
      </div>
    </div>
  );
}
