-- Add totalPoints and solvedCount columns to User table
DO $$ BEGIN
  ALTER TABLE "User" ADD COLUMN "totalPoints" integer DEFAULT 0 NOT NULL;
EXCEPTION
  WHEN duplicate_column THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
  ALTER TABLE "User" ADD COLUMN "solvedCount" integer DEFAULT 0 NOT NULL;
EXCEPTION
  WHEN duplicate_column THEN null;
END $$;
--> statement-breakpoint
-- Create Challenge table
CREATE TABLE IF NOT EXISTS "Challenge" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(64) NOT NULL,
	"title" varchar(128) NOT NULL,
	"description" text NOT NULL,
	"category" varchar(32) NOT NULL,
	"difficulty" varchar(16) NOT NULL,
	"points" integer NOT NULL,
	"successType" varchar(32) NOT NULL,
	"successValue" text NOT NULL,
	"systemPrompt" text,
	"sortOrder" integer DEFAULT 0 NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Challenge_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
-- Create ChallengeProgress table
CREATE TABLE IF NOT EXISTS "ChallengeProgress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"challengeId" uuid NOT NULL,
	"solvedAt" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "ChallengeProgress_userId_challengeId_unique" UNIQUE("userId","challengeId")
);
--> statement-breakpoint
-- Add foreign keys for ChallengeProgress
DO $$ BEGIN
 ALTER TABLE "ChallengeProgress" ADD CONSTRAINT "ChallengeProgress_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ChallengeProgress" ADD CONSTRAINT "ChallengeProgress_challengeId_Challenge_id_fk" FOREIGN KEY ("challengeId") REFERENCES "public"."Challenge"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
-- Create indexes
CREATE INDEX IF NOT EXISTS "cp_user_idx" ON "ChallengeProgress" USING btree ("userId");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_leaderboard_idx" ON "User" USING btree ("totalPoints","solvedCount");
