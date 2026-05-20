import {
  type LanguageModel,
  type ModelMessage,
  simulateReadableStream,
} from "ai";
import { getResponseChunksByPrompt } from "@/tests/prompts/utils";

const createMockModel = ({
  isReasoningEnabled = false,
}: {
  isReasoningEnabled?: boolean;
} = {}): LanguageModel => {
  return {
    specificationVersion: "v2",
    provider: "mock",
    modelId: "mock-model",
    defaultObjectGenerationMode: "tool",
    supportedUrls: [],
    supportsImageUrls: false,
    supportsStructuredOutputs: false,
    doGenerate: async () => ({
      rawCall: { rawPrompt: null, rawSettings: {} },
      finishReason: "stop",
      usage: { inputTokens: 10, outputTokens: 20, totalTokens: 30 },
      content: [{ type: "text", text: "Hello, world!" }],
      warnings: [],
    }),
    doStream: async ({ prompt }: { prompt: ModelMessage[] }) => ({
      stream: simulateReadableStream({
        chunkDelayInMs: 50,
        chunks: getResponseChunksByPrompt(prompt, isReasoningEnabled),
        initialDelayInMs: 100,
      }),
      rawCall: { rawPrompt: null, rawSettings: {} },
    }),
  } as unknown as LanguageModel;
};

export const chatModel = createMockModel();
export const reasoningModel = createMockModel({ isReasoningEnabled: true });
export const titleModel = createMockModel();
export const artifactModel = createMockModel();

export function getMockModel(modelId: string) {
  if (modelId.includes("reasoning")) {
    return reasoningModel;
  }

  return chatModel;
}
