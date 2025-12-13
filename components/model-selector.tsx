"use client";

import type { Session } from "next-auth";
import { startTransition, useMemo, useOptimistic, useState } from "react";
import { saveChatModelAsCookie } from "@/app/(chat)/actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { entitlementsByUserType } from "@/lib/ai/entitlements";
import { chatModels } from "@/lib/ai/models";
import { cn } from "@/lib/utils";
import { CheckCircleFillIcon, ChevronDownIcon } from "./icons";

export function ModelSelector({
  session,
  selectedModelId,
  className,
}: {
  session: Session;
  selectedModelId: string;
} & React.ComponentProps<typeof Button>) {
  const [open, setOpen] = useState(false);
  const [optimisticModelId, setOptimisticModelId] =
    useOptimistic(selectedModelId);

  const userType = session.user.type;
  const { availableChatModelIds } = entitlementsByUserType[userType];

  const availableChatModels = chatModels.filter((chatModel) =>
    availableChatModelIds.includes(chatModel.id)
  );

  const selectedChatModel = useMemo(
    () =>
      availableChatModels.find(
        (chatModel) => chatModel.id === optimisticModelId
      ) ?? availableChatModels[0],
    [optimisticModelId, availableChatModels]
  );

  return (
    <DropdownMenu onOpenChange={setOpen} open={open}>
      <DropdownMenuTrigger
        asChild
        className={cn(
          "w-fit data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
          className
        )}
      >
        <Button
          className="md:h-[34px] md:px-2"
          data-testid="model-selector"
          variant="outline"
        >
          {selectedChatModel?.name ?? "Select Model"}
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="min-w-[280px] max-w-[90vw] sm:min-w-[300px]"
      >
        {availableChatModels.map((chatModel, index) => {
          const { id } = chatModel;
          const provider = id.split("/")[0];
          const prevProvider =
            index > 0 ? availableChatModels[index - 1].id.split("/")[0] : null;
          const showDivider = prevProvider && provider !== prevProvider;

          return (
            <div key={id}>
              {showDivider && <DropdownMenuSeparator className="my-1" />}
              <DropdownMenuItem
                asChild
                data-active={id === optimisticModelId}
                data-testid={`model-selector-item-${id}`}
                onSelect={() => {
                  setOpen(false);

                  startTransition(() => {
                    setOptimisticModelId(id);
                    saveChatModelAsCookie(id);
                  });
                }}
              >
                <button
                  className="group/item flex w-full flex-row items-center justify-between gap-2 sm:gap-4"
                  type="button"
                >
                  <div className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-2 text-sm sm:text-base">
                      {chatModel.name}
                      {chatModel.multiplier > 1 && (
                        <span className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 px-2 py-0.5 font-semibold text-amber-600 text-xs dark:from-amber-500/30 dark:to-yellow-500/30 dark:text-amber-400">
                          {chatModel.multiplier}x pts
                        </span>
                      )}
                    </div>
                    <div className="line-clamp-2 text-muted-foreground text-xs">
                      {chatModel.description}
                    </div>
                  </div>

                  <div className="shrink-0 text-foreground opacity-0 group-data-[active=true]/item:opacity-100 dark:text-foreground">
                    <CheckCircleFillIcon />
                  </div>
                </button>
              </DropdownMenuItem>
            </div>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
