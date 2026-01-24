import { userCalorieTargets } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
export type UserCalorieTargetRow = InferSelectModel<typeof userCalorieTargets>;

export interface IUserCalorieTargetRepository {
  getTodayTarget(): Promise<UserCalorieTargetRow>;
  getAllPaginated(
    page: number,
    pageSize: number,
  ): Promise<UserCalorieTargetRow[]>;
}
