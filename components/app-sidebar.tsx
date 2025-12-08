"use client";

import Link from "next/link";
import type { User } from "next-auth";
import { SilmarilIcon } from "@/components/icons";
import { SidebarHistory } from "@/components/sidebar-history";
import { SidebarUserNav } from "@/components/sidebar-user-nav";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Bug, Medal, SquarePen } from "lucide-react";

export function AppSidebar({ user }: { user: User | undefined }) {
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar className="group-data-[side=left]:border-r-0">
        <SidebarHeader>
          <SidebarMenu>
            <Link
              className="flex flex-row items-center rounded-md border border-border p-2"
              href="/"
              onClick={() => {
                setOpenMobile(false);
              }}
            >
              <span className="flex cursor-pointer items-center gap-2 rounded-md px-2 hover:bg-muted">
                <SilmarilIcon />
                <span className="flex flex-col">
                  <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500 bg-clip-text font-semibold text-transparent text-xs uppercase tracking-widest dark:from-emerald-300 dark:via-teal-200 dark:to-sky-300">
                    Green Dragon
                  </span>
                  <span className="text-[10px] tracking-wider text-muted-foreground">
                    By Silmaril
                  </span>
                </span>
              </span>
            </Link>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/"
                    onClick={() => setOpenMobile(false)}
                  >
                    <SquarePen className="size-4" />
                    <span>New Chat</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/challenges"
                    onClick={() => setOpenMobile(false)}
                  >
                    <Bug className="size-4" />
                    <span>Challenges</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/leaderboard"
                    onClick={() => setOpenMobile(false)}
                  >
                    <Medal className="size-4" />
                    <span>Leaderboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarHistory user={user} />
        </SidebarContent>
        <SidebarFooter>{user && <SidebarUserNav user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
