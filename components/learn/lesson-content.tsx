"use client";

import { useEffect, useMemo, useRef } from "react";
import { marked } from "marked";
import mermaid from "mermaid";

type LessonContentProps = {
  content: string;
};

// Initialize mermaid with dark theme support
mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  securityLevel: "loose",
  fontFamily: "inherit",
});

// Custom renderer to handle mermaid blocks
const renderer = new marked.Renderer();
const originalCodeRenderer = renderer.code.bind(renderer);

renderer.code = function ({ text, lang }: { text: string; lang?: string }) {
  if (lang === "mermaid") {
    return `<div class="mermaid-container my-6"><pre class="mermaid">${text}</pre></div>`;
  }
  return originalCodeRenderer({ text, lang });
};

marked.setOptions({ renderer });

export function LessonContent({ content }: LessonContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const html = useMemo(() => {
    return marked.parse(content, { async: false }) as string;
  }, [content]);

  // Render mermaid diagrams after HTML is inserted
  useEffect(() => {
    const renderMermaid = async () => {
      if (!containerRef.current) return;

      const mermaidElements =
        containerRef.current.querySelectorAll(".mermaid");
      if (mermaidElements.length === 0) return;

      // Reset mermaid to ensure clean rendering
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        securityLevel: "loose",
        fontFamily: "inherit",
        flowchart: {
          htmlLabels: true,
          curve: "basis",
        },
        sequence: {
          diagramMarginX: 50,
          diagramMarginY: 10,
          actorMargin: 50,
          width: 150,
          height: 65,
          boxMargin: 10,
          useMaxWidth: true,
        },
      });

      try {
        await mermaid.run({
          nodes: Array.from(mermaidElements) as HTMLElement[],
        });
      } catch (error) {
        console.error("Mermaid rendering error:", error);
      }
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(renderMermaid, 100);
    return () => clearTimeout(timeoutId);
  }, [html]);

  return (
    <article
      ref={containerRef}
      className="prose prose-neutral dark:prose-invert max-w-none
        prose-headings:font-semibold
        prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
        prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
        prose-p:text-muted-foreground prose-p:leading-relaxed
        prose-a:text-emerald-500 prose-a:no-underline hover:prose-a:underline
        prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-muted prose-pre:border prose-pre:rounded-lg prose-pre:overflow-x-auto
        prose-ul:text-muted-foreground prose-ol:text-muted-foreground
        prose-li:marker:text-muted-foreground
        prose-table:text-sm prose-table:block prose-table:overflow-x-auto prose-table:w-full
        prose-th:bg-muted prose-th:px-3 prose-th:py-2 prose-th:text-left prose-th:font-medium prose-th:whitespace-nowrap
        prose-td:px-3 prose-td:py-2 prose-td:border-t prose-td:whitespace-nowrap
        prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-500/10 prose-blockquote:not-italic prose-blockquote:rounded-r-lg prose-blockquote:py-2
        [&_.mermaid-container]:my-6 [&_.mermaid-container]:overflow-x-auto [&_.mermaid-container]:rounded-lg [&_.mermaid-container]:bg-muted/50 [&_.mermaid-container]:p-4
        [&_.mermaid]:flex [&_.mermaid]:justify-center
        [&_.mermaid_svg]:max-w-full [&_.mermaid_svg]:h-auto
      "
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
