import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { SQLiteProvider } from 'expo-sqlite';
import { Suspense } from 'react';
import { ActivityIndicator } from 'react-native';

export const DATABASE_NAME = 'tasks';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider 
      databaseName={DATABASE_NAME}
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
