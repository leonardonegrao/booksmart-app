import { Q } from "@nozbe/watermelondb";

import BookPageScreen from "@/src/screens/book";
import { database } from "@/src/services/db/model";
import BookModel from "@/src/services/db/model/book";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { StorageProvider } from "@/src/context/StorageContext";

export default function BookPage() {
  const { id } = useLocalSearchParams();
  const [book, setBook] = useState<BookModel | null>(null);

  useEffect(() => {
    (async () => {
      if (typeof id !== "string") return;

      const book = await database.collections.get<BookModel>("books").query(Q.where("id", id)).fetch();
      setBook(book[0]);
    })();
  }, []);

  if (!book) return null;

  return (
    <StorageProvider>
      <BookPageScreen book={book} />
    </StorageProvider>
  );
}
