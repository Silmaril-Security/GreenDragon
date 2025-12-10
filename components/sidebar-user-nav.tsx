"use client";

import Link from "next/link";
import type { User } from "next-auth";
import { useSession } from "next-auth/react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LoaderIcon } from "./icons";

export function SidebarUserNav({ user }: { user: User }) {
  const { data, status } = useSession();

  const isGuest = data?.user?.type === "guest";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {status === "loading" ? (
          <SidebarMenuButton className="h-10 justify-between bg-background">
            <div className="flex flex-row gap-2">
              <div className="size-6 animate-pulse rounded-full bg-zinc-500/30" />
              <span className="animate-pulse rounded-md bg-zinc-500/30 text-transparent">
                Loading auth status
              </span>
            </div>
            <div className="animate-spin text-zinc-500">
              <LoaderIcon />
            </div>
          </SidebarMenuButton>
        ) : (
          <SidebarMenuButton
            asChild
            className="h-10 bg-background"
            data-testid="user-nav-button"
          >
            <Link href="/profile">
              <div className="flex size-6 shrink-0 items-center justify-center rounded-full text-xs uppercase ring-1 ring-border">
                {(isGuest ? "G" : user?.email?.[0]) ?? "U"}
              </div>
              <span className="truncate" data-testid="user-email">
                {isGuest ? "Guest" : user?.email}
              </span>
            </Link>
          </SidebarMenuButton>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
