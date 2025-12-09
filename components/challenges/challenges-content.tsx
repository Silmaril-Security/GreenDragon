"use client";

import { useEffect, useMemo, useState } from "react";
import { StatCard } from "./stat-card";
import { FilterBar } from "./filter-bar";
import { ChallengesTable, type SortField, type SortDirection } from "./challenges-table";
import {
  type Category,
  type Difficulty,
  type ChallengeStatus,
  difficultyConfig,
} from "@/lib/challenges/data";
import type { ChallengeWithStatus } from "@/lib/challenges/actions";

const ITEMS_PER_PAGE = 10;

interface ChallengesContentProps {
  challenges: ChallengeWithStatus[];
}

const difficultyOrder: Record<Difficulty, number> = {
  novice: 0,
  easy: 1,
  medium: 2,
  hard: 3,
  nightmare: 4,
};

const statusOrder: Record<ChallengeStatus, number> = {
  solved: 0,
  "in-progress": 1,
  "not-started": 2,
};

export function ChallengesContent({ challenges }: ChallengesContentProps) {
  const [category, setCategory] = useState<Category | "all">("all");
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");
  const [status, setStatus] = useState<ChallengeStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when filters or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category, difficulty, status, search, sortField, sortDirection]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalSolved = challenges.filter((c) => c.status === "solved").length;
    const total = challenges.length;

    const byDifficulty = (Object.keys(difficultyConfig) as Difficulty[]).map(
      (diff) => {
        const diffChallenges = challenges.filter((c) => c.difficulty === diff);
        const solved = diffChallenges.filter((c) => c.status === "solved").length;
        return {
          difficulty: diff,
          solved,
          total: diffChallenges.length,
          ...difficultyConfig[diff],
        };
      }
    );

    return { totalSolved, total, byDifficulty };
  }, [challenges]);

  // Filter challenges
  const filteredChallenges = useMemo(() => {
    return challenges.filter((challenge) => {
      if (category !== "all" && challenge.category !== category) return false;
      if (difficulty !== "all" && challenge.difficulty !== difficulty)
        return false;
      if (status !== "all" && challenge.status !== status) return false;
      if (
        search &&
        !challenge.title.toLowerCase().includes(search.toLowerCase()) &&
        !challenge.description.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [challenges, category, difficulty, status, search]);

  // Sort challenges
  const sortedChallenges = useMemo(() => {
    if (!sortField) return filteredChallenges;

    return [...filteredChallenges].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "status":
          comparison = statusOrder[a.status] - statusOrder[b.status];
          break;
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "difficulty":
          comparison = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
          break;
        case "points":
          comparison = a.points - b.points;
          break;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [filteredChallenges, sortField, sortDirection]);

  // Paginate challenges
  const totalPages = Math.ceil(sortedChallenges.length / ITEMS_PER_PAGE);
  const paginatedChallenges = sortedChallenges.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction or clear sort
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else {
        setSortField(null);
        setSortDirection("asc");
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard
          title="Solved"
          solved={stats.totalSolved}
          total={stats.total}
          colorClass="text-primary"
          bgColorClass="bg-primary"
        />
        {stats.byDifficulty.map((stat) => (
          <StatCard
            key={stat.difficulty}
            title={stat.label}
            solved={stat.solved}
            total={stat.total}
            colorClass={stat.color}
            bgColorClass={stat.bgColor}
          />
        ))}
      </div>

      {/* Filters */}
      <FilterBar
        category={category}
        difficulty={difficulty}
        status={status}
        search={search}
        onCategoryChange={setCategory}
        onDifficultyChange={setDifficulty}
        onStatusChange={setStatus}
        onSearchChange={setSearch}
      />

      {/* Challenge Table */}
      <ChallengesTable
        challenges={paginatedChallenges}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={sortedChallenges.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
