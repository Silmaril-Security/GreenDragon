export const DEFAULT_CHAT_MODEL: string = "anthropic/claude-haiku-4.5";

export type ChatModel = {
  id: string;
  name: string;
  description: string;
  multiplier: number;
};

export const chatModels: ChatModel[] = [
  // Anthropic
  {
    id: "anthropic/claude-opus-4.5",
    name: "Claude Opus 4.5",
    description: "Most capable Anthropic model for complex tasks",
    multiplier: 2.0,
  },
  {
    id: "anthropic/claude-sonnet-4.5",
    name: "Claude Sonnet 4.5",
    description: "Balanced performance and speed",
    multiplier: 1.5,
  },
  {
    id: "anthropic/claude-haiku-4.5",
    name: "Claude Haiku 4.5",
    description: "Fast and efficient for simple tasks",
    multiplier: 1.0,
  },
  // OpenAI
  {
    id: "openai/gpt-5",
    name: "GPT-5",
    description: "OpenAI's most advanced model",
    multiplier: 1.5,
  },
  {
    id: "openai/gpt-5-mini",
    name: "GPT-5 Mini",
    description: "Smaller, faster GPT-5 variant",
    multiplier: 1.0,
  },
  {
    id: "openai/gpt-4.1",
    name: "GPT-4.1",
    description: "OpenAI's latest GPT-4.1 model",
    multiplier: 1.0,
  },
  // Google
  {
    id: "google/gemini-3-pro-preview",
    name: "Gemini 3 Pro",
    description: "Google's latest multimodal model",
    multiplier: 2.0,
  },
  {
    id: "google/gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    description: "Powerful reasoning and long context",
    multiplier: 1.5,
  },
  {
    id: "google/gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    description: "Fast and cost-effective",
    multiplier: 1.0,
  },
  // DeepSeek
  {
    id: "deepseek/deepseek-v3.2",
    name: "DeepSeek V3.2",
    description: "Strong coding and reasoning capabilities",
    multiplier: 1.25,
  },
  {
    id: "deepseek/deepseek-r1",
    name: "DeepSeek R1",
    description: "Reasoning-focused model",
    multiplier: 1.5,
  },
  // Qwen (Alibaba)
  {
    id: "alibaba/qwen3-max",
    name: "Qwen3 Max",
    description: "Alibaba's flagship model",
    multiplier: 1.25,
  },
  // Kimi (MoonshotAI)
  {
    id: "moonshotai/kimi-k2",
    name: "Kimi K2",
    description: "MoonshotAI's advanced model",
    multiplier: 1.0,
  },
  {
    id: "moonshotai/kimi-k2-thinking",
    name: "Kimi K2 Thinking",
    description: "Enhanced reasoning with chain-of-thought",
    multiplier: 1.25,
  },
  // xAI
  {
    id: "xai/grok-4.1-fast-non-reasoning",
    name: "Grok 4.1 Fast",
    description: "Fast xAI model optimized for speed",
    multiplier: 1.0,
  },
];
