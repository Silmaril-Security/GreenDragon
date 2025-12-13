"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function GuestBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return null;
  }

  return (
    <div className="fixed right-4 bottom-4 left-4 z-50 sm:left-auto">
      <div className="flex items-center gap-3 rounded-lg border bg-background px-4 py-2 shadow-lg">
        <p className="text-muted-foreground text-sm">
          Playing as guest.{" "}
          <Link
            className="font-medium text-foreground underline underline-offset-4 hover:no-underline"
            href="/sign-up"
          >
            Sign up
          </Link>{" "}
          to claim your progress.
        </p>
        <Button
          className="size-6 shrink-0"
          onClick={() => setDismissed(true)}
          size="icon"
          variant="ghost"
        >
          <X className="size-3" />
        </Button>
      </div>
    </div>
  );
}
