import { MealRepositoryImpl } from "@/data/repositories/MealRepositoryImpl";
import { UserCalorieTargetRepositoryImpl } from "@/data/repositories/UserCalorieTargetRepositoryImpl";
import { AccountServiceImpl } from "@/data/services/AccountServiceImpl";
import { MealServiceImpl } from "@/data/services/MealServiceImpl";
import { db } from "@/db/database"; // import singleton Drizzle
import { useMemo } from "react";

export function useServices() {
  return useMemo(() => {
    const mealRepo = new MealRepositoryImpl(db);
    const calorieRepo = new UserCalorieTargetRepositoryImpl(db);

    return {
      mealService: new MealServiceImpl(mealRepo),
      accountService: new AccountServiceImpl(calorieRepo),
    };
  }, []);
}
