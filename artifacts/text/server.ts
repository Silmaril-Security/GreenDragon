import { smoothStream, streamText } from "ai";
import { updateDocumentPrompt } from "@/lib/ai/prompts";
import { myProvider } from "@/lib/ai/providers";
import { createDocumentHandler } from "@/lib/artifacts/server";

export const textDocumentHandler = createDocumentHandler<"text">({
  kind: "text",
  onCreateDocument: async ({ title, dataStream }) => {
    let draftContent = "";

    try {
      const { fullStream } = streamText({
        model: myProvider.languageModel("artifact-model"),
        system:
          "Write about the given topic. Markdown is supported. Use headings wherever appropriate.",
        experimental_transform: smoothStream({ chunking: "word" }),
        prompt: title,
      });

      for await (const delta of fullStream) {
        const { type } = delta;

        if (type === "text-delta") {
          const { text } = delta;

          draftContent += text;

          dataStream.write({
            type: "data-textDelta",
            data: text,
            transient: true,
          });
        }
      }
    } catch (error) {
      console.error("Document content generation failed:", {
        error,
        title,
        model: "artifact-model",
        stack: error instanceof Error ? error.stack : undefined,
        message: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }

    if (!draftContent.trim()) {
      throw new Error("Document content generation returned empty result");
    }

    return draftContent;
  },
  onUpdateDocument: async ({ document, description, dataStream }) => {
    let draftContent = "";

    try {
      const { fullStream } = streamText({
        model: myProvider.languageModel("artifact-model"),
        system: updateDocumentPrompt(document.content, "text"),
        experimental_transform: smoothStream({ chunking: "word" }),
        prompt: description,
        providerOptions: {
          openai: {
            prediction: {
              type: "content",
              content: document.content,
            },
          },
        },
      });

      for await (const delta of fullStream) {
        const { type } = delta;

        if (type === "text-delta") {
          const { text } = delta;

          draftContent += text;

          dataStream.write({
            type: "data-textDelta",
            data: text,
            transient: true,
          });
        }
      }
    } catch (error) {
      console.error("Document update failed:", {
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
      throw new Error("Document update returned empty result");
    }

    return draftContent;
  },
});
