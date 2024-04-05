import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import ReaderContainer from "@/src/components/reader/reader-container";
import Highlight from "@/src/@types/highlight";
import { ReaderProvider } from "@/src/context/ReaderContext";
import { useStorage } from "@/src/context/StorageContext";
import { Book } from "@/src/@types/book";
import HighlightModel from "@/src/services/db/model/highlight";

export default function ReaderScreen({ bookId }: { bookId: string }) {
  const storage = useStorage();
  const [book, setBook] = useState<Book>({} as Book);
  const [highlights, setHighlights] = useState<Highlight[]>([]);

  useEffect(() => {
    const fetchBook = async () => {
      const bookResponse = await storage.actions.books.findOne(storage.db!, bookId);
      const highlightsResponse = await bookResponse.highlights.fetch();
      const formattedHighlights = highlightsResponse.map((hl: HighlightModel) => {
        return {
          id: hl.id,
          bookId: bookResponse.id,
          color: hl.color,
          location: hl.location,
          content: hl.content,
        };
      });

      if (!bookResponse) {
        alert("Error getting book");
        return;
      }

      setBook(bookResponse);
      setHighlights(formattedHighlights);
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
