import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { openDatabaseSync, SQLiteProvider } from 'expo-sqlite';
import { Suspense, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import { addDummyData } from '@/db/seeds/addDummyData';
import migrations from '@/drizzle/migrations';
import { DB_FILE_NAME } from '@env';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const expoDb = openDatabaseSync(DB_FILE_NAME);
  const db = drizzle(expoDb);
  const {success, error} = useMigrations(db,migrations);

  useEffect(() => {
    if(success){
      console.log('Migration successful!')
      addDummyData(db);
    }
  }, [success])
  

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider 
      databaseName={DB_FILE_NAME}
      options={{enableChangeListener: true}}
      useSuspense>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <StatusBar style="auto" />
      </SQLiteProvider>
    </Suspense>
  );
}
