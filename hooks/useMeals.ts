import { Meal } from "@/domain/entity/Meal";
import type { IMealService } from "@/domain/services/IMealService";
import { useEffect, useState } from "react";
import { useServices } from "./useServices";

export function useMeals(): { meals: Meal[]; mealService: IMealService } {
  const { mealService } = useServices() as { mealService: IMealService };
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    mealService.getAllMeals().then(setMeals);
  }, []);

  return { meals, mealService };
}
