"use client";

import { Command } from "cmdk";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { difficultyConfig, categoryConfig, type Difficulty, type Category } from "@/lib/challenges/data";
import type { Challenge } from "@/lib/db/schema";
import { cn } from "@/lib/utils";

interface CommandPopoverProps {
  open: boolean;
  onClose: () => void;
  onSelect: (challenge: Challenge) => void;
  challenges: Challenge[];
  searchQuery: string;
  anchorRef: React.RefObject<HTMLElement | null>;
}

// Parse description into quote and body parts
function parseDescription(description: string): { quote: string | null; body: string } {
  const quoteMatch = description.match(/^["'](.+?)["']\s*\n\n(.+)$/s);
  if (quoteMatch) {
    return { quote: quoteMatch[1], body: quoteMatch[2] };
  }
  return { quote: null, body: description };
}

// Highlight matching text in a string
function HighlightedText({
  text,
  query,
}: {
  text: string;
  query: string;
}) {
  if (!query) return <>{text}</>;

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);

  if (index === -1) return <>{text}</>;

  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);

  return (
    <>
      {before}
      <span className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
        {match}
      </span>
      {after}
    </>
  );
}

function PureCommandPopover({
  open,
  onClose,
  onSelect,
  challenges,
  searchQuery,
}: CommandPopoverProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const listRef = useRef<HTMLDivElement>(null);

  const filteredChallenges = useMemo(() => {
    if (!searchQuery) return challenges;
    const query = searchQuery.toLowerCase();

    // Filter and sort by relevance (title matches first, then slug, then category)
    return challenges
      .filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.slug.toLowerCase().includes(query) ||
          c.category.toLowerCase().includes(query)
      )
      .sort((a, b) => {
        const aTitle = a.title.toLowerCase().includes(query);
        const bTitle = b.title.toLowerCase().includes(query);
        if (aTitle && !bTitle) return -1;
        if (!aTitle && bTitle) return 1;

        const aSlug = a.slug.toLowerCase().includes(query);
        const bSlug = b.slug.toLowerCase().includes(query);
        if (aSlug && !bSlug) return -1;
        if (!aSlug && bSlug) return 1;

        return 0;
      });
  }, [challenges, searchQuery]);

  // Reset selection when filtered list changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredChallenges.length]);

  // Scroll selected item into view
  useEffect(() => {
    const selectedElement = itemRefs.current.get(selectedIndex);
    if (selectedElement) {
      selectedElement.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((i) =>
            i < filteredChallenges.length - 1 ? i + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((i) =>
            i > 0 ? i - 1 : filteredChallenges.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (filteredChallenges[selectedIndex]) {
            onSelect(filteredChallenges[selectedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    },
    [open, filteredChallenges, selectedIndex, onSelect, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!open) return null;

  return (
    <div className="absolute bottom-full left-0 z-50 w-full max-w-md">
      <Command className="overflow-hidden rounded-lg border bg-popover shadow-lg">
        <div className="border-b px-3 py-2">
          <p className="text-xs text-muted-foreground">
            Select a challenge to activate
          </p>
        </div>
        <Command.List ref={listRef} className="max-h-64 overflow-y-auto p-1">
          {filteredChallenges.length === 0 ? (
            <Command.Empty className="px-3 py-6 text-center text-sm text-muted-foreground">
              No challenges found
            </Command.Empty>
          ) : (
            filteredChallenges.map((challenge, index) => {
              const diffConfig = difficultyConfig[challenge.difficulty as Difficulty];
              const catConfig = categoryConfig[challenge.category as Category];
              const isSelected = index === selectedIndex;
              const { quote, body } = parseDescription(challenge.description);

              return (
                <div
                  key={challenge.id}
                  ref={(el) => {
                    if (el) itemRefs.current.set(index, el);
                    else itemRefs.current.delete(index);
                  }}
                >
                  <Command.Item
                    value={challenge.slug}
                    onSelect={() => onSelect(challenge)}
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-md px-3 py-2 text-sm transition-all duration-200",
                      isSelected
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent/50"
                    )}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-medium">
                          <HighlightedText
                            text={challenge.title}
                            query={searchQuery}
                          />
                        </span>
                        <span className="shrink-0 text-[10px] text-muted-foreground">
                          {catConfig?.label ?? challenge.category}
                        </span>
                        <span
                          className={cn(
                            "shrink-0 text-[10px] font-medium",
                            diffConfig?.color
                          )}
                        >
                          {diffConfig?.label}
                        </span>
                      </div>
                      <div className={cn(
                        "overflow-hidden transition-all duration-200",
                        isSelected ? "max-h-40 opacity-100" : "max-h-5 opacity-80"
                      )}>
                        {isSelected ? (
                          // Selected: show quote and full description
                          <div className="text-xs text-muted-foreground">
                            {quote && (
                              <p className="italic text-foreground/70">&ldquo;{quote}&rdquo;</p>
                            )}
                            <p className="mt-0.5">{body}</p>
                          </div>
                        ) : (
                          // Not selected: show just the quote, truncated
                          <p className="truncate text-xs italic text-muted-foreground">
                            &ldquo;{quote ?? body}&rdquo;
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {challenge.points} pts
                    </span>
                  </Command.Item>
                </div>
              );
            })
          )}
        </Command.List>
        <div className="border-t px-3 py-2">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <kbd className="rounded border bg-muted px-1">↑↓</kbd>
            <span>navigate</span>
            <kbd className="rounded border bg-muted px-1">↵</kbd>
            <span>select</span>
            <kbd className="rounded border bg-muted px-1">esc</kbd>
            <span>close</span>
          </div>
        </div>
      </Command>
    </div>
  );
}

export const CommandPopover = memo(PureCommandPopover);
