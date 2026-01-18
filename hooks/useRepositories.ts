import { createRepositories } from "@/data/di";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useSQLiteContext } from "expo-sqlite";

export function useRepositories() {
  const sqlite = useSQLiteContext();
  useDrizzleStudio(sqlite);

  return createRepositories(sqlite);
}
