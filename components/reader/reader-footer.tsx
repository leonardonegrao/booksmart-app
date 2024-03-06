import { ActivityIndicator, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native";

import { BookmarkIcon, SettingsIcon } from "../icons";
import Text from "../ui/text";

interface ReaderFooterProps {
  currentLocation: number;
  totalLocations: string;
  progress: number;
}

export default function ReaderFooter({ currentLocation, totalLocations, progress }: ReaderFooterProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.headerButton}>
        <BookmarkIcon fontSize={24} color="#939393" />
      </TouchableOpacity>

      {totalLocations !== "0" ? (
        <View style={{ alignItems: "center" }}>
          <Text fontType="serifMedium" style={{ fontSize: 16 }}>
            {currentLocation}/{totalLocations}
          </Text>
          <Text fontType="serifRegular" style={{ fontSize: 12 }}>
            {progress}%
          </Text>
        </View>
      ) : (
        <ActivityIndicator />
      )}

      <TouchableOpacity style={styles.headerButton}>
        <SettingsIcon fontSize={24} color="#939393" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerButton: {
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
});
