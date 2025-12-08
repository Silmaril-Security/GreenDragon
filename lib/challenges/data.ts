export type Difficulty = "novice" | "easy" | "medium" | "hard" | "nightmare";

export type Category =
  | "prompt-injection"
  | "jailbreaking"
  | "rag-exploits"
  | "agent-attacks"
  | "model-theft"
  | "adversarial-ml"
  | "data-poisoning"
  | "evasion";

export type ChallengeStatus = "solved" | "in-progress" | "not-started";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: Category;
  difficulty: Difficulty;
  points: number;
  status: ChallengeStatus;
}

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

// Mock challenge data
export const challenges: Challenge[] = [
  // Novice challenges
  {
    id: "1",
    title: "Hello Prompt Injection",
    description:
      "Learn the basics of prompt injection by making the AI reveal its system prompt.",
    category: "prompt-injection",
    difficulty: "novice",
    points: 50,
    status: "solved",
  },
  {
    id: "2",
    title: "AI Says Hello",
    description:
      "Get the AI to say a specific phrase it's instructed not to say.",
    category: "jailbreaking",
    difficulty: "novice",
    points: 50,
    status: "solved",
  },
  {
    id: "3",
    title: "What's Your Name?",
    description: "Extract the AI assistant's configured name from the system.",
    category: "prompt-injection",
    difficulty: "novice",
    points: 50,
    status: "in-progress",
  },

  // Easy challenges
  {
    id: "4",
    title: "System Prompt Extraction",
    description:
      "Extract the full system prompt from a protected AI assistant.",
    category: "prompt-injection",
    difficulty: "easy",
    points: 100,
    status: "solved",
  },
  {
    id: "5",
    title: "Basic Guardrail Bypass",
    description: "Bypass simple content filters to discuss restricted topics.",
    category: "jailbreaking",
    difficulty: "easy",
    points: 100,
    status: "not-started",
  },
  {
    id: "6",
    title: "Role Play Escape",
    description: "Use role-playing techniques to bypass AI safety measures.",
    category: "jailbreaking",
    difficulty: "easy",
    points: 100,
    status: "not-started",
  },
  {
    id: "7",
    title: "Context Window Stuffing",
    description: "Exploit context window limitations to override instructions.",
    category: "prompt-injection",
    difficulty: "easy",
    points: 100,
    status: "not-started",
  },

  // Medium challenges
  {
    id: "8",
    title: "Indirect Prompt Injection",
    description:
      "Inject malicious instructions through external data sources.",
    category: "prompt-injection",
    difficulty: "medium",
    points: 250,
    status: "in-progress",
  },
  {
    id: "9",
    title: "Token Smuggling",
    description:
      "Use token-level manipulation to bypass content filters.",
    category: "jailbreaking",
    difficulty: "medium",
    points: 250,
    status: "not-started",
  },
  {
    id: "10",
    title: "RAG Poisoning Basics",
    description:
      "Inject malicious content into a RAG system's knowledge base.",
    category: "rag-exploits",
    difficulty: "medium",
    points: 250,
    status: "not-started",
  },
  {
    id: "11",
    title: "Agent Tool Confusion",
    description: "Trick an AI agent into misusing its available tools.",
    category: "agent-attacks",
    difficulty: "medium",
    points: 300,
    status: "not-started",
  },
  {
    id: "12",
    title: "Adversarial Suffix Attack",
    description:
      "Craft adversarial suffixes that cause model misbehavior.",
    category: "adversarial-ml",
    difficulty: "medium",
    points: 250,
    status: "not-started",
  },

  // Hard challenges
  {
    id: "13",
    title: "Multi-Turn Jailbreak",
    description:
      "Execute a complex jailbreak that requires multiple conversation turns.",
    category: "jailbreaking",
    difficulty: "hard",
    points: 450,
    status: "not-started",
  },
  {
    id: "14",
    title: "RAG Document Hijacking",
    description:
      "Manipulate retrieved documents to control AI responses.",
    category: "rag-exploits",
    difficulty: "hard",
    points: 450,
    status: "not-started",
  },
  {
    id: "15",
    title: "Agent Tool Hijacking",
    description:
      "Take control of an AI agent's tool execution flow.",
    category: "agent-attacks",
    difficulty: "hard",
    points: 500,
    status: "not-started",
  },
  {
    id: "16",
    title: "Model Output Extraction",
    description:
      "Extract sensitive information about the model's training data.",
    category: "model-theft",
    difficulty: "hard",
    points: 450,
    status: "not-started",
  },
  {
    id: "17",
    title: "Classifier Evasion",
    description: "Evade AI-powered content classifiers with crafted inputs.",
    category: "evasion",
    difficulty: "hard",
    points: 400,
    status: "not-started",
  },

  // Nightmare challenges
  {
    id: "18",
    title: "Multi-Agent Chain Exploit",
    description:
      "Exploit vulnerabilities across a chain of cooperating AI agents.",
    category: "agent-attacks",
    difficulty: "nightmare",
    points: 800,
    status: "not-started",
  },
  {
    id: "19",
    title: "Model Weight Inference",
    description:
      "Infer information about model weights through careful probing.",
    category: "model-theft",
    difficulty: "nightmare",
    points: 750,
    status: "not-started",
  },
  {
    id: "20",
    title: "Training Data Extraction",
    description:
      "Extract memorized training data from a language model.",
    category: "model-theft",
    difficulty: "nightmare",
    points: 800,
    status: "not-started",
  },
  {
    id: "21",
    title: "Adversarial Reprogramming",
    description:
      "Reprogram a model to perform unintended tasks through adversarial inputs.",
    category: "adversarial-ml",
    difficulty: "nightmare",
    points: 750,
    status: "not-started",
  },
  {
    id: "22",
    title: "Backdoor Trigger Discovery",
    description:
      "Discover and activate hidden backdoors in a fine-tuned model.",
    category: "data-poisoning",
    difficulty: "nightmare",
    points: 850,
    status: "not-started",
  },
];
