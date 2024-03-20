import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import ReaderContainer from "@/src/components/reader/reader-container";
import db from "@/src/services/db";
import Highlight from "@/src/@types/highlight";
import { ReaderProvider } from "@/src/context/ReaderContext";

export default function ReaderScreen({ bookId }: { bookId: string }) {
  const [bookUri, setBookUri] = useState<string>("");
  const [bookTitle, setBookTitle] = useState<string>("");
  const [bookAuthor, setBookAuthor] = useState<string>("");
  const [lastLocation, setLastLocation] = useState<string>("");
  const [highlights, setHighlights] = useState<Highlight[]>([]);

  useEffect(() => {
    const fetchBook = async () => {
      const bookResponse = await db.getBook(bookId);

      if (!bookResponse) {
        alert("Error getting book");
        return;
      }

      setBookUri(bookResponse.bookLocalUri);
      setBookTitle(bookResponse.title);
      setBookAuthor(bookResponse.author);
      setLastLocation(bookResponse.lastLocation);

      const highlightsResponse = await db.getHighlights(bookId);

      if (!highlightsResponse) {
        alert("Error getting highlights");
        return;
      }

      setHighlights(highlightsResponse);
    };

    fetchBook();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ReaderProvider>
        <ReaderContainer
          bookId={bookId}
          bookUri={bookUri}
          title={bookTitle}
          author={bookAuthor}
          lastLocation={lastLocation}
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
