/**
 * Shopping List Schema
 * 
 * Defines the structure for shopping list purchased items
 */

import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const shoppingListPurchased = sqliteTable('shopping_list_purchased', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    ingredientId: integer('ingredient_id').notNull(),
    ingredientType: text('ingredient_type').notNull(), // 'built-in' or 'custom'
    startDate: text('start_date').notNull(),
    endDate: text('end_date').notNull(),
    purchasedAt: text('purchased_at').default('CURRENT_TIMESTAMP')
}, (table) => ([
    // Performance indexes for common queries
    index('idx_shopping_list_ingredient').on(table.ingredientType, table.ingredientId),
    index('idx_shopping_list_purchased_range').on(table.startDate, table.endDate),
    index('idx_shopping_list_purchased_at').on(table.purchasedAt)
]));