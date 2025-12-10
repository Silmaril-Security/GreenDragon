"use client";

import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function GuestBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-4 right-4 left-4 z-50 sm:left-auto">
      <div className="flex items-center gap-3 rounded-lg border bg-background px-4 py-2 shadow-lg">
        <p className="text-sm text-muted-foreground">
          Playing as guest.{" "}
          <Link href="/sign-up" className="font-medium text-foreground underline underline-offset-4 hover:no-underline">
            Sign up
          </Link>{" "}
          to claim your progress.
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="size-6 shrink-0"
          onClick={() => setDismissed(true)}
        >
          <X className="size-3" />
        </Button>
      </div>
    </div>
  );
}
