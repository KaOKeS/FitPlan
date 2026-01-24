import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type Props = {
  image: any; // require('../assets/your-image.png') lub {uri: '...'}
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export default function CalorieCard({
  image,
  calories,
  protein,
  carbs,
  fat,
}: Props) {
  return (
    <View style={styles.card}>
      {/* Obrazek */}
      <Image source={image} style={styles.image} resizeMode="cover" />

      {/* Teksty */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Current Calorie Target</Text>
        <Text style={styles.calories}>{calories} kcal</Text>
        <Text style={styles.macros}>
          B: {protein}g W: {carbs}g T: {fat}g
        </Text>
        <Text style={styles.default}>Default target</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 5, // cień android
    shadowColor: "#000", // cień ios
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 120,
  },
  textContainer: {
    padding: 12,
    alignItems: "center",
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
    fontWeight: "500",
    marginBottom: 4,
  },
  default: {
    fontSize: 14,
    color: "blue",
  },
});
