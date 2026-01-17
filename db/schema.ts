import { relations } from 'drizzle-orm';
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

export const ingredientCategories = sqliteTable('ingredient_categories', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    i18nKey: text('i18n_key').notNull().unique(),
    icon: text('icon'),
    sortOrder: integer('sort_order').default(0),
    createdAt: text('created_at').default('CURRENT_TIMESTAMP')
});

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

export const systemMeals = sqliteTable('system_meals', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    i18nKey: text('i18n_key').notNull().unique(),
    category: text('category').notNull(),
    cookTime: integer('cook_time'),
    servings: integer('servings').default(1),
    caloriesPerServing: integer('calories_per_serving'),
    proteinPerServing: real('protein_per_serving').default(0),
    carbsPerServing: real('carbs_per_serving').default(0),
    fatPerServing: real('fat_per_serving').default(0),
    source: text('source').default('built-in'),
    version: integer('version').default(1),
    createdAt: text('created_at').default('CURRENT_TIMESTAMP')
}, (table) => ([
    // Performance indexes for common queries
    index('idx_system_meals_category').on(table.category),
    index('idx_system_meals_i18nKey').on(table.i18nKey)
]));

export const userMeals = sqliteTable('user_meals', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    description: text('description'),
    category: text('category').notNull(),
    cookTime: integer('cook_time'),
    servings: integer('servings').default(1),
    caloriesPerServing: integer('calories_per_serving'),
    proteinPerServing: real('protein_per_serving').default(0),
    carbsPerServing: real('carbs_per_serving').default(0),
    fatPerServing: real('fat_per_serving').default(0),
    createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
    deletedAt: text('deleted_at')
}, (table) => ([
    // Performance indexes for common queries
    index('idx_user_meals_category').on(table.category),
    index('idx_user_meals_name').on(table.name),
    index('idx_user_meals_deleted').on(table.deletedAt)
]));

export const systemMealIngredients = sqliteTable('system_meal_ingredients', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    mealId: integer('meal_id').notNull().references(() => systemMeals.id, { onDelete: 'cascade' }),
    ingredientType: text('ingredient_type').notNull(), // 'built-in' or 'custom'
    ingredientId: integer('ingredient_id').notNull(),
    amount: real('amount').notNull(),
    createdAt: text('created_at').default('CURRENT_TIMESTAMP')
}, (table) => ([
    // Performance indexes for common queries
    index('idx_system_meal_ingredients_meal').on(table.mealId),
    index('idx_system_meal_ingredients_ingredient').on(table.ingredientType, table.ingredientId)
]));

export const userMealIngredients = sqliteTable('user_meal_ingredients', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    mealId: integer('meal_id').notNull().references(() => userMeals.id, { onDelete: 'cascade' }),
    ingredientType: text('ingredient_type').notNull(), // 'built-in' or 'custom'
    ingredientId: integer('ingredient_id').notNull(),
    amount: real('amount').notNull(),
    createdAt: text('created_at').default('CURRENT_TIMESTAMP')
}, (table) => ([
    // Performance indexes for common queries
    index('idx_user_meal_ingredients_meal').on(table.mealId),
    index('idx_user_meal_ingredients_ingredient').on(table.ingredientType, table.ingredientId)
]));

export const systemMealSteps = sqliteTable('system_meal_steps', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    mealId: integer('meal_id').notNull().references(() => systemMeals.id),
    stepNumber: integer('step_number').notNull(),
    instruction: text('instruction').notNull(),
    timeMinutes: integer('time_minutes'),
    temperature: integer('temperature'),
    createdAt: text('created_at').default('CURRENT_TIMESTAMP')
}, (table) => ([
    // Performance indexes for common queries
    index('idx_system_meal_steps_meal').on(table.mealId, table.stepNumber)
]));

export const userMealSteps = sqliteTable('user_meal_steps', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    mealId: integer('meal_id').notNull().references(() => userMeals.id),
    stepNumber: integer('step_number').notNull(),
    instruction: text('instruction').notNull(),
    timeMinutes: integer('time_minutes'),
    temperature: integer('temperature'),
    createdAt: text('created_at').default('CURRENT_TIMESTAMP')
}, (table) => ([
    // Performance indexes for common queries
    index('idx_user_meal_steps_meal').on(table.mealId, table.stepNumber)
]));

// Relations
export const systemMealsRelations = relations(systemMeals, ({ many }) => ({
    ingredients: many(systemMealIngredients),
    steps: many(systemMealSteps)
}));

export const userMealsRelations = relations(userMeals, ({ many }) => ({
    ingredients: many(userMealIngredients),
    steps: many(userMealSteps)
}));

export const systemMealIngredientsRelations = relations(systemMealIngredients, ({ one }) => ({
    meal: one(systemMeals, {
        fields: [systemMealIngredients.mealId],
        references: [systemMeals.id]
    })
}));

export const userMealIngredientsRelations = relations(userMealIngredients, ({ one }) => ({
    meal: one(userMeals, {
        fields: [userMealIngredients.mealId],
        references: [userMeals.id]
    })
}));

export const systemMealStepsRelations = relations(systemMealSteps, ({ one }) => ({
    meal: one(systemMeals, {
        fields: [systemMealSteps.mealId],
        references: [systemMeals.id]
    })
}));

export const userMealStepsRelations = relations(userMealSteps, ({ one }) => ({
    meal: one(userMeals, {
        fields: [userMealSteps.mealId],
        references: [userMeals.id]
    })
}));

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

export const userCalorieTargets = sqliteTable('user_calorie_targets', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    dailyCalories: integer('daily_calories').notNull(),
    dailyProtein: real('daily_protein'),
    dailyCarbs: real('daily_carbs'),
    dailyFat: real('daily_fat'),
    startDate: text('start_date').notNull(),
    endDate: text('end_date'),
    isDefault: integer('is_default').default(0),
    createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
    updatedAt: text('updated_at').default('CURRENT_TIMESTAMP')
});

export const databaseVersion = sqliteTable('database_version', {
    id: integer('id').primaryKey(),
    schemaVersion: integer('schema_version').notNull(),
    contentVersion: integer('content_version').notNull(),
    lastMigration: text('last_migration'),
    updatedAt: text('updated_at').default('CURRENT_TIMESTAMP')
});