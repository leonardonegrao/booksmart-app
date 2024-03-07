import { Image } from "expo-image";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

interface BookCoverProps {
  source: string;
  bookId: string;
}

export default function BookCover({ source, bookId }: BookCoverProps) {
  return (
    <Link href={{ pathname: "/reader/[id]", params: { id: bookId } }}>
      <Image
        source={source}
        style={styles.cover}
      />
    </Link>
  );
}

const styles = StyleSheet.create({
  cover: {
    width: 171,
    height: 311,
    borderRadius: 7,
  },
});
