import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";

import { ingredientCategories, systemIngredients, systemMealIngredients, systemMeals, systemMealSteps } from '@/db/schema';
import AsyncStorage from 'expo-sqlite/kv-store';

export const addDummyData = async (db: ExpoSQLiteDatabase) => {
    const isInitialized = AsyncStorage.getItemSync('dbInitialized');
    if (isInitialized) return;

    console.log("Seeding data...");

    const ingredientCategoriesData = [
        { i18nKey: 'categories.vegetables', icon: '🥕', sortOrder: 1 },
        { i18nKey: 'categories.fruits', icon: '🍎', sortOrder: 2 },
        { i18nKey: 'categories.dairy', icon: '🥛', sortOrder: 3 },
        { i18nKey: 'categories.meat_poultry', icon: '🍖', sortOrder: 4 },
        { i18nKey: 'categories.fish_seafood', icon: '🐟', sortOrder: 5 },
        { i18nKey: 'categories.grains', icon: '🌾', sortOrder: 6 },
        { i18nKey: 'categories.nuts_seeds', icon: '🥜', sortOrder: 7 },
        { i18nKey: 'categories.spices_herbs', icon: '🌿', sortOrder: 8 },
        { i18nKey: 'categories.oils_fats', icon: '🫒', sortOrder: 9 },
        { i18nKey: 'categories.sweets', icon: '🍯', sortOrder: 10 },
        { i18nKey: 'categories.beverages', icon: '🥤', sortOrder: 11 },
        { i18nKey: 'categories.legumes', icon: '🫘', sortOrder: 12 },
        { i18nKey: 'categories.eggs', icon: '🥚', sortOrder: 13 },
        { i18nKey: 'categories.bakery', icon: '🍞', sortOrder: 14 },
        { i18nKey: 'categories.other', icon: '📦', sortOrder: 99 }
    ];
    await db.insert(ingredientCategories).values(ingredientCategoriesData);
    console.log("Ingredient Categories completed.");

    const ingredients = [
        { i18nKey: 'ingredients.banana', categoryId: 2, unit: 'g', caloriesPer100: 85, proteinPer100: 0.73, carbsPer100: 20.1, fatPer100: 0.22, fiberPer100: 1.7 },
        { i18nKey: 'ingredients.instant_oats', categoryId: 6, unit: 'g', caloriesPer100: 372, proteinPer100: 12.6, carbsPer100: 59.6, fatPer100: 6.8, fiberPer100: 10.9 },
        { i18nKey: 'ingredients.whey_isolate', categoryId: 15, unit: 'g', caloriesPer100: 373, proteinPer100: 86, carbsPer100: 2.9, fatPer100: 1.9, fiberPer100: 0 },
        { i18nKey: 'ingredients.whole_chicken_egg', categoryId: 13, unit: 'g', caloriesPer100: 143, proteinPer100: 12.4, carbsPer100: 0.96, fatPer100: 9.96, fiberPer100: 0.75 },
        { i18nKey: 'ingredients.oil_canola', categoryId: 9, unit: 'g', caloriesPer100: 143, proteinPer100: 0, carbsPer100: 0, fatPer100: 94.5, fiberPer100: 0 },
        { i18nKey: 'ingredients.cheese_cottage_low_fat', categoryId: 3, unit: 'g', caloriesPer100: 96, proteinPer100: 20, carbsPer100: 3.5, fatPer100: 0.2, fiberPer100: 0 },
        { i18nKey: 'ingredients.fruit_jam_100', categoryId: 10, unit: 'g', caloriesPer100: 142, proteinPer100: 0.7, carbsPer100: 33, fatPer100: 0.5, fiberPer100: 0 },
        { i18nKey: 'ingredients.natural_yogurt', categoryId: 3, unit: 'g', caloriesPer100: 69, proteinPer100: 4.9, carbsPer100: 5.7, fatPer100: 3, fiberPer100: 0 },
        { i18nKey: 'ingredients.chocolate_dark_70', categoryId: 10, unit: 'g', caloriesPer100: 566, proteinPer100: 9.5, carbsPer100: 34, fatPer100: 41, fiberPer100: 0 }
    ];
    await db.insert(systemIngredients).values(ingredients);
    console.log("System Ingredients completed.");

    const meals = [
        { i18nKey: 'meals.omlet', descriptionKey: 'test', category: 'breakfast', prepTime: 10, cookTime: 10, difficulty: 'easy', caloriesPerServing: 504, proteinPerServing: 34.3, carbsPerServing: 56.8, fatPerServing: 16.6, source: 'built-in' },
    ];
    await db.insert(systemMeals).values(meals);
    console.log("System meals completed.");

    const mealSteps = [
        { mealId: 1, stepNumber: 1, instruction: "Banana rozgnieść widelcem w miseczce, następnie wsypać płatki, odżywke białkową i zalać odrobiną wrzątku by zrobić jednolitą mase.", timeMinutes: 3 },
        { mealId: 1, stepNumber: 2, instruction: "Dodać do masy jajko i wymieszać.", timeMinutes: 1 },
        { mealId: 1, stepNumber: 3, instruction: "Smażyć na dobrze rozgrzanej i nasmarowanej olejem patelni, z obu stron.", timeMinutes: 3 },
        { mealId: 1, stepNumber: 4, instruction: "W międzyczasie twaróg rozrobić z jogurtem oraz dżemem." },
        { mealId: 1, stepNumber: 5, instruction: "Na gotowy omlet nanieść mase twarogową i posypać siekaną czekoladą.", timeMinutes: 2 },
    ];
    await db.insert(systemMealSteps).values(mealSteps);
    console.log("System meals steps completed.");

    const mealIngredients = [
        { mealId: 1, ingredientType: "built-in", ingredientId: 4, amount: 60 },
        { mealId: 1, ingredientType: "built-in", ingredientId: 2, amount: 35 },
        { mealId: 1, ingredientType: "built-in", ingredientId: 1, amount: 95 },
        { mealId: 1, ingredientType: "built-in", ingredientId: 6, amount: 50 },
        { mealId: 1, ingredientType: "built-in", ingredientId: 8, amount: 28 },
        { mealId: 1, ingredientType: "built-in", ingredientId: 3, amount: 12 },
        { mealId: 1, ingredientType: "built-in", ingredientId: 7, amount: 26 },
        { mealId: 1, ingredientType: "built-in", ingredientId: 9, amount: 12 },
        { mealId: 1, ingredientType: "built-in", ingredientId: 5, amount: 3 },
    ];
    await db.insert(systemMealIngredients).values(mealIngredients);
    console.log("System Meals Ingredients completed.");



    AsyncStorage.setItemSync('dbInitialized', 'true');
}