import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8E8E93",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="meals" options={{ title: "Meals" }} />
    </Tabs>
  );
}
