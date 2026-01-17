/**
 * Ingredients Schema
 * 
 * Defines the structure for system and user ingredients tables with relations
 */

import { relations } from 'drizzle-orm';
import { index, integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { ingredientCategories } from './ingredient-categories';

export const systemIngredients = sqliteTable('system_ingredients', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    i18nKey: text('i18n_key').notNull().unique(),
    categoryId: integer('category_id').notNull().references(() => ingredientCategories.id),
    unit: text('unit').default('g'),
    caloriesPer100: real('calories_per_100').notNull(),
    proteinPer100: real('protein_per_100').default(0),
    carbsPer100: real('carbs_per_100').default(0),
    fatPer100: real('fat_per_100').default(0),
    fiberPer100: real('fiber_per_100').default(0),
    sugarPer100: real('sugar_per_100').default(0),
    sodiumPer100: real('sodium_per_100').default(0),
    version: integer('version').default(1),
    createdAt: text('created_at').default('CURRENT_TIMESTAMP')
}, (table) => ([
    // Performance indexes for common queries
    index('idx_system_ingredients_category').on(table.categoryId),
    index('idx_system_ingredients_i18n').on(table.i18nKey),
]));

export const userIngredients = sqliteTable('user_ingredients', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    categoryId: integer('category_id').notNull().references(() => ingredientCategories.id),
    unit: text('unit').default('g'),
    caloriesPer100: real('calories_per_100').notNull(),
    proteinPer100: real('protein_per_100').default(0),
    carbsPer100: real('carbs_per_100').default(0),
    fatPer100: real('fat_per_100').default(0),
    fiberPer100: real('fiber_per_100').default(0),
    sugarPer100: real('sugar_per_100').default(0),
    sodiumPer100: real('sodium_per_100').default(0),
    createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
    deletedAt: text('deleted_at')
}, (table) => ([
    // Performance indexes for common queries
    index('idx_user_ingredients_category').on(table.categoryId),
    index('idx_user_ingredients_name').on(table.name),
    index('idx_user_ingredients_deleted').on(table.deletedAt)
]));

// Relations
export const systemIngredientsRelations = relations(systemIngredients, ({ one }) => ({
    category: one(ingredientCategories, {
        fields: [systemIngredients.categoryId],
        references: [ingredientCategories.id]
    })
}));

export const userIngredientsRelations = relations(userIngredients, ({ one }) => ({
    category: one(ingredientCategories, {
        fields: [userIngredients.categoryId],
        references: [ingredientCategories.id]
    })
}));