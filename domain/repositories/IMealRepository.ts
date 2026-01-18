import { Meal } from "@/domain/entity/Meal";

export interface IMealRepository {
  getAll(): Promise<Meal[]>;
  getById(id: number): Promise<Meal | null>;
  create(meal: Omit<Meal, "id">): Promise<number>;
  delete(id: number): Promise<void>;
}
