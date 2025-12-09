"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { resetProgress } from "@/app/(chat)/profile/actions";
import { toast } from "@/components/toast";

interface ProfileContentProps {
  email: string;
  totalPoints: number;
  solvedCount: number;
  totalChallenges: number;
  rank: number | null;
}

export function ProfileContent({
  email,
  totalPoints,
  solvedCount,
  totalChallenges,
  rank,
}: ProfileContentProps) {
  const [isResetting, setIsResetting] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  async function handleReset() {
    setIsResetting(true);
    try {
      await resetProgress();
      toast({ type: "success", description: "Progress reset successfully" });
    } catch {
      toast({ type: "error", description: "Failed to reset progress" });
    }
    setIsResetting(false);
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold">Settings</h1>

      {/* Account Section */}
      <section className="mb-6 rounded-lg border bg-card">
        <div className="border-b px-4 py-2">
          <h2 className="text-xs font-medium tracking-wider text-muted-foreground">
            Account
          </h2>
        </div>
        <div className="divide-y">
          <div className="flex items-center gap-3 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium uppercase text-primary-foreground">
              {email[0]}
            </div>
            <div className="min-w-0">
              <div className="truncate font-medium">{email}</div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 p-4">
            <span className="text-muted-foreground">Sign Out</span>
            <Button onClick={() => signOut({ redirectTo: "/" })} variant="outline">
              Sign Out
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-6 rounded-lg border bg-card">
        <div className="border-b px-4 py-2">
          <h2 className="text-xs font-medium tracking-wider text-muted-foreground">
            Stats
          </h2>
        </div>
        <div className="divide-y">
          <div className="flex justify-between p-4">
            <span className="text-muted-foreground">Total Points</span>
            <span className="font-medium">{totalPoints}</span>
          </div>
          <div className="flex justify-between p-4">
            <span className="text-muted-foreground">Challenges Solved</span>
            <span className="font-medium">
              {solvedCount} of {totalChallenges}
            </span>
          </div>
          <div className="flex justify-between p-4">
            <span className="text-muted-foreground">Leaderboard Rank</span>
            <span className="font-medium">{rank ? `#${rank}` : "—"}</span>
          </div>
        </div>
      </section>

      {/* Appearance Section */}
      <section className="mb-6 rounded-lg border bg-card">
        <div className="border-b px-4 py-2">
          <h2 className="text-xs font-medium tracking-wider text-muted-foreground">
            Appearance
          </h2>
        </div>
        <div className="flex items-center justify-between p-4">
          <span className="text-muted-foreground">Theme</span>
          <div className="flex gap-2">
            <Button
              onClick={() => setTheme("light")}
              size="sm"
              variant={resolvedTheme === "light" ? "default" : "outline"}
            >
              Light
            </Button>
            <Button
              onClick={() => setTheme("dark")}
              size="sm"
              variant={resolvedTheme === "dark" ? "default" : "outline"}
            >
              Dark
            </Button>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="rounded-lg border border-destructive bg-card">
        <div className="border-b border-destructive px-4 py-2">
          <h2 className="text-xs font-medium tracking-wider text-destructive">
            Danger Zone
          </h2>
        </div>
        <div className="flex items-center justify-between gap-4 p-4">
          <span className="text-muted-foreground">Reset Progress</span>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button disabled={isResetting} variant="destructive">
                {isResetting ? "Resetting..." : "Reset"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset Progress?</AlertDialogTitle>
                <AlertDialogDescription>
                  This cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={handleReset}
                >
                  Reset Progress
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>
    </div>
  );
}
