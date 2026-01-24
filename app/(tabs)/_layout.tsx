import { CustomIcon } from "@/components/icons/CustomIcon";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8E8E93",
        headerShown: false,
        tabBarBackground: () => (
          <LinearGradient
            colors={["#4CAF50", "#9d9240"]} // gradient od koloru start do koloru end
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        ),
        tabBarLabelStyle: {
          display: "none", // ukrycie domyślnego labela, jeśli chcesz
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ size, focused }) => (
            <CustomIcon
              src={require("../../assets/images/icons/home_icon.png")}
              iconHeight={45}
              iconWidth={45}
              fontSize={size / 2}
              focused={focused}
              title="Home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="meals"
        options={{
          tabBarIcon: ({ size, focused }) => (
            <CustomIcon
              src={require("../../assets/images/icons/meals_icon.png")}
              iconHeight={45}
              iconWidth={45}
              fontSize={size / 2}
              focused={focused}
              title="Meals"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ingredients"
        options={{
          tabBarIcon: ({ size, focused }) => (
            <CustomIcon
              src={require("../../assets/images/icons/ingredients_icon.png")}
              iconHeight={45}
              iconWidth={50}
              fontSize={size / 2}
              focused={focused}
              title="Ingred."
            />
          ),
        }}
      />
      <Tabs.Screen
        name="shopping-list"
        options={{
          tabBarIcon: ({ size, focused }) => (
            <CustomIcon
              src={require("../../assets/images/icons/shopping_list_icon.png")}
              iconHeight={40}
              iconWidth={40}
              fontSize={size / 2}
              focused={focused}
              title="Shopping list"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarIcon: ({ size, focused }) => (
            <CustomIcon
              src={require("../../assets/images/icons/account_icon.png")}
              iconHeight={45}
              iconWidth={45}
              fontSize={size / 2}
              focused={focused}
              title="Account"
            />
          ),
        }}
      />
    </Tabs>
  );
}
