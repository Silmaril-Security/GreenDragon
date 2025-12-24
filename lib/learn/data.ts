import type { CourseDifficulty } from "@/lib/db/schema";

// Reuse difficulty config colors from challenges
export const difficultyConfig: Record<
  CourseDifficulty,
  { label: string; color: string; bgColor: string }
> = {
  novice: {
    label: "Novice",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400",
  },
  easy: {
    label: "Easy",
    color: "text-green-500",
    bgColor: "bg-green-500",
  },
  medium: {
    label: "Medium",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500",
  },
  hard: {
    label: "Hard",
    color: "text-orange-500",
    bgColor: "bg-orange-500",
  },
  nightmare: {
    label: "Nightmare",
    color: "text-red-500",
    bgColor: "bg-red-500",
  },
};

// Course icon mapping (Lucide icon names)
export const courseIconMap: Record<string, string> = {
  shield: "Shield",
  syringe: "Syringe",
  bug: "Bug",
  lock: "Lock",
  "book-open": "BookOpen",
  target: "Target",
  zap: "Zap",
  "alert-triangle": "AlertTriangle",
};
