import { StyleSheet, SafeAreaView, View } from "react-native";
import { Image } from "expo-image";
import Text from "../ui/text";

import emptyIllustration from "@/assets/images/home/empty-illustration.png";
import Button from "../ui/button";

export default function EmptyState() {
  return (
    <SafeAreaView style={styles.container}>
      <Text fontType="serifSemibold" style={{ fontSize: 24, color: "#939393" }}>
        Welcome to your library!
      </Text>

      <Image source={emptyIllustration} style={{ width: "100%", height: 302 }} />

      <View style={{ gap: 16, width: "100%", paddingHorizontal: 16, alignItems: "center" }}>
        <Text fontType="serifRegular" style={{ fontSize: 16, color: "#939393", maxWidth: "70%", textAlign: "center" }}>
          You don't have any books yet. Start by adding a new book to your library.
        </Text>

        <Button label="Upload your first book" href="/(tabs)/upload" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
});
