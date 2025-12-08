import { ChallengesContent } from "@/components/challenges/challenges-content";
import { ChallengesHeader } from "@/components/challenges/challenges-header";

export default function ChallengesPage() {
  return (
    <div className="flex h-full flex-col overflow-auto">
      <ChallengesHeader />
      <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold md:text-3xl">Hacking Challenges</h1>
          <p className="mt-1 text-muted-foreground">
            Learn the rules. Exploit the system.
          </p>
        </div>
        <ChallengesContent />
      </div>
    </div>
  );
}
