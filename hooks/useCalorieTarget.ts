import { AccountServiceImpl } from "@/data/services/AccountServiceImpl";
import { CalorieTargetDTO } from "@/domain/dtos/dtos";
import { useEffect, useState } from "react";

type UseCalorieTargetReturn = {
  todayTarget: CalorieTargetDTO;
  targets: CalorieTargetDTO[];
  loadingToday: boolean;
  loadingList: boolean;
  errorToday: string | null;
  errorList: string | null;
  fetchPage: (page: number) => void;
  defaultTarget: CalorieTargetDTO | undefined;
};

export const useCalorieTarget = (
  service: AccountServiceImpl,
  pageSize: number = 10,
): UseCalorieTargetReturn => {
  const [todayTarget, setTodayTarget] = useState<CalorieTargetDTO>({
    dailyCalories: 2500,
    dailyProtein: 188,
    dailyCarbs: 281,
    dailyFat: 69,
    startDate: null,
    endDate: null,
    isDefault: true,
  });
  const [targets, setTargets] = useState<CalorieTargetDTO[]>([]);
  const [defaultTarget, setDefaultTarget] = useState<CalorieTargetDTO>();
  const [loadingToday, setLoadingToday] = useState<boolean>(true);
  const [loadingList, setLoadingList] = useState<boolean>(true);
  const [errorToday, setErrorToday] = useState<string | null>(null);
  const [errorList, setErrorList] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setLoadingToday(true);
    service
      .getTodayCalorieTarget()
      .then(setTodayTarget)
      .catch((err) => setErrorToday(err.message))
      .finally(() => setLoadingToday(false));
  }, [service]);

  // Pobranie pierwszej strony wszystkich targetów
  useEffect(() => {
    fetchPage(1);
  }, [service]);

  const fetchPage = (page: number) => {
    setLoadingList(true);
    service
      .getCalorieTargetsPaginated(page, pageSize)
      .then(setTargets)
      .catch((err) => setErrorList(err.message))
      .finally(() => setLoadingList(false));
    setCurrentPage(page);
  };

  return {
    todayTarget,
    targets,
    loadingToday,
    loadingList,
    errorToday,
    errorList,
    fetchPage,
    defaultTarget,
  };
};
