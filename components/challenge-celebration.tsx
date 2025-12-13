"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createRoot } from "react-dom/client";
import { toast as sonnerToast } from "sonner";
import { type Difficulty, difficultyConfig } from "@/lib/challenges/data";
import { cn } from "@/lib/utils";
import { Confetti } from "./confetti";

export type ChallengeCelebrationData = {
  title: string;
  difficulty: Difficulty;
  basePoints: number;
  multiplier: number;
  earnedPoints: number;
};

// Map difficulty to confetti colors
const difficultyColors: Record<Difficulty, string[]> = {
  novice: ["#34d399", "#6ee7b7", "#a7f3d0", "#fbbf24", "#fcd34d"],
  easy: ["#22c55e", "#4ade80", "#86efac", "#fbbf24", "#fcd34d"],
  medium: ["#eab308", "#facc15", "#fde047", "#f97316", "#fb923c"],
  hard: ["#f97316", "#fb923c", "#fdba74", "#ef4444", "#fbbf24"],
  nightmare: ["#ef4444", "#f87171", "#fca5a5", "#f97316", "#fbbf24"],
};

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15.19a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.707 6.707 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z"
        fillRule="evenodd"
      />
    </svg>
  );
}

function CelebrationToast({ data }: { data: ChallengeCelebrationData }) {
  const config = difficultyConfig[data.difficulty];
  const showMultiplier = data.multiplier !== 1;

  return (
    <motion.div
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="flex toast-mobile:w-[380px] w-full justify-center"
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
    >
      <div
        className={cn(
          "relative flex toast-mobile:w-fit w-full flex-col gap-2 overflow-hidden rounded-xl border bg-zinc-50 p-4 shadow-lg",
          "border-l-4",
          config.bgColor.replace("bg-", "border-l-")
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-2">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            className={cn("text-xl", config.color)}
            transition={{
              duration: 0.6,
              repeat: 2,
              repeatDelay: 0.2,
            }}
          >
            <TrophyIcon className="size-6" />
          </motion.div>
          <span className="font-semibold text-zinc-900">
            Challenge Complete!
          </span>
        </div>

        {/* Challenge Title */}
        <p className="line-clamp-2 text-sm text-zinc-700">{data.title}</p>

        {/* Footer: Difficulty + Points */}
        <div className="flex items-center justify-between gap-3">
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 font-medium text-white text-xs",
              config.bgColor
            )}
          >
            {config.label}
          </span>
          <motion.div
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-baseline gap-1"
            initial={{ scale: 0.8, opacity: 0 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
          >
            <span className="font-bold text-lg text-zinc-900">
              +{data.earnedPoints}
            </span>
            <span className="text-xs text-zinc-500">pts</span>
            {showMultiplier && (
              <span className="text-xs text-zinc-400">
                ({data.multiplier}x)
              </span>
            )}
          </motion.div>
        </div>

        {/* Subtle gradient overlay for polish */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 opacity-5",
            config.bgColor
          )}
          style={{
            background:
              "linear-gradient(135deg, currentColor 0%, transparent 50%)",
          }}
        />
      </div>
    </motion.div>
  );
}

// Portal for confetti to render outside of toast
let confettiRoot: ReturnType<typeof createRoot> | null = null;
let confettiContainer: HTMLDivElement | null = null;

function showConfetti(colors: string[]) {
  // Create container if it doesn't exist
  if (!confettiContainer) {
    confettiContainer = document.createElement("div");
    confettiContainer.id = "confetti-root";
    document.body.appendChild(confettiContainer);
    confettiRoot = createRoot(confettiContainer);
  }

  confettiRoot?.render(
    <Confetti
      colors={colors}
      duration={2000}
      onComplete={() => {
        confettiRoot?.render(null);
      }}
      origin={{ x: 0.5, y: 0.15 }}
      particleCount={60}
    />
  );
}

export function showChallengeCelebration(data: ChallengeCelebrationData) {
  const colors = difficultyColors[data.difficulty];

  // Show confetti
  showConfetti(colors);

  // Show toast
  return sonnerToast.custom(
    () => (
      <AnimatePresence mode="wait">
        <CelebrationToast data={data} />
      </AnimatePresence>
    ),
    {
      duration: 5000,
      position: "top-center",
    }
  );
}
