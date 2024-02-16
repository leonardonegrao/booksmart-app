import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import ReaderContainer from "@/components/reader/reader-container";
import db from "@/services/db";

export default function ReaderScreen({ bookId }: { bookId: string }) {
  const [bookUri, setBookUri] = useState<string>("");

  useEffect(() => {
    const fetchBook = async () => {
      const bookResponse = await db.getBook(bookId);

      if (!bookResponse) {
        alert("Error getting book");
        return;
      }

      setBookUri(bookResponse.bookLocalUri);
    };

    fetchBook();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ReaderContainer
        bookUri={bookUri}
      />
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
