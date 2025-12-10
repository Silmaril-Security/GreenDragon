import useSWR from "swr";
import type { Challenge as DBChallenge } from "@/lib/db/schema";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useChallenges() {
  const { data, error, isLoading } = useSWR<DBChallenge[]>(
    "/api/challenges",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // Cache for 1 minute
    }
  );

  return {
    challenges: data ?? [],
    isLoading,
    error,
  };
}
