CREATE TABLE "users" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"email" varchar(255),
	"password" varchar(255),
	"has_completed_onboarding" boolean DEFAULT false NOT NULL,
	"first_login_at" timestamp (0),
	"email_verified_at" timestamp (0),
	"telegram_username" varchar(255),
	"created_at" timestamp (0),
	"updated_at" timestamp (0),
	"deleted_at" timestamp (0),
	"supabase_id" varchar(255),
	"onboarding_flow_id" char(26),
	"membership_tier" varchar(20),
	"membership_expiry_date" timestamp (0),
	"last_login_at" timestamp (0),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_phone_unique" UNIQUE("phone"),
	CONSTRAINT "telegram_username_unique" UNIQUE("telegram_username"),
	CONSTRAINT "users_supabase_id_unique" UNIQUE("supabase_id")
);
--> statement-breakpoint
CREATE INDEX "users_membership_expiry_date_index" ON "users" USING btree ("membership_expiry_date");--> statement-breakpoint
CREATE INDEX "users_membership_tier_index" ON "users" USING btree ("membership_tier");--> statement-breakpoint
CREATE INDEX "users_phone_index" ON "users" USING btree ("phone");--> statement-breakpoint
CREATE INDEX "users_supabase_id_index" ON "users" USING btree ("supabase_id");