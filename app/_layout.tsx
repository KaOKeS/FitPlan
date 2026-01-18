import { Stack } from "expo-router";
import "react-native-reanimated";

import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { Suspense, useEffect } from "react";
import { ActivityIndicator } from "react-native";

import { seedDatabase } from "@/db/seeds/index";
import migrations from "@/drizzle/migrations";
import { DB_FILE_NAME } from "@env";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";

export default function RootLayout() {
  const expoDb = openDatabaseSync(DB_FILE_NAME);
  const db = drizzle(expoDb);
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (success) {
      console.log("Migration successful!");
      seedDatabase(db);
    }
  }, [success]);

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider
        databaseName={DB_FILE_NAME}
        options={{ enableChangeListener: true }}
        useSuspense
      >
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SQLiteProvider>
    </Suspense>
  );
}
