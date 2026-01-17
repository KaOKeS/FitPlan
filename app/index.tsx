import { ingredientCategories } from '@/db/index';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { Text, View } from "react-native";

async function query() {
   const db = drizzle(process.env.DB_FILE_NAME!);

  const result = await db.select().from(ingredientCategories);
}

export default function Index() {
 query();
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
