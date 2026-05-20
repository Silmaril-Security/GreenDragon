import type { CourseDifficulty } from "@/lib/db/schema";
import { cn } from "@/lib/utils";

const difficultyStyles: Record<
  CourseDifficulty,
  { label: string; className: string }
> = {
  novice: {
    label: "Novice",
    className: "bg-emerald-400/10 text-emerald-400",
  },
  easy: {
    label: "Easy",
    className: "bg-green-500/10 text-green-500",
  },
  medium: {
    label: "Medium",
    className: "bg-yellow-500/10 text-yellow-500",
  },
  hard: {
    label: "Hard",
    className: "bg-orange-500/10 text-orange-500",
  },
  nightmare: {
    label: "Nightmare",
    className: "bg-red-500/10 text-red-500",
  },
};

type DifficultyBadgeProps = {
  difficulty: CourseDifficulty;
  className?: string;
};

export function DifficultyBadge({
  difficulty,
  className,
}: DifficultyBadgeProps) {
  const style = difficultyStyles[difficulty];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 font-medium text-xs",
        style.className,
        className
      )}
    >
      {style.label}
    </span>
  );
}
