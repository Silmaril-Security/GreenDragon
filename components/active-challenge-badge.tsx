"use client";

import { X, Terminal as TerminalIcon } from "lucide-react";
import { memo } from "react";
import { difficultyConfig, type Difficulty } from "@/lib/challenges/data";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface ActiveChallengeBadgeProps {
  title: string;
  difficulty: Difficulty;
  points: number;
  onClear: () => void;
}

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
      <span className="truncate text-sm font-medium text-foreground">{title}</span>
      <span
        className={cn(
          "shrink-0 text-[10px] font-medium",
          diffConfig.color
        )}
      >
        {diffConfig.label}
      </span>
      <span className="shrink-0 text-xs text-muted-foreground">
        {points} pts
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="size-5 shrink-0 text-muted-foreground hover:text-foreground"
        onClick={onClear}
      >
        <X className="size-3" />
        <span className="sr-only">Clear active challenge</span>
      </Button>
    </div>
  );
}

export const ActiveChallengeBadge = memo(PureActiveChallengeBadge);
