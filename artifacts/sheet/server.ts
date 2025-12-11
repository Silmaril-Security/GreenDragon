import { streamObject } from "ai";
import { z } from "zod";
import { sheetPrompt, updateDocumentPrompt } from "@/lib/ai/prompts";
import { myProvider } from "@/lib/ai/providers";
import { createDocumentHandler } from "@/lib/artifacts/server";

export const sheetDocumentHandler = createDocumentHandler<"sheet">({
  kind: "sheet",
  onCreateDocument: async ({ title, dataStream }) => {
    let draftContent = "";

    try {
      const { fullStream } = streamObject({
        model: myProvider.languageModel("artifact-model"),
        system: sheetPrompt,
        prompt: title,
        schema: z.object({
          csv: z.string().describe("CSV data"),
        }),
      });

      for await (const delta of fullStream) {
        const { type } = delta;

        if (type === "object") {
          const { object } = delta;
          const { csv } = object;

          if (csv) {
            dataStream.write({
              type: "data-sheetDelta",
              data: csv,
              transient: true,
            });

            draftContent = csv;
          }
        }
      }
    } catch (error) {
      console.error("Sheet content generation failed:", {
        error,
        title,
        model: "artifact-model",
        stack: error instanceof Error ? error.stack : undefined,
        message: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }

    if (!draftContent.trim()) {
      throw new Error("Sheet content generation returned empty result");
    }

    dataStream.write({
      type: "data-sheetDelta",
      data: draftContent,
      transient: true,
    });

    return draftContent;
  },
  onUpdateDocument: async ({ document, description, dataStream }) => {
    let draftContent = "";

    try {
      const { fullStream } = streamObject({
        model: myProvider.languageModel("artifact-model"),
        system: updateDocumentPrompt(document.content, "sheet"),
        prompt: description,
        schema: z.object({
          csv: z.string(),
        }),
      });

      for await (const delta of fullStream) {
        const { type } = delta;

        if (type === "object") {
          const { object } = delta;
          const { csv } = object;

          if (csv) {
            dataStream.write({
              type: "data-sheetDelta",
              data: csv,
              transient: true,
            });

            draftContent = csv;
          }
        }
      }
    } catch (error) {
      console.error("Sheet update failed:", {
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
      throw new Error("Sheet update returned empty result");
    }

    return draftContent;
  },
});
