export type Difficulty = "novice" | "easy" | "medium" | "hard" | "nightmare";

export type Category =
  | "prompt-injection"
  | "indirect-prompt-injection"
  | "excessive-agency"
  | "insecure-plugin-design"
  | "jailbreaking"
  | "rag-exploits"
  | "agent-attacks"
  | "model-theft"
  | "adversarial-ml"
  | "data-poisoning"
  | "evasion";

export type ChallengeStatus = "solved" | "in-progress" | "not-started";

export type Challenge = {
  id: string;
  title: string;
  description: string;
  category: Category;
  difficulty: Difficulty;
  points: number;
  status: ChallengeStatus;
};

export const difficultyConfig: Record<
  Difficulty,
  { label: string; color: string; bgColor: string; points: number }
> = {
  novice: {
    label: "Novice",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400",
    points: 50,
  },
  easy: {
    label: "Easy",
    color: "text-green-500",
    bgColor: "bg-green-500",
    points: 100,
  },
  medium: {
    label: "Medium",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500",
    points: 250,
  },
  hard: {
    label: "Hard",
    color: "text-orange-500",
    bgColor: "bg-orange-500",
    points: 450,
  },
  nightmare: {
    label: "Nightmare",
    color: "text-red-500",
    bgColor: "bg-red-500",
    points: 750,
  },
};

export const categoryConfig: Record<Category, { label: string }> = {
  "prompt-injection": { label: "Prompt Injection" },
  "indirect-prompt-injection": { label: "Indirect Prompt Injection" },
  "excessive-agency": { label: "Excessive Agency" },
  "insecure-plugin-design": { label: "Insecure Plugin Design" },
  jailbreaking: { label: "Jailbreaking" },
  "rag-exploits": { label: "RAG Exploits" },
  "agent-attacks": { label: "Agent Attacks" },
  "model-theft": { label: "Model Theft" },
  "adversarial-ml": { label: "Adversarial ML" },
  "data-poisoning": { label: "Data Poisoning" },
  evasion: { label: "Evasion" },
};

export const statusConfig: Record<
  ChallengeStatus,
  { label: string; icon: string }
> = {
  solved: { label: "Solved", icon: "✓" },
  "in-progress": { label: "In Progress", icon: "◐" },
  "not-started": { label: "Not Started", icon: "○" },
};
