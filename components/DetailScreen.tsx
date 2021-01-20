import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import layoutStyles from "../styles/layout";

export default function DetailScreen() {
  return (
    <View style={layoutStyles.container}>
      <Text>Details Screen</Text>

      <StatusBar style="auto" />
    </View>
  );
}
