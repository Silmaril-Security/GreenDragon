"use server";

import {
  getAdjacentLessons as getAdjacentLessonsQuery,
  getCourseBySlug as getCourseBySlugQuery,
  getFeaturedCourse as getFeaturedCourseQuery,
  getLearnCourses as getLearnCoursesQuery,
  getLessonBySlug as getLessonBySlugQuery,
  getLessonsByModule as getLessonsByModuleQuery,
  getModuleBySlug as getModuleBySlugQuery,
  getModulesByCourse as getModulesByCourseQuery,
} from "@/lib/db/queries";

export async function getCourses() {
  return await getLearnCoursesQuery();
}

export async function getFeaturedCourse() {
  return await getFeaturedCourseQuery();
}

export async function getCourseBySlug(slug: string) {
  return await getCourseBySlugQuery(slug);
}

export async function getModulesByCourse(courseId: string) {
  return await getModulesByCourseQuery(courseId);
}

export async function getLessonsByModule(moduleId: string) {
  return await getLessonsByModuleQuery(moduleId);
}

export async function getAdjacentLessons(moduleId: string, sortOrder: number) {
  return await getAdjacentLessonsQuery(moduleId, sortOrder);
}

export async function getCourseWithModulesAndLessons(slug: string) {
  const courseData = await getCourseBySlug(slug);
  if (!courseData) {
    return null;
  }

  const modules = await getModulesByCourse(courseData.id);
  const modulesWithLessons = await Promise.all(
    modules.map(async (mod) => {
      const lessons = await getLessonsByModule(mod.id);
      return { ...mod, lessons };
    })
  );

  return { ...courseData, modules: modulesWithLessons };
}

export async function getLessonBySlug(
  courseSlug: string,
  moduleSlug: string,
  lessonSlug: string
) {
  const courseData = await getCourseBySlug(courseSlug);
  if (!courseData) {
    return null;
  }

  const moduleData = await getModuleBySlugQuery(courseData.id, moduleSlug);
  if (!moduleData) {
    return null;
  }

  const lessonData = await getLessonBySlugQuery(moduleData.id, lessonSlug);
  if (!lessonData) {
    return null;
  }

  return {
    course: courseData,
    module: moduleData,
    lesson: lessonData,
  };
}

export async function getTotalLessonsInCourse(courseId: string) {
  const modules = await getModulesByCourse(courseId);
  let total = 0;
  for (const mod of modules) {
    const lessons = await getLessonsByModule(mod.id);
    total += lessons.length;
  }
  return total;
}

export async function getTotalMinutesInCourse(courseId: string) {
  const modules = await getModulesByCourse(courseId);
  let total = 0;
  for (const mod of modules) {
    const lessons = await getLessonsByModule(mod.id);
    total += lessons.reduce((sum, l) => sum + (l.estimatedMinutes || 0), 0);
  }
  return total;
}
