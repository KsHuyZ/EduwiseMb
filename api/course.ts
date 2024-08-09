import api from "@/lib/api";

import {
  CourseCredentials,
  CourseType,
  ECourseStatus,
  ICategory,
  Lesson,
  LessonCredentials,
  TVideoCredentials,
} from "@/types";
import { TableApiResponse } from "@/types/response";

type CourseCredentialOverride = Omit<
  CourseCredentials,
  "tags" | "categories"
> & { tags: string[]; categories: string[] };

export const createCourses = (
  course: CourseCredentials
): Promise<CourseType> => {
  const tags = course.tags.map((tag) => tag.name);
  const categories = course.categories.map((tag) => tag.name);
  const formatCourse = {
    ...course,
    tags,
    categories,
  } as CourseCredentialOverride;
  const data = new FormData();
  Object.keys(formatCourse).forEach((key) => {
    data.append(key, formatCourse[key as keyof CourseCredentialOverride]);
  });

  return api.post("/course/create", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateCourses = (
  course: CourseCredentials
): Promise<CourseType> => {
  const tags = course.tags.map((tag) => tag.name);
  const categories = course.categories.map((tag) => tag.name);
  const formatCourse = {
    ...course,
    tags,
    categories,
  } as CourseCredentialOverride;
  const data = new FormData();
  Object.keys(formatCourse).forEach((key) => {
    data.append(key, formatCourse[key as keyof CourseCredentialOverride]);
  });

  return api.put("/course/update", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getCourses = (
  sort?: string,
  priceMin = 0,
  priceMax = 1000000000,
  keyword?: string
): Promise<TableApiResponse<CourseType[]>> =>
  api.get("/course/get-all", {
    params: {
      sort,
      priceMin: 0,
      priceMax: 10000000000,
    },
  });

export const getTeacherCourses = (): Promise<CourseType[]> =>
  api.get(`/course/get-by-teacher`);

export const getCoursesLesson = (id: string): Promise<Lesson[]> =>
  api.get(`/lesson/get-lessons?id=${id}`);

export const createLesson = (lesson: LessonCredentials): Promise<Lesson> =>
  api.post("/lesson/create", lesson);

export const updateLesson = (lesson: LessonCredentials): Promise<Lesson> =>
  api.put(`/lesson/update/${lesson.id}`, {
    title: lesson.title,
    content: lesson.content,
  });

export const getAllCourseCategories = (): Promise<ICategory[]> =>
  api.get("/course/categories/get-all");

export const getLessonByCourseId = (id: string): Promise<Lesson[]> =>
  api.get(`/lesson/get-lessons?id=${id}`);
export const getCourseById = (id: string): Promise<CourseType> =>
  api.get(`/course/get-by-id?id=${id}`);

export const deleteLessonById = (id: string) =>
  api.delete("/lesson/delete", {
    data: id,
  });

export const createVideo = (video: TVideoCredentials) => {
  const data = new FormData();
  data.append("title", video.title);
  data.append("file", video.file as Blob);
  data.append("idLesson", video.idLesson);
  data.append("description", video.description);

  return api.post("/video/create", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getMyCourse = (): Promise<CourseType[]> =>
  api.get("/course/get-by-user");

export const changeCourseStatus = (id: string, status: ECourseStatus) =>
  api.post(`/course/update-status-by-teacher?id=${id}&status=${status}`);
