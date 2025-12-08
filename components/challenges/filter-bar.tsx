"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type Category,
  type Difficulty,
  type ChallengeStatus,
  categoryConfig,
  difficultyConfig,
  statusConfig,
} from "@/lib/challenges/data";

interface FilterBarProps {
  category: Category | "all";
  difficulty: Difficulty | "all";
  status: ChallengeStatus | "all";
  search: string;
  onCategoryChange: (value: Category | "all") => void;
  onDifficultyChange: (value: Difficulty | "all") => void;
  onStatusChange: (value: ChallengeStatus | "all") => void;
  onSearchChange: (value: string) => void;
}

export function FilterBar({
  category,
  difficulty,
  status,
  search,
  onCategoryChange,
  onDifficultyChange,
  onStatusChange,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      <div className="relative flex-1 sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search challenges..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Category</SelectItem>
            {(Object.keys(categoryConfig) as Category[]).map((cat) => (
              <SelectItem key={cat} value={cat}>
                {categoryConfig[cat].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={difficulty} onValueChange={onDifficultyChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Difficulty</SelectItem>
            {(Object.keys(difficultyConfig) as Difficulty[]).map((diff) => (
              <SelectItem key={diff} value={diff}>
                {difficultyConfig[diff].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Status</SelectItem>
            {(Object.keys(statusConfig) as ChallengeStatus[]).map((st) => (
              <SelectItem key={st} value={st}>
                {statusConfig[st].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
