ALTER TABLE "ChallengeProgress" DROP CONSTRAINT "ChallengeProgress_userId_challengeId_unique";--> statement-breakpoint
ALTER TABLE "ChallengeProgress" ADD COLUMN "modelId" varchar(128) NOT NULL;--> statement-breakpoint
ALTER TABLE "ChallengeProgress" ADD COLUMN "earnedPoints" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "ChallengeProgress" ADD CONSTRAINT "ChallengeProgress_userId_challengeId_modelId_unique" UNIQUE("userId","challengeId","modelId");