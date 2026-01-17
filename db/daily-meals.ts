/**
 * Daily Meals Schema
 * 
 * Defines the structure for daily meal planning
 */

import { index, integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const dailyMeals = sqliteTable('daily_meals', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    mealType: text('meal_type').notNull(), // 'built-in' or 'custom'
    mealId: integer('meal_id').notNull(),
    date: text('date').notNull(),
    portion: real('portion').default(1.0),
    eaten: integer('eaten').default(0),
    orderIndex: integer('order_index').default(0),
    createdAt: text('created_at').default('CURRENT_TIMESTAMP')
}, (table) => ([
    // Performance indexes for common queries
    index('idx_daily_meals_date').on(table.date),
    index('idx_daily_meals_meal').on(table.mealType, table.mealId),
    index('idx_daily_meals_date_order').on(table.date, table.orderIndex)
]));