import { StyleSheet, View } from "react-native";
import { Asset } from "expo-asset";
import BookCover from "./cover";
import BookProgress from "./progress";
import BookMenu from "./menu";

interface BookItemProps {
  bookId: string;
  percentageRead: number;
  title: string;
  coverKey: string;
  coverUri: string;
}

export default function BookItem({
  bookId,
  coverUri,
  percentageRead,
}: BookItemProps) {
  const imageURI = Asset.fromModule(coverUri).uri;

  return (
      <View style={styles.container}>
        <BookCover bookId={bookId} source={imageURI} />

        <View style={styles.infoContainer}>
          <BookProgress percentageRead={percentageRead} />
          <BookMenu bookId={bookId} />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  infoContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  menuOption: {
    backgroundColor: "#F1F1F1",
    borderRadius: 50,
    padding: 6,
    opacity: 0.5,
  },
});
