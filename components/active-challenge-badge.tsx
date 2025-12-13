"use client";

import { Terminal as TerminalIcon, X } from "lucide-react";
import { memo } from "react";
import { type Difficulty, difficultyConfig } from "@/lib/challenges/data";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type ActiveChallengeBadgeProps = {
  title: string;
  difficulty: Difficulty;
  points: number;
  onClear: () => void;
};

function PureActiveChallengeBadge({
  title,
  difficulty,
  points,
  onClear,
}: ActiveChallengeBadgeProps) {
  const diffConfig = difficultyConfig[difficulty];

  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <TerminalIcon className="size-4 text-emerald-500 dark:text-emerald-400" />
      <span className="truncate font-medium text-foreground text-sm">
        {title}
      </span>
      <span
        className={cn("shrink-0 font-medium text-[10px]", diffConfig.color)}
      >
        {diffConfig.label}
      </span>
      <span className="shrink-0 text-muted-foreground text-xs">
        {points} pts
      </span>
      <Button
        className="size-5 shrink-0 text-muted-foreground hover:text-foreground"
        onClick={onClear}
        size="icon"
        variant="ghost"
      >
        <X className="size-3" />
        <span className="sr-only">Clear active challenge</span>
      </Button>
    </div>
  );
}

export const ActiveChallengeBadge = memo(PureActiveChallengeBadge);
