/**
 * Ingredient Categories Schema
 * 
 * Defines the structure for ingredient categories table
 */

import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const ingredientCategories = sqliteTable('ingredient_categories', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    i18nKey: text('i18n_key').notNull().unique(),
    icon: text('icon'),
    sortOrder: integer('sort_order').default(0),
    createdAt: text('created_at').default('CURRENT_TIMESTAMP')
});