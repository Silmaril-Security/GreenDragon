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
import { BookOpen, Bug, Medal, SquarePen, Users } from "lucide-react";

export function AppSidebar({ user }: { user: User | undefined }) {
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar className="group-data-[side=left]:border-r-0">
        <SidebarHeader className="border-b border-border">
          <SidebarMenu>
            <Link
              className="flex flex-row items-center rounded-md p-2"
              href="/"
              onClick={() => {
                setOpenMobile(false);
              }}
            >
              <span className="flex cursor-pointer items-center gap-2 rounded-md px-2 hover:bg-muted">
                <span className="flex flex-col">
                  <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400 bg-clip-text font-semibold text-transparent text-xs uppercase tracking-widest dark:from-emerald-300 dark:via-emerald-400 dark:to-emerald-300">
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
          <SidebarGroup className="border-b border-border">
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
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/resources"
                    onClick={() => setOpenMobile(false)}
                  >
                    <BookOpen className="size-4" />
                    <span>Resources</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/community"
                    onClick={() => setOpenMobile(false)}
                  >
                    <Users className="size-4" />
                    <span>Community</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup className="border-b border-border !pt-1 !pb-2">
            <SidebarMenu className="gap-0">
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a
                    href="https://www.silmaril.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SilmarilIcon />
                    <span>About Silmaril</span>
                  </a>
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
