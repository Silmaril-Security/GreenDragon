"use client";

import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { resetProgress } from "@/app/(chat)/profile/actions";
import { toast } from "@/components/toast";
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

type ProfileContentProps = {
  email: string;
  totalPoints: number;
  solvedCount: number;
  totalChallenges: number;
  rank: number | null;
};

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
    <div className="mx-auto w-full max-w-4xl px-4 py-6 md:px-6 md:py-8">
      <div className="mb-8">
        <h1 className="font-bold text-2xl md:text-3xl">Settings</h1>
      </div>

      <div className="flex flex-col gap-8">
        {/* Account Section */}
        <div>
          <h3 className="mb-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
            Account
          </h3>
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary font-medium text-lg text-primary-foreground uppercase">
                {email[0]}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium">{email}</div>
                <p className="mt-0.5 text-muted-foreground text-sm">
                  Signed in
                </p>
              </div>
              <Button
                onClick={() => signOut({ redirectTo: "/" })}
                variant="outline"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div>
          <h3 className="mb-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
            Stats
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-lg border bg-card p-6">
              <p className="text-muted-foreground text-sm">Total Points</p>
              <p className="mt-1 font-bold text-2xl">{totalPoints}</p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <p className="text-muted-foreground text-sm">Challenges Solved</p>
              <p className="mt-1 font-bold text-2xl">
                {solvedCount}
                <span className="font-normal text-base text-muted-foreground">
                  {" "}
                  / {totalChallenges}
                </span>
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <p className="text-muted-foreground text-sm">Leaderboard Rank</p>
              <p className="mt-1 font-bold text-2xl">
                {rank ? `#${rank}` : "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Appearance Section */}
        <div>
          <h3 className="mb-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
            Appearance
          </h3>
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Theme</p>
                <p className="mt-0.5 text-muted-foreground text-sm">
                  Choose your preferred appearance
                </p>
              </div>
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
          </div>
        </div>

        {/* Danger Zone */}
        <div>
          <h3 className="mb-3 font-medium text-destructive text-xs uppercase tracking-wider">
            Danger Zone
          </h3>
          <div className="rounded-lg border border-destructive bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Reset Progress</p>
                <p className="mt-0.5 text-muted-foreground text-sm">
                  Clear all your challenge progress and points
                </p>
              </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
