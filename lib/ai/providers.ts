import { gateway } from "@ai-sdk/gateway";
import type { LanguageModel } from "ai";
import { isTestEnvironment } from "../constants";

/**
 * Get a language model by its ID.
 * In production, uses the Vercel AI Gateway.
 * In test environment, returns a mock model.
 */
export function getLanguageModel(modelId: string): LanguageModel {
  if (isTestEnvironment) {
    const { getMockModel } = require("./models.test");
    return getMockModel(modelId);
  }
  return gateway.languageModel(modelId);
}
