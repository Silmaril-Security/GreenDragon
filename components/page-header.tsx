"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { SidebarToggle } from "@/components/sidebar-toggle";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";

export function PageHeader() {
  const { data: session } = useSession();
  const isGuest = session?.user?.type === "guest";

  return (
    <header className="sticky top-0 z-10 flex items-center gap-2 bg-background px-2 py-1.5 md:px-2">
      <SidebarToggle />

      <div className="ml-auto flex items-center gap-2">
        {isGuest && (
          <Button asChild size="sm">
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        )}
        <SocialLinks />
      </div>
    </header>
  );
}
