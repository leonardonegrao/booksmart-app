import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { CheckmarkSquare, TrashIcon } from "@/src/components/icons";
import BookPageHeader from "@/src/components/pages/book/header";
import View from "@/src/components/shared/view";
import Text from "@/src/components/ui/text";
import { useStorage } from "@/src/context/StorageContext";
import BookModel from "@/src/services/db/model/book";

interface BookPageScreenProps {
  book: BookModel;
}

export default function BookPageScreen({ book }: BookPageScreenProps) {
  const storage = useStorage();

  const onMarkAsFinished = async () => {
    await storage.actions.books.update(storage.db!, {
      id: book.id,
      percentageRead: 100,
    });
  };

  const onDelete = async () => {
    await storage.actions.books.delete(storage.db!, book.id);
    router.navigate("/(tabs)/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <BookPageHeader
        title={book.title}
        author={book.author}
        coverLocalUri={book.coverLocalUri}
      />

      <View direction="row" style={styles.actions}>
        <TouchableOpacity style={styles.markAsFinishedButton} onPress={onMarkAsFinished}>
          <Text fontType="serifBold" style={{ fontSize: 16, color: "#1E1E1E" }}>Mark as finished</Text>
          <CheckmarkSquare color="#1E1E1E" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text fontType="serifBold" style={{ fontSize: 16, color: "#ED7979" }}>Delete book</Text>
          <TrashIcon color="#ED7979" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 16,
    gap: 16,
  },
  actions: {
    padding: 16,
  },
  markAsFinishedButton: {
    flexDirection: "row",
    opacity: 0.7,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  deleteButton: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
});
