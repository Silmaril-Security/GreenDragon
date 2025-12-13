import { streamObject } from "ai";
import { z } from "zod";
import { codePrompt, updateDocumentPrompt } from "@/lib/ai/prompts";
import { getLanguageModel } from "@/lib/ai/providers";
import { createDocumentHandler } from "@/lib/artifacts/server";

export const codeDocumentHandler = createDocumentHandler<"code">({
  kind: "code",
  onCreateDocument: async ({ title, dataStream, modelId }) => {
    let draftContent = "";

    try {
      const { fullStream } = streamObject({
        model: getLanguageModel(modelId),
        system: codePrompt,
        prompt: title,
        schema: z.object({
          code: z.string(),
        }),
      });

      for await (const delta of fullStream) {
        const { type } = delta;

        if (type === "object") {
          const { object } = delta;
          const { code } = object;

          if (code) {
            dataStream.write({
              type: "data-codeDelta",
              data: code ?? "",
              transient: true,
            });

            draftContent = code;
          }
        }
      }
    } catch (error) {
      console.error("Code content generation failed:", {
        error,
        title,
        model: "artifact-model",
        stack: error instanceof Error ? error.stack : undefined,
        message: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }

    if (!draftContent.trim()) {
      throw new Error("Code content generation returned empty result");
    }

    return draftContent;
  },
  onUpdateDocument: async ({ document, description, dataStream, modelId }) => {
    let draftContent = "";

    try {
      const { fullStream } = streamObject({
        model: getLanguageModel(modelId),
        system: updateDocumentPrompt(document.content, "code"),
        prompt: description,
        schema: z.object({
          code: z.string(),
        }),
      });

      for await (const delta of fullStream) {
        const { type } = delta;

        if (type === "object") {
          const { object } = delta;
          const { code } = object;

          if (code) {
            dataStream.write({
              type: "data-codeDelta",
              data: code ?? "",
              transient: true,
            });

            draftContent = code;
          }
        }
      }
    } catch (error) {
      console.error("Code update failed:", {
        error,
        documentId: document.id,
        description,
        model: "artifact-model",
        stack: error instanceof Error ? error.stack : undefined,
        message: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }

    if (!draftContent.trim()) {
      throw new Error("Code update returned empty result");
    }

    return draftContent;
  },
});
