import React from "react";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";

import type { ReaderProps } from "../types";

export function OpeningBook({
  width,
  height,
}: Pick<ReaderProps, "width" | "height">) {
  return (
    <View style={[styles.container, { width, height }]}>
      <ActivityIndicator size="large" />

      <Text style={styles.text}>Opening</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  text: { marginTop: 20, fontSize: 18 },
});
