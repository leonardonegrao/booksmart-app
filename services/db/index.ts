import * as SQLite from "expo-sqlite";
import type { SQLiteDatabase } from "expo-sqlite";
import type { CreateBookAPIResponse } from "../api/create-book/types";
import { Book } from "@/@types/book";

export interface InsertBookInput extends CreateBookAPIResponse {
  bookLocalUri: string;
}

const openDatabase = () => {
  const db = SQLite.openDatabase("booksmart.db");
  return db;
};

const dropBookTable = (db: SQLiteDatabase) => {
  db.transaction((tx) => {
    tx.executeSql(
      "DROP TABLE IF EXISTS books;",
      [],
      () => console.log("Table dropped successfully"),
      (error) => {
        console.error("Error dropping table", error);
        return false;
      },
    );
  });
};

const createBookTable = (db: SQLiteDatabase) => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS books (id TEXT, filename TEXT, userID TEXT, bookBucketKey TEXT, bookLocalUri TEXT, coverBucketKey TEXT, title TEXT, author TEXT, percentageRead INTEGER, language TEXT);",
    [],
    () => console.log("Table created successfully"),
    (error) => {
      console.error("Error creating table", error);
      return false;
    },
    );
  });
};

const insertBook = (db: SQLiteDatabase, bookData: InsertBookInput) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO books (id, filename, userId, bookBucketKey, bookLocalUri, coverBucketKey, title, author, percentageRead, language) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
      [
        bookData.id,
        bookData.filename,
        bookData.userId,
        bookData.bookBucketKey,
        bookData.bookLocalUri,
        bookData.coverBucketKey,
        bookData.title,
        bookData.author,
        bookData.percentageRead,
        bookData.language,
      ],
      () => console.log("Book inserted successfully"),
      (error) => {
        console.error("Error inserting book", error);
        return false;
      },
    );
  });
};

const getBooks = (db: SQLiteDatabase, userId: string) => {
  return new Promise<Book[]>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM books WHERE userId = ?;",
        [userId],
        (_, { rows }) => {
          const books: Book[] = [];
          for (let i = 0; i < rows.length; i++) {
            books.push(rows.item(i));
          }
          resolve(books);
        },
        (error) => {
          console.error("Error getting books", error);
          return false;
        },
      );
    });
  });
};

export default {
  openDatabase,
  createBookTable,
  insertBook,
  getBooks,
};
