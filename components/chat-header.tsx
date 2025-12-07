"use client";

import { Link2, Linkedin } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { toast } from "sonner";
import { useCopyToClipboard, useWindowSize } from "usehooks-ts";
import { SidebarToggle } from "@/components/sidebar-toggle";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "./icons";
import { useSidebar } from "./ui/sidebar";
import { VisibilitySelector, type VisibilityType } from "./visibility-selector";

function PureChatHeader({
  chatId,
  selectedVisibilityType,
  isReadonly,
}: {
  chatId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
}) {
  const router = useRouter();
  const { open } = useSidebar();
  const { width: windowWidth } = useWindowSize();
  const [_, copyToClipboard] = useCopyToClipboard();
  const { resolvedTheme } = useTheme();

  return (
    <header className="sticky top-0 flex items-center gap-2 bg-background px-2 py-1.5 md:px-2">
      <SidebarToggle />

      {(!open || windowWidth < 768) && (
        <Button
          className="order-2 ml-auto h-8 px-2 md:order-1 md:ml-0 md:h-fit md:px-2"
          onClick={() => {
            router.push("/");
            router.refresh();
          }}
          variant="outline"
        >
          <PlusIcon />
          <span className="md:sr-only">New Chat</span>
        </Button>
      )}

      {!isReadonly && (
        <VisibilitySelector
          chatId={chatId}
          className="order-1 md:order-2"
          selectedVisibilityType={selectedVisibilityType}
        />
      )}

      <div className="order-3 flex items-center gap-1 md:ml-auto">
        <Button
          variant="ghost"
          className="h-8 p-1 md:h-fit md:p-2"
          onClick={async () => {
            await copyToClipboard(window.location.href);
            toast.success("Link copied to clipboard!");
          }}
        >
          <Link2 />
          <span className="sr-only">Copy link</span>
        </Button>
        <Button variant="ghost" className="h-8 p-1 md:h-fit md:p-2" asChild>
          <a
            href="https://www.linkedin.com/company/silmarilsecurity"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin />
            <span className="sr-only">LinkedIn</span>
          </a>
        </Button>
        <iframe
          src="https://ghbtns.com/github-btn.html?user=Silmaril-Security&repo=GreenDragon&type=star&count=true"
          frameBorder="0"
          scrolling="no"
          width="100"
          height="20"
          title="GitHub Stars"
          className={`hidden overflow-hidden md:block ${resolvedTheme === "dark" ? "invert" : ""}`}
        />
      </div>
    </header>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return (
    prevProps.chatId === nextProps.chatId &&
    prevProps.selectedVisibilityType === nextProps.selectedVisibilityType &&
    prevProps.isReadonly === nextProps.isReadonly
  );
});
