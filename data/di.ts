import { IMealRepository } from "@/domain/repositories/IMealRepository";
import { IMealService } from "@/domain/services/IMealService";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { MealRepositoryImpl } from "./repositories/MealRepositoryImpl";
import { MealServiceImpl } from "./services/MealServiceImpl";

export function createRepositories(sqliteDb: any) {
  const drizzleDb = drizzle(sqliteDb);
  const mealRepository: IMealRepository = new MealRepositoryImpl(drizzleDb);

  return {
    mealRepository: mealRepository,
  };
}

export function createServices(sqliteDb: any): { mealService: IMealService } {
  const drizzleDb = drizzle(sqliteDb);
  const mealRepository = new MealRepositoryImpl(drizzleDb);

  const mealService: IMealService = new MealServiceImpl(mealRepository);

  return {
    mealService: mealService,
  };
}

export type Repositories = ReturnType<typeof createRepositories>;
export type Services = ReturnType<typeof createServices>;
