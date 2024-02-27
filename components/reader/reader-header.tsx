import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { BrainIcon, ChevronLeft } from "../icons";
import Text from "../ui/text";

interface ReaderHeaderProps {
  title: string;
  author: string;
  onBackPress?: () => Promise<void>;
}

export default function ReaderHeader({ title, author, onBackPress }: ReaderHeaderProps) {
  const handleBackPress = async () => {
    if (onBackPress) {
      await onBackPress();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackPress}>
        <View style={styles.headerButton}>
          <ChevronLeft fontSize={24} color="#939393" />
        </View>
      </TouchableOpacity>

      <View style={{ alignItems: "center", maxWidth: "70%" }}>
        <Text fontType="serifMedium" style={{ fontSize: 14, textAlign: "center" }}>
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
