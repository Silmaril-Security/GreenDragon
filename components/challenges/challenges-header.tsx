"use client";

import { SidebarToggle } from "@/components/sidebar-toggle";
import { SocialLinks } from "@/components/social-links";

export function ChallengesHeader() {
  return (
    <header className="sticky top-0 flex items-center gap-2 bg-background px-2 py-1.5 md:px-2">
      <SidebarToggle />

      <div className="md:ml-auto">
        <SocialLinks />
      </div>
    </header>
  );
}
