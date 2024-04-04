import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { withObservables } from "@nozbe/watermelondb/react";

import BooksList from "@/src/components/home/books-list";
import EmptyState from "@/src/components/home/empty-state";

import type { Book } from "@/src/@types/book";
import BookModel from "@/src/services/db/model/book";
import { database } from "@/src/services/db/model";

interface HomeScreenProps {
  books: BookModel[];
}

interface LibraryBooks {
  inProgress: Book[];
  finished: Book[];
  notStarted: Book[];
}

function HomeScreen({ books }: HomeScreenProps) {
  const [library, setLibrary] = useState<LibraryBooks>({ inProgress: [], finished: [], notStarted: []});
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (books.length === 0) {
      setIsEmpty(true);
      return;
    }

    const inProgress = books.filter((book) => book.percentageRead > 0 && book.percentageRead < 100);
    const finished = books.filter((book) => book.percentageRead === 100);
    const notStarted = books.filter((book) => book.percentageRead === 0);

    setLibrary({ inProgress, finished, notStarted });
  }, []);

  return (
    <View style={styles.container}>
      {isEmpty && <EmptyState />}

      <ScrollView>
        {library.inProgress.length > 0 && (
          <BooksList
            title={`Continue reading (${library.inProgress.length})`}
            list={library.inProgress}
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

const enhance = withObservables([], () => ({
  books: database.collections.get<BookModel>("books").query().observe(),
}));

const EnhancedHomeScreen = enhance(HomeScreen);
export default EnhancedHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 24,
  },
});
