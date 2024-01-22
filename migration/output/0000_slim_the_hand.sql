CREATE SCHEMA "lifeforce";
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "user_status" AS ENUM('INCOMPLETE', 'ACTIVE', 'DELETED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lifeforce"."user" (
	"id" serial PRIMARY KEY NOT NULL,
	"ory_id" varchar(256) NOT NULL,
	"username" varchar(256),
	"first_name" varchar(256),
	"last_name" varchar(256),
	"email" varchar(256) NOT NULL,
	"user_status" "user_status",
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "unique_email_address" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lifeforce"."room" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(256),
	"creator_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "lifeforce"."user" ("id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "lifeforce"."user" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "username_idx" ON "lifeforce"."user" ("username");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "room_id_idx" ON "lifeforce"."room" ("id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "room_name_idx" ON "lifeforce"."room" ("username");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lifeforce"."room" ADD CONSTRAINT "room_creator_id_user_id_fk" FOREIGN KEY ("creator_id") REFERENCES "lifeforce"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
