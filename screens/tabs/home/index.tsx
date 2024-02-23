import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Text from "@/components/ui/text";
import BookItem from "@/components/home/book";

import api from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { Book } from "@/@types/book";
import BooksList from "@/components/home/books-list";
import EmptyState from "@/components/home/empty-state";

interface LibraryBooks {
  inProgress: Book[];
  finished: Book[];
  notStarted: Book[];
}

export default function HomeScreen() {
  const { authState } = useAuth();
  const [library, setLibrary] = useState<LibraryBooks>({ inProgress: [], finished: [], notStarted: []});
  const [isEmpty, setIsEmpty] = useState(false);

  const getBooks = async () => {
    try {
      if (authState?.userData.id) {
        const result = await api.getBooks(authState!.userData.id);

        if (result.length === 0) {
          setIsEmpty(true);
          return;
        }

        const newLibraryState: LibraryBooks = {
          inProgress: [],
          finished: [],
          notStarted: [],
        };

        result.forEach((book: Book) => {
          if (book.percentageRead === 100) {
            newLibraryState.finished.push(book);
          } else if (book.percentageRead === 0) {
            newLibraryState.notStarted.push(book);
          } else {
            newLibraryState.inProgress.push(book);
          }

        });

        setLibrary(newLibraryState);
      }
    } catch (e) {
      alert("An error occurred while trying to fetch the books");
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <View style={styles.container}>
      {isEmpty && <EmptyState />}

      {library.inProgress.length > 0 && (
        <View style={styles.section}>
          <Text fontType="serifBold" style={styles.title}>
            Continue reading ({library.inProgress.length})
          </Text>

          <View style={styles.booksList}>
            {library.inProgress.map((book) => (
              <BookItem
                key={book.id}
                bookId={book.id}
                title={book.title}
                coverKey={book.coverBucketKey!}
                coverUri={book.coverLocalUri!}
                percentageRead={book.percentageRead}
              />
            ))}
          </View>
        </View>
      )}

      {library.notStarted.length > 0 && (
        <BooksList
          title={`Not started (${library.notStarted.length})`}
          list={library.notStarted}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  section: {
    gap: 14,
  },
  title: {
    fontSize: 17,
    color: "#1E1E1E",
    padding: 16,
  },
  booksList: {
    paddingHorizontal: 16,
    gap: 16,
  },
});
