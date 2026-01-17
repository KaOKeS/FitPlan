CREATE TABLE `daily_meals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`meal_type` text NOT NULL,
	`meal_id` integer NOT NULL,
	`date` text NOT NULL,
	`portion` real DEFAULT 1,
	`eaten` integer DEFAULT 0,
	`order_index` integer DEFAULT 0,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE INDEX `idx_daily_meals_date` ON `daily_meals` (`date`);--> statement-breakpoint
CREATE INDEX `idx_daily_meals_meal` ON `daily_meals` (`meal_type`,`meal_id`);--> statement-breakpoint
CREATE INDEX `idx_daily_meals_date_order` ON `daily_meals` (`date`,`order_index`);--> statement-breakpoint
CREATE TABLE `ingredient_categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`i18n_key` text NOT NULL,
	`icon` text,
	`sort_order` integer DEFAULT 0,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ingredient_categories_i18n_key_unique` ON `ingredient_categories` (`i18n_key`);--> statement-breakpoint
CREATE TABLE `system_ingredients` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`i18n_key` text NOT NULL,
	`category_id` integer NOT NULL,
	`unit` text DEFAULT 'g',
	`calories_per_100` real NOT NULL,
	`protein_per_100` real DEFAULT 0,
	`carbs_per_100` real DEFAULT 0,
	`fat_per_100` real DEFAULT 0,
	`fiber_per_100` real DEFAULT 0,
	`sugar_per_100` real DEFAULT 0,
	`version` integer DEFAULT 1,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	FOREIGN KEY (`category_id`) REFERENCES `ingredient_categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `system_ingredients_i18n_key_unique` ON `system_ingredients` (`i18n_key`);--> statement-breakpoint
CREATE INDEX `idx_system_ingredients_category` ON `system_ingredients` (`category_id`);--> statement-breakpoint
CREATE INDEX `idx_system_ingredients_i18n` ON `system_ingredients` (`i18n_key`);--> statement-breakpoint
CREATE TABLE `user_ingredients` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`category_id` integer NOT NULL,
	`unit` text DEFAULT 'g',
	`calories_per_100` real NOT NULL,
	`protein_per_100` real DEFAULT 0,
	`carbs_per_100` real DEFAULT 0,
	`fat_per_100` real DEFAULT 0,
	`fiber_per_100` real DEFAULT 0,
	`sugar_per_100` real DEFAULT 0,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`deleted_at` text,
	FOREIGN KEY (`category_id`) REFERENCES `ingredient_categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_user_ingredients_category` ON `user_ingredients` (`category_id`);--> statement-breakpoint
CREATE INDEX `idx_user_ingredients_name` ON `user_ingredients` (`name`);--> statement-breakpoint
CREATE INDEX `idx_user_ingredients_deleted` ON `user_ingredients` (`deleted_at`);--> statement-breakpoint
CREATE TABLE `system_meal_ingredients` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`meal_id` integer NOT NULL,
	`ingredient_type` text NOT NULL,
	`ingredient_id` integer NOT NULL,
	`amount` real NOT NULL,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	FOREIGN KEY (`meal_id`) REFERENCES `system_meals`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_system_meal_ingredients_meal` ON `system_meal_ingredients` (`meal_id`);--> statement-breakpoint
CREATE INDEX `idx_system_meal_ingredients_ingredient` ON `system_meal_ingredients` (`ingredient_type`,`ingredient_id`);--> statement-breakpoint
CREATE TABLE `system_meal_steps` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`meal_id` integer NOT NULL,
	`step_number` integer NOT NULL,
	`instruction` text NOT NULL,
	`time_minutes` integer,
	`temperature` integer,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	FOREIGN KEY (`meal_id`) REFERENCES `system_meals`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_system_meal_steps_meal` ON `system_meal_steps` (`meal_id`,`step_number`);--> statement-breakpoint
CREATE TABLE `system_meals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`i18n_key` text NOT NULL,
	`category` text NOT NULL,
	`prep_time` integer,
	`servings` integer DEFAULT 1,
	`difficulty` text,
	`calories_per_serving` integer,
	`protein_per_serving` real DEFAULT 0,
	`carbs_per_serving` real DEFAULT 0,
	`fat_per_serving` real DEFAULT 0,
	`source` text DEFAULT 'built-in',
	`version` integer DEFAULT 1,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `system_meals_i18n_key_unique` ON `system_meals` (`i18n_key`);--> statement-breakpoint
CREATE INDEX `idx_system_meals_category` ON `system_meals` (`category`);--> statement-breakpoint
CREATE INDEX `idx_system_meals_i18nKey` ON `system_meals` (`i18n_key`);--> statement-breakpoint
CREATE TABLE `user_meal_ingredients` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`meal_id` integer NOT NULL,
	`ingredient_type` text NOT NULL,
	`ingredient_id` integer NOT NULL,
	`amount` real NOT NULL,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	FOREIGN KEY (`meal_id`) REFERENCES `user_meals`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_user_meal_ingredients_meal` ON `user_meal_ingredients` (`meal_id`);--> statement-breakpoint
CREATE INDEX `idx_user_meal_ingredients_ingredient` ON `user_meal_ingredients` (`ingredient_type`,`ingredient_id`);--> statement-breakpoint
CREATE TABLE `user_meal_steps` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`meal_id` integer NOT NULL,
	`step_number` integer NOT NULL,
	`instruction` text NOT NULL,
	`time_minutes` integer,
	`temperature` integer,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	FOREIGN KEY (`meal_id`) REFERENCES `user_meals`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_user_meal_steps_meal` ON `user_meal_steps` (`meal_id`,`step_number`);--> statement-breakpoint
CREATE TABLE `user_meals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`category` text NOT NULL,
	`prep_time` integer,
	`servings` integer DEFAULT 1,
	`calories_per_serving` integer,
	`protein_per_serving` real DEFAULT 0,
	`carbs_per_serving` real DEFAULT 0,
	`fat_per_serving` real DEFAULT 0,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`deleted_at` text
);
--> statement-breakpoint
CREATE INDEX `idx_user_meals_category` ON `user_meals` (`category`);--> statement-breakpoint
CREATE INDEX `idx_user_meals_name` ON `user_meals` (`name`);--> statement-breakpoint
CREATE INDEX `idx_user_meals_deleted` ON `user_meals` (`deleted_at`);--> statement-breakpoint
CREATE TABLE `shopping_list_purchased` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`ingredient_id` integer NOT NULL,
	`ingredient_type` text NOT NULL,
	`start_date` text NOT NULL,
	`end_date` text NOT NULL,
	`purchased_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE INDEX `idx_shopping_list_ingredient` ON `shopping_list_purchased` (`ingredient_type`,`ingredient_id`);--> statement-breakpoint
CREATE INDEX `idx_shopping_list_purchased_range` ON `shopping_list_purchased` (`start_date`,`end_date`);--> statement-breakpoint
CREATE INDEX `idx_shopping_list_purchased_at` ON `shopping_list_purchased` (`purchased_at`);--> statement-breakpoint
CREATE TABLE `database_version` (
	`id` integer PRIMARY KEY NOT NULL,
	`schema_version` integer NOT NULL,
	`content_version` integer NOT NULL,
	`last_migration` text,
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE TABLE `user_calorie_targets` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`daily_calories` integer NOT NULL,
	`daily_protein` real,
	`daily_carbs` real,
	`daily_fat` real,
	`start_date` text NOT NULL,
	`end_date` text,
	`is_default` integer DEFAULT 0,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
