"use client";

import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useActiveChallenge } from "@/contexts/active-challenge-context";
import { chatModels } from "@/lib/ai/models";
import type { ChallengeWithStatus } from "@/lib/challenges/actions";
import {
  categoryConfig,
  difficultyConfig,
  statusConfig,
} from "@/lib/challenges/data";
import { cn } from "@/lib/utils";

// Regex for parsing quoted text at the start of descriptions
const QUOTE_REGEX = /^["'](.+?)["']\s*\n\n(.+)$/s;

// Parse description into quote and body parts
function parseDescription(description: string): {
  quote: string | null;
  body: string;
} {
  // Match quoted text at the start: "..." or '...'
  const quoteMatch = description.match(QUOTE_REGEX);
  if (quoteMatch) {
    return { quote: quoteMatch[1], body: quoteMatch[2] };
  }
  return { quote: null, body: description };
}

function ChallengeDescription({
  description,
  variant = "full",
}: {
  description: string;
  variant?: "full" | "compact" | "mobile";
}) {
  const { quote, body } = useMemo(
    () => parseDescription(description),
    [description]
  );

  if (variant === "compact") {
    // Desktop: show quote and body
    return (
      <div className="text-muted-foreground text-xs">
        {quote && (
          <p className="text-foreground/70 italic">&ldquo;{quote}&rdquo;</p>
        )}
        <p className="mt-0.5 line-clamp-2">{body}</p>
      </div>
    );
  }

  if (variant === "mobile") {
    // Mobile: show quote and full body
    return (
      <div className="text-muted-foreground text-xs">
        {quote && (
          <p className="text-foreground/70 italic">&ldquo;{quote}&rdquo;</p>
        )}
        <p className="mt-1">{body}</p>
      </div>
    );
  }

  // Full: show everything
  return (
    <div className="text-muted-foreground text-sm">
      {quote && (
        <p className="mb-2 text-foreground/70 italic">&ldquo;{quote}&rdquo;</p>
      )}
      <p>{body}</p>
    </div>
  );
}

export type SortField = "status" | "title" | "difficulty" | "points";
export type SortDirection = "asc" | "desc";

type ChallengesTableProps = {
  challenges: ChallengeWithStatus[];
  sortField: SortField | null;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
};

// Helper to get model short name from modelId
function getModelShortName(modelId: string): string {
  const model = chatModels.find((m) => m.id === modelId);
  if (!model) {
    return modelId.split("/").pop() || modelId;
  }
  // Return shortened name (e.g., "Opus 4.5", "GPT-5")
  return model.name
    .replace("Claude ", "")
    .replace("Gemini ", "")
    .replace("DeepSeek ", "");
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
      className={cn(
        "group flex items-center gap-1 transition-colors hover:text-foreground",
        isActive && "text-foreground",
        className
      )}
      onClick={() => onSort(field)}
      type="button"
    >
      {children}
      {isActive ? (
        direction === "asc" ? (
          <ArrowUp className="size-3" />
        ) : (
          <ArrowDown className="size-3" />
        )
      ) : (
        <ArrowUp className="size-3 opacity-0 transition-opacity group-hover:opacity-50" />
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
  const { setActiveChallenge } = useActiveChallenge();

  const handleRowClick = (challenge: ChallengeWithStatus) => {
    setActiveChallenge(challenge);
    router.push("/");
  };

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * 10 + 1;
  const endItem = Math.min(currentPage * 10, totalItems);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border bg-card">
        {/* Header */}
        <div className="hidden border-b px-4 py-3 font-medium text-muted-foreground text-sm sm:grid sm:grid-cols-[70px_1fr_140px_100px_60px] sm:gap-4">
          <SortableHeader
            currentField={sortField}
            direction={sortDirection}
            field="status"
            onSort={onSort}
          >
            Status
          </SortableHeader>
          <SortableHeader
            currentField={sortField}
            direction={sortDirection}
            field="title"
            onSort={onSort}
          >
            Title
          </SortableHeader>
          <div>Category</div>
          <SortableHeader
            currentField={sortField}
            direction={sortDirection}
            field="difficulty"
            onSort={onSort}
          >
            Difficulty
          </SortableHeader>
          <SortableHeader
            className="justify-end"
            currentField={sortField}
            direction={sortDirection}
            field="points"
            onSort={onSort}
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
                <button
                  className="w-full cursor-pointer px-4 py-3 text-left transition-colors hover:bg-accent/50"
                  key={challenge.id}
                  onClick={() => handleRowClick(challenge)}
                  type="button"
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
                      {statConfig?.icon ?? "○"}
                    </span>
                    <div className="flex-1">
                      <div className="font-medium">{challenge.title}</div>
                      <div className="mt-1">
                        <ChallengeDescription
                          description={challenge.description}
                          variant="mobile"
                        />
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                        <span className="text-muted-foreground">
                          {catConfig?.label ?? challenge.category}
                        </span>
                        <span className={diffConfig?.color}>
                          {diffConfig?.label ?? challenge.difficulty}
                        </span>
                        <span className="text-muted-foreground">
                          {challenge.points} pts
                        </span>
                      </div>
                      {challenge.solvedModels.length > 0 && (
                        <div className="mt-2 flex flex-wrap items-center gap-1">
                          <span className="text-[10px] text-muted-foreground">
                            Solved with:
                          </span>
                          {challenge.solvedModels.map((sm) => (
                            <span
                              className="rounded bg-green-500/10 px-1.5 py-0.5 text-[10px] text-green-600 dark:text-green-400"
                              key={sm.modelId}
                              title={`${sm.earnedPoints} pts`}
                            >
                              {getModelShortName(sm.modelId)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Desktop layout */}
                  <div className="hidden sm:grid sm:grid-cols-[70px_1fr_140px_100px_60px] sm:items-center sm:gap-4">
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
                      {statConfig?.icon ?? "○"}
                    </span>
                    <div>
                      <div className="font-medium">{challenge.title}</div>
                      <div className="mt-0.5">
                        <ChallengeDescription
                          description={challenge.description}
                          variant="compact"
                        />
                      </div>
                      {challenge.solvedModels.length > 0 && (
                        <div className="mt-1 flex flex-wrap items-center gap-1">
                          <span className="text-[10px] text-muted-foreground">
                            Solved:
                          </span>
                          {challenge.solvedModels.map((sm) => (
                            <span
                              className="rounded bg-green-500/10 px-1.5 py-0.5 text-[10px] text-green-600 dark:text-green-400"
                              key={sm.modelId}
                              title={`${sm.earnedPoints} pts`}
                            >
                              {getModelShortName(sm.modelId)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {catConfig?.label ?? challenge.category}
                    </div>
                    <div className={cn("text-sm", diffConfig?.color)}>
                      {diffConfig?.label ?? challenge.difficulty}
                    </div>
                    <div className="text-right text-sm">{challenge.points}</div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalItems > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm">
            {startItem}-{endItem} of {totalItems} challenges
          </p>
          <div className="flex items-center gap-2">
            <Button
              className="size-8"
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
              size="icon"
              variant="outline"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <span className="text-muted-foreground text-sm">
              {currentPage} of {totalPages}
            </span>
            <Button
              className="size-8"
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              size="icon"
              variant="outline"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
