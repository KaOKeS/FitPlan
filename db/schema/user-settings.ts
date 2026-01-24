/**
 * User Settings Schema
 *
 * Defines the structure for user calorie targets and database version tracking
 */

import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userCalorieTargets = sqliteTable("user_calorie_targets", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  dailyCalories: integer("daily_calories").notNull(),
  dailyProtein: real("daily_protein").notNull(),
  dailyCarbs: real("daily_carbs").notNull(),
  dailyFat: real("daily_fat").notNull(),
  startDate: text("start_date"),
  endDate: text("end_date"),
  isDefault: integer("is_default").default(0),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").default("CURRENT_TIMESTAMP"),
});

export const databaseVersion = sqliteTable("database_version", {
  id: integer("id").primaryKey(),
  schemaVersion: integer("schema_version").notNull(),
  contentVersion: integer("content_version").notNull(),
  lastMigration: text("last_migration"),
  updatedAt: text("updated_at").default("CURRENT_TIMESTAMP"),
});
