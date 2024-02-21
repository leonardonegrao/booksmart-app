import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

import type { LoadingFileProps, ReaderProps } from "../types";

import { StyleSheet } from "react-native";

export function LoadingFile({
  downloadProgress,
  width,
  height,
}: LoadingFileProps & Pick<ReaderProps, "width" | "height">) {
  return (
    <View style={[styles.container, { width, height }]}>
      <ActivityIndicator size="large" />

      <Text style={styles.text}>Loading {downloadProgress}%</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  text: { marginTop: 20, fontSize: 18 },
});
