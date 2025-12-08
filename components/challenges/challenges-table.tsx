"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  type Challenge,
  difficultyConfig,
  categoryConfig,
  statusConfig,
} from "@/lib/challenges/data";

export type SortField = "status" | "title" | "difficulty" | "points";
export type SortDirection = "asc" | "desc";

interface ChallengesTableProps {
  challenges: Challenge[];
  sortField: SortField | null;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

function SortableHeader({
  children,
  field,
  currentField,
  direction,
  onSort,
  className,
}: {
  children?: React.ReactNode;
  field: SortField;
  currentField: SortField | null;
  direction: SortDirection;
  onSort: (field: SortField) => void;
  className?: string;
}) {
  const isActive = currentField === field;

  return (
    <button
      onClick={() => onSort(field)}
      className={cn(
        "flex items-center gap-1 hover:text-foreground transition-colors",
        isActive && "text-foreground",
        className
      )}
    >
      {children}
      {isActive && (
        direction === "asc" ? (
          <ArrowUp className="size-3" />
        ) : (
          <ArrowDown className="size-3" />
        )
      )}
    </button>
  );
}

export function ChallengesTable({
  challenges,
  sortField,
  sortDirection,
  onSort,
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
}: ChallengesTableProps) {
  const router = useRouter();

  const handleRowClick = (challenge: Challenge) => {
    router.push(`/?challenge=${challenge.id}`);
  };

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * 10 + 1;
  const endItem = Math.min(currentPage * 10, totalItems);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border bg-card">
        {/* Header */}
        <div className="hidden border-b px-4 py-3 text-sm font-medium text-muted-foreground sm:grid sm:grid-cols-[40px_1fr_140px_100px_60px] sm:gap-4">
          <SortableHeader
            field="status"
            currentField={sortField}
            direction={sortDirection}
            onSort={onSort}
          />
          <SortableHeader
            field="title"
            currentField={sortField}
            direction={sortDirection}
            onSort={onSort}
          >
            Title
          </SortableHeader>
          <div>Category</div>
          <SortableHeader
            field="difficulty"
            currentField={sortField}
            direction={sortDirection}
            onSort={onSort}
          >
            Difficulty
          </SortableHeader>
          <SortableHeader
            field="points"
            currentField={sortField}
            direction={sortDirection}
            onSort={onSort}
            className="justify-end"
          >
            Points
          </SortableHeader>
        </div>

        {/* Rows */}
        {challenges.length === 0 ? (
          <div className="flex h-48 items-center justify-center">
            <p className="text-muted-foreground">No challenges found</p>
          </div>
        ) : (
          <div className="divide-y">
            {challenges.map((challenge) => {
              const diffConfig = difficultyConfig[challenge.difficulty];
              const catConfig = categoryConfig[challenge.category];
              const statConfig = statusConfig[challenge.status];

              return (
                <div
                  key={challenge.id}
                  onClick={() => handleRowClick(challenge)}
                  className="cursor-pointer px-4 py-3 transition-colors hover:bg-accent/50"
                >
                  {/* Mobile layout */}
                  <div className="flex items-start gap-3 sm:hidden">
                    <span
                      className={cn(
                        "mt-0.5 text-lg",
                        challenge.status === "solved"
                          ? "text-green-500"
                          : challenge.status === "in-progress"
                            ? "text-yellow-500"
                            : "text-muted-foreground"
                      )}
                    >
                      {statConfig.icon}
                    </span>
                    <div className="flex-1">
                      <div className="font-medium">{challenge.title}</div>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                        <span className="text-muted-foreground">
                          {catConfig.label}
                        </span>
                        <span className={diffConfig.color}>{diffConfig.label}</span>
                        <span className="text-muted-foreground">
                          {challenge.points} pts
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Desktop layout */}
                  <div className="hidden sm:grid sm:grid-cols-[40px_1fr_140px_100px_60px] sm:items-center sm:gap-4">
                    <span
                      className={cn(
                        "text-lg",
                        challenge.status === "solved"
                          ? "text-green-500"
                          : challenge.status === "in-progress"
                            ? "text-yellow-500"
                            : "text-muted-foreground"
                      )}
                    >
                      {statConfig.icon}
                    </span>
                    <div>
                      <div className="font-medium">{challenge.title}</div>
                      <div className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                        {challenge.description}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {catConfig.label}
                    </div>
                    <div className={cn("text-sm", diffConfig.color)}>
                      {diffConfig.label}
                    </div>
                    <div className="text-right text-sm">{challenge.points}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalItems > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {startItem}-{endItem} of {totalItems} challenges
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
