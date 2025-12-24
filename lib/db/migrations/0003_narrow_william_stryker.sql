CREATE TABLE "Course" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(64) NOT NULL,
	"title" varchar(128) NOT NULL,
	"subtitle" varchar(256),
	"description" text NOT NULL,
	"icon" varchar(64),
	"difficulty" varchar(16),
	"tags" text[],
	"isFeatured" boolean DEFAULT false NOT NULL,
	"sortOrder" integer DEFAULT 0 NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Course_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "Lesson" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"moduleId" uuid NOT NULL,
	"slug" varchar(64) NOT NULL,
	"title" varchar(128) NOT NULL,
	"content" text NOT NULL,
	"estimatedMinutes" integer DEFAULT 5,
	"sortOrder" integer DEFAULT 0 NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Lesson_moduleId_slug_unique" UNIQUE("moduleId","slug")
);
--> statement-breakpoint
CREATE TABLE "Module" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"courseId" uuid NOT NULL,
	"slug" varchar(64) NOT NULL,
	"title" varchar(128) NOT NULL,
	"description" text,
	"difficulty" varchar(16),
	"sortOrder" integer DEFAULT 0 NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Module_courseId_slug_unique" UNIQUE("courseId","slug")
);
--> statement-breakpoint
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_moduleId_Module_id_fk" FOREIGN KEY ("moduleId") REFERENCES "public"."Module"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Module" ADD CONSTRAINT "Module_courseId_Course_id_fk" FOREIGN KEY ("courseId") REFERENCES "public"."Course"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "lesson_module_idx" ON "Lesson" USING btree ("moduleId");--> statement-breakpoint
CREATE INDEX "module_course_idx" ON "Module" USING btree ("courseId");