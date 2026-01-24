import { userCalorieTargets } from "@/db/schema";
import {
  IUserCalorieTargetRepository,
  UserCalorieTargetRow,
} from "@/domain/repositories/IUserCalorieTargetRepository";
import { eq, gte, lte, or } from "drizzle-orm";

export class UserCalorieTargetRepositoryImpl implements IUserCalorieTargetRepository {
  constructor(private readonly db: any) {}

  async getTodayTarget(): Promise<UserCalorieTargetRow> {
    const today = new Date().toISOString().split("T")[0];

    const rows = await this.db
      .select()
      .from(userCalorieTargets)
      .where(lte(userCalorieTargets.startDate, today))
      .where(or(gte(userCalorieTargets.endDate, today)))
      .limit(1);

    return rows[0] || null;
  }

  async getDefaultTarget(): Promise<UserCalorieTargetRow> {
    const defaultRows = await this.db
      .select()
      .from(userCalorieTargets)
      .where(eq(userCalorieTargets.isDefault, 1))
      .limit(1);

    return defaultRows[0] || null;
  }

  async getAllPaginated(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<UserCalorieTargetRow[]> {
    const offset = (page - 1) * pageSize;

    const rows = await this.db.select().from(userCalorieTargets);
    return rows;
  }
}
