import { useQuery } from "@tanstack/react-query";
import { getCourses } from "@/api";

export const useCourse = (
  sortBy?: string,
  priceMin?: string,
  priceMax?: string,
  keyword?: string
) =>
  useQuery({
    queryKey: ["teacher-course", sortBy, priceMin, priceMax, priceMax, keyword],
    queryFn: () =>
      getCourses(sortBy, Number(priceMin), Number(priceMax), keyword),
  });
