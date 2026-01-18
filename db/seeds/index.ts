import {
    ingredientCategories,
    systemIngredients,
    systemMealIngredients,
    systemMealSteps,
    systemMeals,
} from "@/db/schema";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import AsyncStorage from "expo-sqlite/kv-store";
import { ingredientCategoriesData } from "./ingredientsCategory";
import { mealStepsData } from "./mealsSteps";
import { systemIngredientsData } from "./systemIngredients";
import { systemMealsData } from "./systemMeals";
import { systemMealIngredientsData } from "./systemMealsIngredients";

export async function seedDatabase(db: ExpoSQLiteDatabase) {
  const isInitialized = AsyncStorage.getItemSync("dbInitialized");
  if (isInitialized) return;

  await db.insert(ingredientCategories).values(ingredientCategoriesData);
  await db.insert(systemIngredients).values(systemIngredientsData);
  await db.insert(systemMealIngredients).values(systemMealIngredientsData);
  await db.insert(systemMealSteps).values(mealStepsData);
  await db.insert(systemMeals).values(systemMealsData);

  AsyncStorage.setItemSync("dbInitialized", "true");
}

export { systemMeals } from "@/db/schema";

