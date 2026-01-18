import { Meal } from "../entity/Meal";

export interface IMealService {
  getAllMeals(): Promise<Meal[]>;
  getMealById(id: number): Promise<Meal | null>;
}
