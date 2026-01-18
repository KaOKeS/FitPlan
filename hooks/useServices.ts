// hooks/useServices.ts
import { createServices } from "@/data/di";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useSQLiteContext } from "expo-sqlite";

export function useServices() {
  const sqlite = useSQLiteContext();
  useDrizzleStudio(sqlite);

  return createServices(sqlite);
}
