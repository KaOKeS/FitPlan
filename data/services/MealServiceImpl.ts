import { Meal } from "@/domain/entity/Meal";
import { IMealRepository } from "@/domain/repositories/IMealRepository";
import { IMealService } from "@/domain/services/IMealService";

export class MealServiceImpl implements IMealService {
  constructor(private mealRepository: IMealRepository) {}

  async getAllMeals(): Promise<Meal[]> {
    const meals = await this.mealRepository.getAll();
    return meals;
  }

  async getMealById(id: number): Promise<Meal | null> {
    return this.mealRepository.getById(id);
  }
}
