/**
 * Meals Schema
 *
 * Defines the structure for system meals, user meals, meal ingredients, and meal steps
 */

import { relations } from "drizzle-orm";
import {
    index,
    integer,
    real,
    sqliteTable,
    text,
} from "drizzle-orm/sqlite-core";

export const systemMeals = sqliteTable(
  "system_meals",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    i18nKey: text("i18n_key").notNull().unique(),
    category: text("category").notNull(),
    prepTime: integer("prep_time"),
    servings: integer("servings").default(1),
    difficulty: text("difficulty"),
    caloriesPerServing: integer("calories_per_serving").notNull(),
    proteinPerServing: real("protein_per_serving").notNull().default(0),
    carbsPerServing: real("carbs_per_serving").notNull().default(0),
    fatPerServing: real("fat_per_serving").notNull().default(0),
    source: text("source").default("built-in"),
    version: integer("version").default(1),
    createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
  },
  (table) => [
    // Performance indexes for common queries
    index("idx_system_meals_category").on(table.category),
    index("idx_system_meals_i18nKey").on(table.i18nKey),
  ],
);

export const userMeals = sqliteTable(
  "user_meals",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    description: text("description"),
    category: text("category").notNull(),
    prepTime: integer("prep_time"),
    servings: integer("servings").default(1),
    caloriesPerServing: integer("calories_per_serving"),
    proteinPerServing: real("protein_per_serving").default(0),
    carbsPerServing: real("carbs_per_serving").default(0),
    fatPerServing: real("fat_per_serving").default(0),
    createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
    deletedAt: text("deleted_at"),
  },
  (table) => [
    // Performance indexes for common queries
    index("idx_user_meals_category").on(table.category),
    index("idx_user_meals_name").on(table.name),
    index("idx_user_meals_deleted").on(table.deletedAt),
  ],
);

export const systemMealIngredients = sqliteTable(
  "system_meal_ingredients",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    mealId: integer("meal_id")
      .notNull()
      .references(() => systemMeals.id, { onDelete: "cascade" }),
    ingredientType: text("ingredient_type").notNull(), // 'built-in' or 'custom'
    ingredientId: integer("ingredient_id").notNull(),
    amount: real("amount").notNull(),
    createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
  },
  (table) => [
    // Performance indexes for common queries
    index("idx_system_meal_ingredients_meal").on(table.mealId),
    index("idx_system_meal_ingredients_ingredient").on(
      table.ingredientType,
      table.ingredientId,
    ),
  ],
);

export const userMealIngredients = sqliteTable(
  "user_meal_ingredients",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    mealId: integer("meal_id")
      .notNull()
      .references(() => userMeals.id, { onDelete: "cascade" }),
    ingredientType: text("ingredient_type").notNull(), // 'built-in' or 'custom'
    ingredientId: integer("ingredient_id").notNull(),
    amount: real("amount").notNull(),
    createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
  },
  (table) => [
    // Performance indexes for common queries
    index("idx_user_meal_ingredients_meal").on(table.mealId),
    index("idx_user_meal_ingredients_ingredient").on(
      table.ingredientType,
      table.ingredientId,
    ),
  ],
);

export const systemMealSteps = sqliteTable(
  "system_meal_steps",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    mealId: integer("meal_id")
      .notNull()
      .references(() => systemMeals.id),
    stepNumber: integer("step_number").notNull(),
    instruction: text("instruction").notNull(),
    timeMinutes: integer("time_minutes"),
    temperature: integer("temperature"),
    createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
  },
  (table) => [
    // Performance indexes for common queries
    index("idx_system_meal_steps_meal").on(table.mealId, table.stepNumber),
  ],
);

export const userMealSteps = sqliteTable(
  "user_meal_steps",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    mealId: integer("meal_id")
      .notNull()
      .references(() => userMeals.id),
    stepNumber: integer("step_number").notNull(),
    instruction: text("instruction").notNull(),
    timeMinutes: integer("time_minutes"),
    temperature: integer("temperature"),
    createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
  },
  (table) => [
    // Performance indexes for common queries
    index("idx_user_meal_steps_meal").on(table.mealId, table.stepNumber),
  ],
);

// Relations
export const systemMealsRelations = relations(systemMeals, ({ many }) => ({
  ingredients: many(systemMealIngredients),
  steps: many(systemMealSteps),
}));

export const userMealsRelations = relations(userMeals, ({ many }) => ({
  ingredients: many(userMealIngredients),
  steps: many(userMealSteps),
}));

export const systemMealIngredientsRelations = relations(
  systemMealIngredients,
  ({ one }) => ({
    meal: one(systemMeals, {
      fields: [systemMealIngredients.mealId],
      references: [systemMeals.id],
    }),
  }),
);

export const userMealIngredientsRelations = relations(
  userMealIngredients,
  ({ one }) => ({
    meal: one(userMeals, {
      fields: [userMealIngredients.mealId],
      references: [userMeals.id],
    }),
  }),
);

export const systemMealStepsRelations = relations(
  systemMealSteps,
  ({ one }) => ({
    meal: one(systemMeals, {
      fields: [systemMealSteps.mealId],
      references: [systemMeals.id],
    }),
  }),
);

export const userMealStepsRelations = relations(userMealSteps, ({ one }) => ({
  meal: one(userMeals, {
    fields: [userMealSteps.mealId],
    references: [userMeals.id],
  }),
}));
