import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { BrainIcon, ChevronLeft } from "../icons";
import Text from "../ui/text";
import { Link } from "expo-router";

interface ReaderHeaderProps {
  title: string;
  author: string;
}

export default function ReaderHeader({ title, author }: ReaderHeaderProps) {
  return (
    <View style={styles.container}>
      <Link href="/(tabs)/">
        <View style={styles.headerButton}>
          <ChevronLeft fontSize={24} color="#939393" />
        </View>
      </Link>

      <View style={{ alignItems: "center" }}>
        <Text fontType="serifMedium" style={{ fontSize: 16 }}>
          {title}
        </Text>
        <Text fontType="serifRegular" style={{ fontSize: 12 }}>
          {author}
        </Text>
      </View>

      <TouchableOpacity style={styles.headerButton}>
        <BrainIcon fontSize={24} color="#939393" />
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
