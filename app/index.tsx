import { ingredientCategories } from "@/db/schema";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useSQLiteContext } from "expo-sqlite";
import { Text, View } from "react-native";

export default function Index() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);
  useDrizzleStudio(db);

  const update = useLiveQuery(
    drizzleDb.select().from(ingredientCategories)
  );

  console.log(update);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
