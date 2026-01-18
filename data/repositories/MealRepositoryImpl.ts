import { systemMeals } from "@/db/schema";
import { Meal } from "@/domain/entity/Meal";
import { IMealRepository } from "@/domain/repositories/IMealRepository";
import { InferSelectModel } from "drizzle-orm";

type SystemMealRow = InferSelectModel<typeof systemMeals>;

export class MealRepositoryImpl implements IMealRepository {
  constructor(private readonly db: any) {}

  async getAll(): Promise<Meal[]> {
    const rows: SystemMealRow[] = await this.db.select().from(systemMeals);

    return rows.map(
      (row) =>
        new Meal(
          row.id,
          row.i18nKey,
          row.caloriesPerServing,
          row.proteinPerServing,
        ),
    );
  }
  getById(id: number): Promise<Meal | null> {
    throw new Error("Method not implemented.");
  }
  create(meal: Omit<Meal, "id">): Promise<number> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
