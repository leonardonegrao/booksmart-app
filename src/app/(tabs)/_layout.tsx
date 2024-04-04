import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text } from "react-native";
import { Redirect, Slot } from "expo-router";

import { useAuth } from "@/src/context/AuthContext";
import NavTabs from "@/src/components/tabs/nav-tabs";

export default function TabLayout() {
  const { authState } = useAuth();
  const isLoading = authState?.authenticated === null;

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!authState?.authenticated && !isLoading) {
    return <Redirect href="/login" />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.layout}>
        <Slot />
        <NavTabs />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: "flex-end",
    height: "100%",
    backgroundColor: "#FAFAFA",
  },
});
