export const DEFAULT_CHAT_MODEL: string = "anthropic/claude-sonnet-4.5";

export type ChatModel = {
  id: string;
  name: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  // Anthropic
  {
    id: "anthropic/claude-opus-4.5",
    name: "Claude Opus 4.5",
    description: "Most capable Anthropic model for complex tasks",
  },
  {
    id: "anthropic/claude-sonnet-4.5",
    name: "Claude Sonnet 4.5",
    description: "Balanced performance and speed",
  },
  {
    id: "anthropic/claude-haiku-4.5",
    name: "Claude Haiku 4.5",
    description: "Fast and efficient for simple tasks",
  },
  // OpenAI
  {
    id: "openai/gpt-5",
    name: "GPT-5",
    description: "OpenAI's most advanced model",
  },
  {
    id: "openai/gpt-5-mini",
    name: "GPT-5 Mini",
    description: "Smaller, faster GPT-5 variant",
  },
  // Google
  {
    id: "google/gemini-3-pro-preview",
    name: "Gemini 3 Pro",
    description: "Google's latest multimodal model",
  },
  {
    id: "google/gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    description: "Powerful reasoning and long context",
  },
  {
    id: "google/gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    description: "Fast and cost-effective",
  },
  // DeepSeek
  {
    id: "deepseek/deepseek-v3.2",
    name: "DeepSeek V3.2",
    description: "Strong coding and reasoning capabilities",
  },
  {
    id: "deepseek/deepseek-r1",
    name: "DeepSeek R1",
    description: "Reasoning-focused model",
  },
  // Qwen (Alibaba)
  {
    id: "alibaba/qwen3-max",
    name: "Qwen3 Max",
    description: "Alibaba's flagship model",
  },
  // Kimi (MoonshotAI)
  {
    id: "moonshotai/kimi-k2",
    name: "Kimi K2",
    description: "MoonshotAI's advanced model",
  },
  {
    id: "moonshotai/kimi-k2-thinking",
    name: "Kimi K2 Thinking",
    description: "Enhanced reasoning with chain-of-thought",
  },
];
