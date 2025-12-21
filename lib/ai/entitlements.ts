import type { UserType } from "@/app/(auth)/auth";
import type { ChatModel } from "./models";

type Entitlements = {
  maxMessagesPerDay: number;
  availableChatModelIds: ChatModel["id"][];
};

const allModelIds: ChatModel["id"][] = [
  "anthropic/claude-opus-4.5",
  "anthropic/claude-sonnet-4.5",
  "anthropic/claude-haiku-4.5",
  "openai/gpt-5",
  "openai/gpt-5-mini",
  "openai/gpt-4.1",
  "google/gemini-3-pro-preview",
  "google/gemini-2.5-pro",
  "google/gemini-2.5-flash",
  "deepseek/deepseek-v3.2",
  "deepseek/deepseek-r1",
  "alibaba/qwen3-max",
  "moonshotai/kimi-k2",
  "moonshotai/kimi-k2-thinking",
  "xai/grok-4.1-fast-non-reasoning",
];

export const entitlementsByUserType: Record<UserType, Entitlements> = {
  /*
   * For users without an account
   */
  guest: {
    maxMessagesPerDay: 20,
    availableChatModelIds: allModelIds,
  },

  /*
   * For users with an account
   */
  regular: {
    maxMessagesPerDay: 100,
    availableChatModelIds: allModelIds,
  },

  /*
   * TODO: For users with an account and a paid membership
   */
};
