export type CalorieTargetDTO = {
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbs: number;
  dailyFat: number;
  startDate: string | null;
  endDate: string | null;
  isDefault: boolean;
};
