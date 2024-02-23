import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

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
          if (book.percentageRead === 0) {
            newLibraryState.notStarted.push(book);
          } else if (book.percentageRead === 100) {
            newLibraryState.finished.push(book);
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

      <ScrollView>
        {library.inProgress.length > 0 && (
          <BooksList
            title={`Continue reading (${library.notStarted.length})`}
            list={library.notStarted}
          />
        )}

        {library.notStarted.length > 0 && (
          <BooksList
            title={`Not started (${library.notStarted.length})`}
            list={library.notStarted}
          />
        )}

        {library.finished.length > 0 && (
          <BooksList
            title={`Finished (${library.finished.length})`}
            list={library.finished}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 24,
  },
});
