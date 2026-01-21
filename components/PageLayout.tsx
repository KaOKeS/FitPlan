import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  subtitle: string;
  children: ReactNode;
  gradientColors?: string[];
};

export default function PageLayout({
  title,
  subtitle,
  children,
  gradientColors = ["#4CAF50", "#9d9240"],
}: Props) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[gradientColors[0], gradientColors[1]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </LinearGradient>
      <View>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d8c97f",
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#212529",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#ffffff",
    marginTop: 4,
  },
});
