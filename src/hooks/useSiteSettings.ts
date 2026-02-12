import { useQuery } from "@tanstack/react-query";
import { getSiteSettings } from "@/lib/firebaseService";

export function useSiteSettings() {
  return useQuery({
    queryKey: ["siteSettings"],
    queryFn: getSiteSettings,
    staleTime: 5 * 60 * 1000, // cache for 5 min
  });
}
