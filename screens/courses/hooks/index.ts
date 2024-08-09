import { useQueries, useQuery } from '@tanstack/react-query';

import { getCourseById, getCoursesLesson, getLessonByCourseId } from '@/api';

export const useCourse = (id: string) =>
  useQueries({
    queries: [
      {
        queryKey: ['course', id],
        queryFn: () => getCourseById(id),
      },
      {
        queryKey: ['lesson-course', id],
        queryFn: () => getCoursesLesson(id),
      },
    ],
  });

  export const useLessonList = (id: string) =>
    useQuery({
      queryKey: ['lesson', id],
      queryFn: () => getLessonByCourseId(id),
    });