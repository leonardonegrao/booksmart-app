import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import ReaderContainer from "@/src/components/reader/reader-container";
import Highlight from "@/src/@types/highlight";
import { ReaderProvider } from "@/src/context/ReaderContext";
import { useStorage } from "@/src/context/StorageContext";
import { Book } from "@/src/@types/book";

export default function ReaderScreen({ bookId }: { bookId: string }) {
  const storage = useStorage();
  const [book, setBook] = useState<Book>({} as Book);
  const [highlights, setHighlights] = useState<Highlight[]>([]);

  useEffect(() => {
    const fetchBook = async () => {
      const bookResponse = await storage.actions.findOne("book", "id", bookId);

      if (!bookResponse) {
        alert("Error getting book");
        return;
      }

      setBook(bookResponse);

      // const highlightsResponse = await storage.actions.findMany("highlight", "bookId", bookId);

      // if (!highlightsResponse) {
      //   alert("Error getting highlights");
      //   return;
      // }

      // setHighlights(highlightsResponse);
    };

    fetchBook();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ReaderProvider>
        <ReaderContainer
          book={book}
          highlights={highlights}
        />
      </ReaderProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    alignItems: "center",
  },
});
