import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { Text, View } from "react-native";

export default function Index() {
  const db = drizzle(process.env.DB_FILE_NAME!);
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
