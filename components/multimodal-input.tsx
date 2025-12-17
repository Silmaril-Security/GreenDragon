"use client";

import type { UseChatHelpers } from "@ai-sdk/react";
import { Trigger } from "@radix-ui/react-select";
import type { UIMessage } from "ai";
import equal from "fast-deep-equal";
import { Terminal as TerminalIcon } from "lucide-react";
import Link from "next/link";
import {
  type ChangeEvent,
  type Dispatch,
  memo,
  type SetStateAction,
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { useLocalStorage, useWindowSize } from "usehooks-ts";
import { saveChatModelAsCookie } from "@/app/(chat)/actions";
import { SelectItem } from "@/components/ui/select";
import { useActiveChallenge } from "@/contexts/active-challenge-context";
import { useChallenges } from "@/hooks/use-challenges";
import { chatModels } from "@/lib/ai/models";
import type { Category, Difficulty } from "@/lib/challenges/data";
import type { Challenge } from "@/lib/db/schema";
import type { Attachment, ChatMessage } from "@/lib/types";
import type { AppUsage } from "@/lib/usage";
import { cn } from "@/lib/utils";
import { ActiveChallengeBadge } from "./active-challenge-badge";
import { CommandPopover } from "./command-popover";
import { Context } from "./elements/context";
import {
  PromptInput,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "./elements/prompt-input";
import {
  ArrowUpIcon,
  ChevronDownIcon,
  CpuIcon,
  PaperclipIcon,
  StopIcon,
} from "./icons";
import { PreviewAttachment } from "./preview-attachment";
import { Button } from "./ui/button";
import type { VisibilityType } from "./visibility-selector";

// Regex patterns for command parsing
const ACTIVATE_WITH_QUERY_REGEX = /^\/activate\s+(.*)/i;
const ACTIVATE_EXACT_REGEX = /^\/activate$/i;

function PureMultimodalInput({
  chatId,
  input,
  setInput,
  status,
  stop,
  attachments,
  setAttachments,
  messages: _messages,
  setMessages,
  sendMessage,
  className,
  selectedVisibilityType: _selectedVisibilityType,
  selectedModelId,
  onModelChange,
  usage,
  generationError,
  onDismissError,
}: {
  chatId: string;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  status: UseChatHelpers<ChatMessage>["status"];
  stop: () => void;
  attachments: Attachment[];
  setAttachments: Dispatch<SetStateAction<Attachment[]>>;
  messages: UIMessage[];
  setMessages: UseChatHelpers<ChatMessage>["setMessages"];
  sendMessage: UseChatHelpers<ChatMessage>["sendMessage"];
  className?: string;
  selectedVisibilityType: VisibilityType;
  selectedModelId: string;
  onModelChange?: (modelId: string) => void;
  usage?: AppUsage;
  generationError?: string | null;
  onDismissError?: () => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { width } = useWindowSize();

  // Active challenge and command popover state
  const { activeChallenge, setActiveChallenge, clearActiveChallenge } =
    useActiveChallenge();
  const { challenges } = useChallenges();
  const [showCommandPopover, setShowCommandPopover] = useState(false);

  // Parse slash command from input
  const commandMatch = useMemo(() => {
    // Any input starting with / triggers command mode
    if (!input.startsWith("/")) {
      return null;
    }

    // Match /activate with optional search query
    const fullMatch = input.match(ACTIVATE_WITH_QUERY_REGEX);
    if (fullMatch) {
      return { command: "activate", query: fullMatch[1] || "" };
    }

    // Match exact /activate (no space yet)
    if (ACTIVATE_EXACT_REGEX.test(input)) {
      return { command: "activate", query: "" };
    }

    // For anything else starting with /, treat the text after / as a search query
    // This allows typing /ad to search for "ad" in challenge names
    const searchQuery = input.slice(1); // Remove the leading /
    return { command: "search", query: searchQuery };
  }, [input]);

  // Show command popover when typing /activate
  useEffect(() => {
    setShowCommandPopover(!!commandMatch);
  }, [commandMatch]);

  const handleSelectChallenge = useCallback(
    (challenge: Challenge) => {
      setActiveChallenge({
        id: challenge.id,
        title: challenge.title,
        description: challenge.description,
        category: challenge.category as Category,
        difficulty: challenge.difficulty as Difficulty,
        points: challenge.points,
        status: "not-started",
      });
      setInput("");
      setShowCommandPopover(false);
    },
    [setActiveChallenge, setInput]
  );

  const adjustHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "44px";
    }
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight();
    }
  }, [adjustHeight]);

  const resetHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "44px";
    }
  }, []);

  const [localStorageInput, setLocalStorageInput] = useLocalStorage(
    "input",
    ""
  );

  useEffect(() => {
    if (textareaRef.current) {
      const domValue = textareaRef.current.value;
      // Prefer DOM value over localStorage to handle hydration
      const finalValue = domValue || localStorageInput || "";
      setInput(finalValue);
      adjustHeight();
    }
    // Only run once after hydration
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adjustHeight, localStorageInput, setInput]);

  useEffect(() => {
    setLocalStorageInput(input);
  }, [input, setLocalStorageInput]);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadQueue, setUploadQueue] = useState<string[]>([]);

  const submitForm = useCallback(() => {
    // Don't submit if it's a command
    if (commandMatch) {
      return;
    }

    window.history.pushState({}, "", `/chat/${chatId}`);

    onDismissError?.();

    sendMessage({
      role: "user",
      parts: [
        ...attachments.map((attachment) => ({
          type: "file" as const,
          url: attachment.url,
          name: attachment.name,
          mediaType: attachment.contentType,
        })),
        {
          type: "text",
          text: input,
        },
      ],
    });

    setAttachments([]);
    setLocalStorageInput("");
    resetHeight();
    setInput("");

    if (width && width > 768) {
      textareaRef.current?.focus();
    }
  }, [
    input,
    setInput,
    attachments,
    sendMessage,
    setAttachments,
    setLocalStorageInput,
    width,
    chatId,
    resetHeight,
    onDismissError,
    commandMatch,
  ]);

  const uploadFile = useCallback(async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/files/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const { url, pathname, contentType } = data;

        return {
          url,
          name: pathname,
          contentType,
        };
      }
      const { error } = await response.json();
      toast.error(error);
    } catch (_error) {
      toast.error("Failed to upload file, please try again!");
    }
  }, []);

  const contextProps = useMemo(
    () => ({
      usage,
    }),
    [usage]
  );

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);

      setUploadQueue(files.map((file) => file.name));

      try {
        const uploadPromises = files.map((file) => uploadFile(file));
        const uploadedAttachments = await Promise.all(uploadPromises);
        const successfullyUploadedAttachments = uploadedAttachments.filter(
          (attachment) => attachment !== undefined
        );

        setAttachments((currentAttachments) => [
          ...currentAttachments,
          ...successfullyUploadedAttachments,
        ]);
      } catch (error) {
        console.error("Error uploading files!", error);
      } finally {
        setUploadQueue([]);
      }
    },
    [setAttachments, uploadFile]
  );

  const handlePaste = useCallback(
    async (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (!items) {
        return;
      }

      const imageItems = Array.from(items).filter((item) =>
        item.type.startsWith("image/")
      );

      if (imageItems.length === 0) {
        return;
      }

      // Prevent default paste behavior for images
      event.preventDefault();

      setUploadQueue((prev) => [...prev, "Pasted image"]);

      try {
        const uploadPromises = imageItems
          .map((item) => item.getAsFile())
          .filter((file): file is File => file !== null)
          .map((file) => uploadFile(file));

        const uploadedAttachments = await Promise.all(uploadPromises);
        const successfullyUploadedAttachments = uploadedAttachments.filter(
          (attachment) =>
            attachment !== undefined &&
            attachment.url !== undefined &&
            attachment.contentType !== undefined
        );

        setAttachments((curr) => [
          ...curr,
          ...(successfullyUploadedAttachments as Attachment[]),
        ]);
      } catch (error) {
        console.error("Error uploading pasted images:", error);
        toast.error("Failed to upload pasted image(s)");
      } finally {
        setUploadQueue([]);
      }
    },
    [setAttachments, uploadFile]
  );

  // Add paste event listener to textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }

    textarea.addEventListener("paste", handlePaste);
    return () => textarea.removeEventListener("paste", handlePaste);
  }, [handlePaste]);

  return (
    <div className={cn("relative flex w-full flex-col gap-4", className)}>
      {/* Header row with challenge info and Challenges link - invisible when popover is open */}
      <div
        className={cn(
          "flex items-center justify-between pt-2",
          showCommandPopover && "invisible"
        )}
      >
        {/* Active challenge badge or instruction prompt */}
        {activeChallenge ? (
          <ActiveChallengeBadge
            difficulty={activeChallenge.difficulty}
            onClear={clearActiveChallenge}
            points={activeChallenge.points}
            title={activeChallenge.title}
          />
        ) : (
          <div className="flex items-center gap-2 text-muted-foreground">
            <TerminalIcon className="size-4 text-emerald-500 dark:text-emerald-400" />
            <span className="text-sm">
              Type{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400 bg-clip-text font-mono font-semibold text-transparent dark:from-emerald-300 dark:via-emerald-400 dark:to-emerald-300">
                /
              </span>{" "}
              to select a challenge
            </span>
          </div>
        )}

        {/* Challenges link */}
        <Link
          className="text-muted-foreground text-xs transition-colors hover:text-foreground"
          href="/challenges"
        >
          Challenges
        </Link>
      </div>

      {/* Command popover */}
      <CommandPopover
        anchorRef={textareaRef}
        challenges={challenges}
        onClose={() => {
          setShowCommandPopover(false);
          setInput("");
        }}
        onSelect={handleSelectChallenge}
        open={showCommandPopover}
        searchQuery={commandMatch?.query || ""}
      />

      <input
        className="-top-4 -left-4 pointer-events-none fixed size-0.5 opacity-0"
        multiple
        onChange={handleFileChange}
        ref={fileInputRef}
        tabIndex={-1}
        type="file"
      />

      <PromptInput
        className="rounded-xl border border-border bg-background p-3 shadow-xs transition-all duration-200 focus-within:border-border hover:border-muted-foreground/50"
        onSubmit={(event) => {
          event.preventDefault();
          if (status !== "ready" && !generationError) {
            toast.error("Please wait for the model to finish its response!");
          } else {
            submitForm();
          }
        }}
      >
        {(attachments.length > 0 || uploadQueue.length > 0) && (
          <div
            className="flex flex-row items-end gap-2 overflow-x-scroll"
            data-testid="attachments-preview"
          >
            {attachments.map((attachment) => (
              <PreviewAttachment
                attachment={attachment}
                key={attachment.url}
                onRemove={() => {
                  setAttachments((currentAttachments) =>
                    currentAttachments.filter((a) => a.url !== attachment.url)
                  );
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
              />
            ))}

            {uploadQueue.map((filename) => (
              <PreviewAttachment
                attachment={{
                  url: "",
                  name: filename,
                  contentType: "",
                }}
                isUploading={true}
                key={filename}
              />
            ))}
          </div>
        )}
        <div className="flex flex-row items-start gap-1 sm:gap-2">
          <PromptInputTextarea
            autoFocus
            className="grow resize-none border-0! border-none! bg-transparent p-2 text-sm outline-none ring-0 [-ms-overflow-style:none] [scrollbar-width:none] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-scrollbar]:hidden"
            data-testid="multimodal-input"
            disableAutoResize={true}
            maxHeight={200}
            minHeight={44}
            onChange={handleInput}
            placeholder="Send a message..."
            ref={textareaRef}
            rows={1}
            value={input}
          />{" "}
          <Context {...contextProps} />
        </div>
        <PromptInputToolbar className="!border-top-0 border-t-0! p-0 shadow-none dark:border-0 dark:border-transparent!">
          <PromptInputTools className="gap-0 sm:gap-0.5">
            <AttachmentsButton
              fileInputRef={fileInputRef}
              generationError={generationError}
              selectedModelId={selectedModelId}
              status={status}
            />
            <ModelSelectorCompact
              onModelChange={onModelChange}
              selectedModelId={selectedModelId}
            />
          </PromptInputTools>

          {status === "submitted" ? (
            <StopButton setMessages={setMessages} stop={stop} />
          ) : (
            <PromptInputSubmit
              className="size-8 rounded-full bg-primary text-primary-foreground transition-colors duration-200 hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground"
              data-testid="send-button"
              disabled={!input.trim() || uploadQueue.length > 0}
              status={status}
            >
              <ArrowUpIcon size={14} />
            </PromptInputSubmit>
          )}
        </PromptInputToolbar>
      </PromptInput>
      <p className="text-center text-muted-foreground text-xs">
        Every solved challenge helps secure AI against real threats.
      </p>
    </div>
  );
}

export const MultimodalInput = memo(
  PureMultimodalInput,
  (prevProps, nextProps) => {
    if (prevProps.input !== nextProps.input) {
      return false;
    }
    if (prevProps.status !== nextProps.status) {
      return false;
    }
    if (!equal(prevProps.attachments, nextProps.attachments)) {
      return false;
    }
    if (prevProps.selectedVisibilityType !== nextProps.selectedVisibilityType) {
      return false;
    }
    if (prevProps.selectedModelId !== nextProps.selectedModelId) {
      return false;
    }

    return true;
  }
);

function PureAttachmentsButton({
  fileInputRef,
  status,
  selectedModelId,
  generationError,
}: {
  fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
  status: UseChatHelpers<ChatMessage>["status"];
  selectedModelId: string;
  generationError?: string | null;
}) {
  const isReasoningModel = selectedModelId === "chat-model-reasoning";

  return (
    <Button
      className="aspect-square h-8 rounded-lg p-1 transition-colors hover:bg-accent"
      data-testid="attachments-button"
      disabled={(status !== "ready" && !generationError) || isReasoningModel}
      onClick={(event) => {
        event.preventDefault();
        fileInputRef.current?.click();
      }}
      variant="ghost"
    >
      <PaperclipIcon size={14} style={{ width: 14, height: 14 }} />
    </Button>
  );
}

const AttachmentsButton = memo(PureAttachmentsButton);

function PureModelSelectorCompact({
  selectedModelId,
  onModelChange,
}: {
  selectedModelId: string;
  onModelChange?: (modelId: string) => void;
}) {
  const [optimisticModelId, setOptimisticModelId] = useState(selectedModelId);

  useEffect(() => {
    setOptimisticModelId(selectedModelId);
  }, [selectedModelId]);

  const selectedModel =
    chatModels.find((model) => model.id === optimisticModelId) ?? chatModels[0];

  return (
    <PromptInputModelSelect
      onValueChange={(modelName) => {
        const model = chatModels.find((m) => m.name === modelName);
        if (model) {
          setOptimisticModelId(model.id);
          onModelChange?.(model.id);
          startTransition(() => {
            saveChatModelAsCookie(model.id);
          });
        }
      }}
      value={selectedModel?.name}
    >
      <Trigger asChild>
        <Button className="h-8 px-2" variant="ghost">
          <CpuIcon size={16} />
          <span className="hidden font-medium text-xs sm:block">
            {selectedModel?.name ?? "Select Model"}
          </span>
          <ChevronDownIcon size={16} />
        </Button>
      </Trigger>
      <PromptInputModelSelectContent className="min-w-[260px] max-h-[50vh] p-0">
        <div className="flex flex-col gap-px">
          {chatModels.map((model, index) => {
            const provider = model.id.split("/")[0];
            const prevProvider =
              index > 0 ? chatModels[index - 1].id.split("/")[0] : null;
            const showDivider = prevProvider && provider !== prevProvider;

            return (
              <div key={model.id}>
                {showDivider && <div className="my-1 h-px bg-border" />}
                <SelectItem value={model.name}>
                  <div className="flex items-center gap-1.5 truncate font-medium text-xs">
                    {model.name}
                    {model.multiplier > 1 && (
                      <span className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 px-1.5 py-0.5 font-semibold text-[10px] text-amber-600 dark:from-amber-500/30 dark:to-yellow-500/30 dark:text-amber-400">
                        {model.multiplier}x
                      </span>
                    )}
                  </div>
                  <div className="mt-px truncate text-[10px] text-muted-foreground leading-tight">
                    {model.description}
                  </div>
                </SelectItem>
              </div>
            );
          })}
        </div>
      </PromptInputModelSelectContent>
    </PromptInputModelSelect>
  );
}

const ModelSelectorCompact = memo(PureModelSelectorCompact);

function PureStopButton({
  stop,
  setMessages,
}: {
  stop: () => void;
  setMessages: UseChatHelpers<ChatMessage>["setMessages"];
}) {
  return (
    <Button
      className="size-7 rounded-full bg-foreground p-1 text-background transition-colors duration-200 hover:bg-foreground/90 disabled:bg-muted disabled:text-muted-foreground"
      data-testid="stop-button"
      onClick={(event) => {
        event.preventDefault();
        stop();
        setMessages((messages) => messages);
      }}
    >
      <StopIcon size={14} />
    </Button>
  );
}

const StopButton = memo(PureStopButton);
