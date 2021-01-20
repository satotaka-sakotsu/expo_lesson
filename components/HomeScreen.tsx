import React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Text, View } from "react-native";
import layoutStyles from "../styles/layout";

export default function HomeScreen(props: any) {
  const { navigation } = props;

  return (
    <View style={layoutStyles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />

      <StatusBar style="auto" />
    </View>
  );
}
