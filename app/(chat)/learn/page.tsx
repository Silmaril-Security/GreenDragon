import { PageHeader } from "@/components/page-header";
import { CourseCard } from "@/components/learn/course-card";
import { FeaturedCourse } from "@/components/learn/featured-course";
import { ModuleCard } from "@/components/learn/module-card";
import {
  getCourses,
  getFeaturedCourse,
  getModulesByCourse,
  getLessonsByModule,
  getTotalLessonsInCourse,
  getTotalMinutesInCourse,
} from "@/lib/learn/actions";

export default async function LearnPage() {
  const [courses, featuredCourse] = await Promise.all([
    getCourses(),
    getFeaturedCourse(),
  ]);

  // Get stats for each course (excluding featured course)
  const nonFeaturedCourses = courses.filter(
    (c) => c.id !== featuredCourse?.id
  );
  const coursesWithStats = await Promise.all(
    nonFeaturedCourses.map(async (course) => {
      const modules = await getModulesByCourse(course.id);
      const lessonCount = await getTotalLessonsInCourse(course.id);
      const totalMinutes = await getTotalMinutesInCourse(course.id);
      return {
        course,
        moduleCount: modules.length,
        lessonCount,
        totalMinutes,
      };
    })
  );

  // Get featured course stats and modules if exists
  let featuredStats = null;
  let featuredModulesWithStats: Array<{
    module: Awaited<ReturnType<typeof getModulesByCourse>>[number];
    lessonCount: number;
    totalMinutes: number;
  }> = [];

  if (featuredCourse) {
    const modules = await getModulesByCourse(featuredCourse.id);
    const lessonCount = await getTotalLessonsInCourse(featuredCourse.id);
    const totalMinutes = await getTotalMinutesInCourse(featuredCourse.id);
    featuredStats = {
      moduleCount: modules.length,
      lessonCount,
      totalMinutes,
    };

    // Get stats for each module in the featured course
    featuredModulesWithStats = await Promise.all(
      modules.map(async (mod) => {
        const lessons = await getLessonsByModule(mod.id);
        const modMinutes = lessons.reduce(
          (sum, l) => sum + (l.estimatedMinutes || 0),
          0
        );
        return {
          module: mod,
          lessonCount: lessons.length,
          totalMinutes: modMinutes,
        };
      })
    );
  }

  return (
    <div className="flex h-full flex-col overflow-auto">
      <PageHeader />
      <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="font-bold text-2xl md:text-3xl">Learn</h1>
          <p className="mt-1 text-muted-foreground">
            Master AI security from fundamentals to advanced techniques.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {/* Featured Course Section */}
          {featuredCourse && featuredStats && (
            <div>
              <h3 className="mb-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                Featured Course
              </h3>
              <FeaturedCourse
                course={featuredCourse}
                moduleCount={featuredStats.moduleCount}
                lessonCount={featuredStats.lessonCount}
                totalMinutes={featuredStats.totalMinutes}
              />
            </div>
          )}

          {/* Modules from Featured Course */}
          {featuredCourse && featuredModulesWithStats.length > 0 && (
            <div>
              <h3 className="mb-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                Course Modules
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {featuredModulesWithStats.map(
                  ({ module, lessonCount, totalMinutes }, index) => (
                    <ModuleCard
                      key={module.id}
                      module={module}
                      courseSlug={featuredCourse.slug}
                      lessonCount={lessonCount}
                      totalMinutes={totalMinutes}
                      moduleNumber={index + 1}
                    />
                  )
                )}
              </div>
            </div>
          )}

          {/* Other Courses Section (only if there are non-featured courses) */}
          {coursesWithStats.length > 0 && (
            <div>
              <h3 className="mb-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                More Courses
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {coursesWithStats.map(
                  ({ course, moduleCount, lessonCount, totalMinutes }) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      moduleCount={moduleCount}
                      lessonCount={lessonCount}
                      totalMinutes={totalMinutes}
                    />
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
