import { StyleSheet, View } from "react-native";

import Text from "@/components/ui/text";
import BookItem from "@/components/home/book";

const startedBooks = [
  {
    id: "a-promised-land",
    title: "A Promised Land",
    author: "Barack Obama",
    coverUrl: require("@/assets/images/books/a-promised-land.png"),
    percentageRead: 46,
  },
  {
    id: "blade-runner",
    title: "Blade Runner",
    author: "Philip K. Dick",
    coverUrl: require("@/assets/images/books/blade-runner.png"),
    percentageRead: 68,
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text fontType="serifBold" style={styles.title}>
          Continue reading ({startedBooks.length})
        </Text>

        <View style={styles.booksList}>
          {startedBooks.map(book => (
            <BookItem
              key={book.id}
              title={book.title}
              coverUrl={book.coverUrl}
              percentageRead={book.percentageRead}
            />
          ))}
        </View>
      </View>  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 16,
  },
  section: {
    gap: 14,
  },
  title: {
    fontSize: 17,
    color: "#1E1E1E",
  },
  booksList: {
    flexDirection: "row",
    gap: 16,
  },
});
