import { useQuery } from "@tanstack/react-query";
import { getTeamMembers } from "@/lib/firebaseService";

export function useTeamMembers() {
  return useQuery({
    queryKey: ["teamMembers"],
    queryFn: getTeamMembers,
  });
}
