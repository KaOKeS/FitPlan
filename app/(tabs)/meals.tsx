import PageLayout from "@/components/PageLayout";
import { useMeals } from "@/hooks/useMeals";
import { FlatList, Text, View } from "react-native";

export default function MealsScreen() {
  const { meals } = useMeals();
  return (
    <PageLayout title="" subtitle="">
      <View>
        <FlatList
          data={meals}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ padding: 12, borderBottomWidth: 1 }}>
              <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
              <Text>Calories: {item.calories}</Text>
              <Text>Protein: {item.protein}</Text>
            </View>
          )}
        />
      </View>
    </PageLayout>
  );
}
