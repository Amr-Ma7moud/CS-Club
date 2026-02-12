import { useQuery } from "@tanstack/react-query";
import { getCourses, getCourseBySlug } from "@/lib/firebaseService";

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });
}

export function useCourseBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: ["course", slug],
    queryFn: () => getCourseBySlug(slug!),
    enabled: !!slug,
  });
}
