import { CalorieTargetDTO } from "@/domain/dtos/dtos";
import {
  IUserCalorieTargetRepository,
  UserCalorieTargetRow,
} from "@/domain/repositories/IUserCalorieTargetRepository";

export class AccountServiceImpl {
  constructor(private userCalorieRepository: IUserCalorieTargetRepository) {}

  // Pobranie targetu na dzisiaj w formacie dla UI
  async getTodayCalorieTarget(): Promise<CalorieTargetDTO> {
    const row: UserCalorieTargetRow =
      await this.userCalorieRepository.getTodayTarget();

    return {
      dailyCalories: row.dailyCalories,
      dailyProtein: row.dailyProtein,
      dailyCarbs: row.dailyCarbs,
      dailyFat: row.dailyFat,
      startDate: row.startDate,
      endDate: row.endDate,
      isDefault: row.isDefault === 1,
    };
  }

  // Pobranie wszystkich targetów z paginacją
  async getCalorieTargetsPaginated(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<CalorieTargetDTO[]> {
    const rows: UserCalorieTargetRow[] =
      await this.userCalorieRepository.getAllPaginated(page, pageSize);

    console.log(rows);

    return rows.map((row) => ({
      dailyCalories: row.dailyCalories,
      dailyProtein: row.dailyProtein,
      dailyCarbs: row.dailyCarbs,
      dailyFat: row.dailyFat,
      startDate: row.startDate,
      endDate: row.endDate,
      isDefault: row.isDefault === 1,
    }));
  }
}
