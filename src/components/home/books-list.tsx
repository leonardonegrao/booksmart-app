import { FlatList, StyleSheet, View } from "react-native";

import Text from "@/src/components/ui/text";
import BookItem from "./book";

import type { Book } from "@/src/@types/book";

interface BooksListProps {
  title: string;
  list: Book[];
}

function renderItem({ item }: { item: Book }) {
  return (
    <BookItem
      bookId={item.id}
      title={item.title}
      coverKey={item.coverBucketKey!}
      coverUri={item.coverLocalUri!}
      percentageRead={item.percentageRead}
    />
  );
}

export default function BooksList({ title, list }: BooksListProps) {
  return (
    <View>
      <Text fontType="serifBold" style={styles.title}>
        {title}
      </Text>

      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={renderItem}
        style={{ flexGrow: 0 }}
        horizontal
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: "#1E1E1E",
    padding: 16,
  },
  list: {
    paddingHorizontal: 16,
    gap: 16,
  },
});
