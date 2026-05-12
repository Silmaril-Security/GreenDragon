"use client";

import katex from "katex";
import { marked } from "marked";
import mermaid from "mermaid";
import { useEffect, useMemo, useRef } from "react";
import "katex/dist/katex.min.css";
import { codeToHtml } from "shiki";

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

// Custom renderer - code blocks get placeholders for async shiki highlighting
const renderer = new marked.Renderer();

renderer.code = ({ text, lang }: { text: string; lang?: string }) => {
  // Handle mermaid blocks separately
  if (lang === "mermaid") {
    return `<div class="mermaid-container my-6"><pre class="mermaid">${text}</pre></div>`;
  }

  // Escape HTML entities for display
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  // Language label
  const langLabel =
    lang && lang !== "plaintext"
      ? `<span class="code-language-label">${lang}</span>`
      : "";

  return `<div class="code-block-wrapper">${langLabel}<pre class="shiki-code" data-lang="${lang || "text"}"><code>${escaped}</code></pre></div>`;
};

marked.setOptions({ renderer });

// Render KaTeX math expressions in HTML
function renderMathInHtml(html: string): string {
  // First, render display math ($$...$$)
  let renderedHtml = html.replace(/\$\$([^$]+)\$\$/g, (_, tex) => {
    try {
      return katex.renderToString(tex.trim(), {
        displayMode: true,
        throwOnError: false,
      });
    } catch {
      return `<span class="katex-error">${tex}</span>`;
    }
  });

  // Then, render inline math ($...$)
  // Be careful not to match already-rendered katex or escaped dollars
  renderedHtml = renderedHtml.replace(/\$([^$\n]+)\$/g, (_, tex) => {
    try {
      return katex.renderToString(tex.trim(), {
        displayMode: false,
        throwOnError: false,
      });
    } catch {
      return `<span class="katex-error">${tex}</span>`;
    }
  });

  return renderedHtml;
}

export function LessonContent({ content }: LessonContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const html = useMemo(() => {
    const parsedHtml = marked.parse(content, { async: false }) as string;
    return renderMathInHtml(parsedHtml);
  }, [content]);

  // Apply Shiki syntax highlighting to code blocks
  useEffect(() => {
    const highlightCode = async () => {
      if (!containerRef.current) {
        return;
      }

      const codeBlocks = containerRef.current.querySelectorAll(".shiki-code");
      if (codeBlocks.length === 0) {
        return;
      }

      // Check if user prefers dark mode
      const isDark = document.documentElement.classList.contains("dark");

      for (const pre of Array.from(codeBlocks)) {
        const lang = pre.getAttribute("data-lang") || "text";
        const codeEl = pre.querySelector("code");
        if (!codeEl) {
          continue;
        }

        // Get the text content (already unescaped by the browser)
        const code = codeEl.textContent || "";

        try {
          // Use a single theme based on current mode
          const highlighted = await codeToHtml(code, {
            lang,
            theme: isDark ? "one-dark-pro" : "one-light",
          });

          // Create a temporary container to parse the HTML
          const temp = document.createElement("div");
          temp.innerHTML = highlighted;
          const shikiPre = temp.querySelector("pre");

          if (shikiPre) {
            // Replace the pre element content and styles
            pre.className = `shiki ${shikiPre.className}`;
            pre.innerHTML = shikiPre.innerHTML;
            pre.setAttribute("style", shikiPre.getAttribute("style") || "");
          }
        } catch (error) {
          console.error(`Shiki highlighting error for ${lang}:`, error);
        }
      }
    };

    highlightCode();
  }, []);

  // Render mermaid diagrams after HTML is inserted
  useEffect(() => {
    const renderMermaid = async () => {
      if (!containerRef.current) {
        return;
      }

      const mermaidElements = containerRef.current.querySelectorAll(".mermaid");
      if (mermaidElements.length === 0) {
        return;
      }

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
  }, []);

  return (
    <article
      className="prose prose-neutral dark:prose-invert [&_.code-block-wrapper_pre]:!m-0 [&_.code-block-wrapper_pre]:!p-4 [&_.code-block-wrapper_pre]:!bg-transparent [&_.code-block-wrapper_pre]:!border-0 [&_.code-block-wrapper_code]:!bg-transparent [&_.code-block-wrapper_code]:!p-0 prose-h2:mt-8 prose-h3:mt-6 prose-h2:mb-4 prose-h3:mb-3 prose-table:block prose-table:w-full max-w-none prose-pre:overflow-x-auto prose-table:overflow-x-auto prose-td:whitespace-nowrap prose-th:whitespace-nowrap prose-code:rounded prose-pre:rounded-lg prose-blockquote:rounded-r-lg prose-pre:border prose-blockquote:border-emerald-500 prose-td:border-t prose-blockquote:bg-emerald-500/10 prose-code:bg-muted prose-pre:bg-muted prose-th:bg-muted prose-code:px-1.5 prose-td:px-3 prose-th:px-3 prose-blockquote:py-2 prose-code:py-0.5 prose-td:py-2 prose-th:py-2 prose-th:text-left prose-headings:font-semibold prose-th:font-medium prose-a:text-emerald-500 prose-code:text-sm prose-h2:text-xl prose-h3:text-lg prose-ol:text-muted-foreground prose-p:text-muted-foreground prose-table:text-sm prose-ul:text-muted-foreground prose-blockquote:not-italic prose-p:leading-relaxed prose-a:no-underline prose-li:marker:text-muted-foreground prose-code:before:content-none prose-code:after:content-none hover:prose-a:underline [&_.code-block-wrapper]:relative [&_.code-block-wrapper]:my-4 [&_.code-block-wrapper]:overflow-hidden [&_.code-block-wrapper]:rounded-md [&_.code-block-wrapper]:border [&_.code-block-wrapper]:bg-background [&_.code-block-wrapper_code]:font-mono [&_.code-block-wrapper_code]:text-sm [&_.code-language-label]:absolute [&_.code-language-label]:top-2 [&_.code-language-label]:right-3 [&_.code-language-label]:z-10 [&_.code-language-label]:font-mono [&_.code-language-label]:text-muted-foreground/70 [&_.code-language-label]:text-xs [&_.code-language-label]:uppercase [&_.code-language-label]:tracking-wide [&_.katex-display]:my-6 [&_.katex-display]:overflow-x-auto [&_.katex-display]:py-2 [&_.katex]:text-[1.1em] [&_.katex]:text-foreground [&_.mermaid-container]:my-6 [&_.mermaid-container]:overflow-x-auto [&_.mermaid-container]:rounded-lg [&_.mermaid-container]:bg-muted/50 [&_.mermaid-container]:p-4 [&_.mermaid]:flex [&_.mermaid]:justify-center [&_.mermaid_svg]:h-auto [&_.mermaid_svg]:max-w-full [&_.shiki]:overflow-x-auto"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Lesson HTML is generated from bundled course markdown, then enhanced for KaTeX, Shiki, and Mermaid.
      dangerouslySetInnerHTML={{ __html: html }}
      ref={containerRef}
    />
  );
}
