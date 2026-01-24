import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  image: any;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  onDefaultPress?: () => void;
};

export default function CalorieCard({
  image,
  calories,
  protein,
  carbs,
  fat,
  onDefaultPress,
}: Props) {
  return (
    <View style={styles.container}>
      {/* Karta */}
      <View style={styles.card}>
        {/* Wiersz 1 */}
        <View style={styles.row}>
          <View style={styles.cell1}>
            <Image source={image} style={styles.image} resizeMode="cover" />
          </View>
          <View style={styles.cell2}>
            <Text style={styles.title}>Current Calorie Target</Text>
            <Text style={styles.calories}>{calories} kcal</Text>
          </View>
        </View>

        {/* Wiersz 2 */}
        <View style={styles.row}>
          <View style={styles.cell3}></View>
          <View style={styles.cell4}>
            <Text style={styles.macros}>
              B: {protein}g W: {carbs}g T: {fat}g
            </Text>
            <TouchableOpacity onPress={onDefaultPress}>
              <Text style={styles.defaultText}>Default target</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  cell1: {
    width: 50,
    height: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  cell2: {
    width: 170,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  cell3: {
    width: 50,
    height: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  cell4: {
    width: 150,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  image: {
    width: 120,
    height: 120,
    marginRight: 40,
    marginBottom: 30, // przesunięcie w górę karty
    zIndex: 2,
  },
  card: {
    width: 270,
    backgroundColor: "#ddd6c1",
    borderRadius: 16,
    paddingTop: 20, // żeby obrazek się nie nakładał na tekst
    paddingBottom: 16,
    paddingHorizontal: 0,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  calories: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
    marginBottom: 4,
  },
  macros: {
    fontSize: 14,
    marginBottom: 4,
  },
  defaultText: {
    fontSize: 14,
    color: "blue",
  },
});
