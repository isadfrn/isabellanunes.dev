CREATE TABLE `admin_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch())
);
--> statement-breakpoint
CREATE UNIQUE INDEX `admin_users_email_unique` ON `admin_users` (`email`);--> statement-breakpoint
CREATE TABLE `comments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`post_slug` text NOT NULL,
	`post_locale` text NOT NULL,
	`author_name` text NOT NULL,
	`author_email` text,
	`content` text NOT NULL,
	`approved` integer DEFAULT true NOT NULL,
	`created_at` integer DEFAULT (unixepoch())
);
