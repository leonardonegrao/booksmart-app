import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { ReaderProvider } from "@/lib/custom-reader";

import ReaderContainer from "@/components/reader/reader-container";
import db from "@/services/db";

export default function ReaderScreen({ bookId }: { bookId: string }) {
  const [bookUri, setBookUri] = useState<string>("");
  const [bookTitle, setBookTitle] = useState<string>("");
  const [bookAuthor, setBookAuthor] = useState<string>("");
  const [lastLocation, setLastLocation] = useState<string>("");

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
