import View from "@/src/components/shared/view";
import Text from "@/src/components/ui/text";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";

interface BookPageHeaderProps {
  title: string;
  author: string;
  coverLocalUri: string;
}

export default function BookPageHeader({ title, author, coverLocalUri }: BookPageHeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text fontType="serifBold" style={styles.pageTitle}>
          {title}
        </Text>
        <Text fontType="serifBold" style={styles.pageSubtitle}>
          {author}
        </Text>
      </View>
      <View style={styles.coverContainer} direction="row" center>
        <Image
          source={coverLocalUri}
          style={styles.cover}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    marginBottom: 10,
    padding: 16,
  },
  pageTitle: {
    fontSize: 17,
    color: "#1E1E1E",
  },
  pageSubtitle: {
    fontSize: 12,
    color: "#1E1E1E",
    opacity: 0.8,
  },
  coverContainer: {
    width: "100%",
  },
  cover: {
    width: 171,
    height: 311,
    borderRadius: 7,
  },
});
