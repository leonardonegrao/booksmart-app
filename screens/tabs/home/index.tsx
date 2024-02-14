import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import Text from "@/components/ui/text";
import BookItem from "@/components/home/book";

import api from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { Book } from "@/@types/book";

export default function HomeScreen() {
  const { authState } = useAuth(); 
  const [books, setBooks] = useState<Book[]>([]);

  const getBooks = async () => {
    try {
      if (authState?.userData.id) {
        const result = await api.getBooks(authState!.userData.id);
        setBooks(result);
        return;
      }

      setBooks([]);
    } catch (e) {
      alert("An error occurred while trying to fetch the books");
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text fontType="serifBold" style={styles.title}>
          Continue reading ({books.length})
        </Text>

        <View style={styles.booksList}>
          {books.map(book => (
            <BookItem
              key={book.id}
              title={book.title}
              coverKey={book.bookBucketKey!}
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
