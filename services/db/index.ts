import * as SQLite from "expo-sqlite";
import type { SQLiteDatabase } from "expo-sqlite";
import type { CreateBookAPIResponse } from "../api/create-book/types";
import { Book } from "@/@types/book";

export interface InsertBookInput extends CreateBookAPIResponse {
  bookLocalUri: string;
  epubLocalUri: string;
  lastLocation: string;
  coverLocalUri: string;
}

const openDatabase = () => {
  const db = SQLite.openDatabase("booksmart.db");
  return db;
};

const dropBookTable = (db: SQLiteDatabase) => {
  let transactionResult: null | "success" | "error" = null;

  db.transaction((tx) => {
    tx.executeSql(
      "DROP TABLE IF EXISTS books;",
      [],
      () => transactionResult = "success" as const,
      () => {
        transactionResult = "error" as const;
        return false;
      },
    );
  });

  return transactionResult;
};

const createBookTable = (db: SQLiteDatabase) => {
  let transactionResult: null | "success" | "error" = null;

  db.transaction((tx) => {
    tx.executeSql(
      `
        CREATE TABLE IF NOT EXISTS books
        (
          id TEXT,
          filename TEXT,
          userId TEXT,
          bookBucketKey TEXT,
          bookLocalUri TEXT,
          epubLocalUri TEXT,
          coverBucketKey TEXT,
          coverLocalUri TEXT,
          title TEXT,
          author TEXT,
          percentageRead INTEGER,
          lastLocation TEXT,
          language TEXT
        );`,
    [],
    () => transactionResult = "success" as const,
    () => {
      transactionResult = "error" as const;
      return false;
    },
    );
  });

  return transactionResult;
};

const insertBook = (db: SQLiteDatabase, bookData: InsertBookInput) => {
  let transactionResult: null | "success" | "error" = null;

  db.transaction((tx) => {
    tx.executeSql(
      `
        INSERT INTO books
        (
          id,
          filename,
          userId,
          bookBucketKey,
          bookLocalUri,
          epubLocalUri,
          coverBucketKey,
          coverLocalUri,
          title,
          author,
          percentageRead,
          lastLocation,
          language
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        bookData.id,
        bookData.filename,
        bookData.userId,
        bookData.bookBucketKey,
        bookData.bookLocalUri,
        bookData.epubLocalUri,
        bookData.coverBucketKey,
        bookData.coverLocalUri,
        bookData.title,
        bookData.author,
        bookData.percentageRead,
        bookData.lastLocation,
        bookData.language,
      ],
      () => transactionResult = "success" as const,
      () => {
        transactionResult = "error" as const;
        return false;
      },
    );
  });

  return transactionResult;
};

const updateBookProgress = (db: SQLiteDatabase, bookId: string, percentageRead: number, location: string) => {
  let transactionResult: null | "success" | "error" = null;

  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE books SET percentageRead = ?, lastLocation = ? WHERE id = ?;",
      [percentageRead, location, bookId],
      () => transactionResult = "success" as const,
      () => {
        transactionResult = "error" as const;
        return false;
      },
    );
  });

  return transactionResult;
};

const getBooks = (db: SQLiteDatabase, userId: string) => {
  return new Promise<Book[]>((resolve) => {
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
        () => {
          return false;
        },
      );
    });
  });
};

const getBook = (bookId: string) => {
  const db = openDatabase();

  return new Promise<Book>((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM books WHERE id = ?;",
        [bookId],
        (_, { rows }) => {
          resolve(rows.item(0));
        },
        () => {
          return false;
        },
      );
    });
  });
};

const createHighlightsTable = (db: SQLiteDatabase) => {
  let transactionResult: null | "success" | "error" = null;

  db.transaction((tx) => {
    tx.executeSql(
      `
        CREATE TABLE IF NOT EXISTS highlights
        (
          id TEXT,
          bookId TEXT,
          location TEXT,
          color TEXT,
          content TEXT
        );`,
    [],
    () => transactionResult = "success" as const,
    () => {
      transactionResult = "error" as const;
      return false;
    },
    );
  });

  return transactionResult;
};

const dropHighlightsTable = (db: SQLiteDatabase) => {
  let transactionResult: null | "success" | "error" = null;

  db.transaction((tx) => {
    tx.executeSql(
      "DROP TABLE IF EXISTS highlights;",
      [],
      () => transactionResult = "success" as const,
      () => {
        transactionResult = "error" as const;
        return false;
      },
    );
  });

  return transactionResult;
};

const insertHighlight = (db: SQLiteDatabase, bookId: string, location: string, color: string, content: string) => {
  let transactionResult: null | "success" | "error" = null;

  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO highlights (id, bookId, location, color, content) VALUES (?, ?, ?, ?, ?);",
      [bookId + location, bookId, location, color, content],
      () => transactionResult = "success" as const,
      () => {
        transactionResult = "error" as const;
        return false;
      },
    );
  });

  return transactionResult;
};

const deleteHighlight = (db: SQLiteDatabase, bookId: string, location: string) => {
  let transactionResult: null | "success" | "error" = null;

  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM highlights WHERE bookId = ? AND location = ?;",
      [bookId, location],
      () => transactionResult = "success" as const,
      () => {
        transactionResult = "error" as const;
        return false;
      },
    );
  });

  return transactionResult;
};

const getHighlights = (db: SQLiteDatabase, bookId: string) => {
  return new Promise<string[]>((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM highlights WHERE bookId = ?;",
        [bookId],
        (_, { rows }) => {
          const highlights: string[] = [];
          for (let i = 0; i < rows.length; i++) {
            highlights.push(rows.item(i).location);
          }
          resolve(highlights);
        },
        () => {
          return false;
        },
      );
    });
  });
};

export default {
  openDatabase,
  createBookTable,
  dropBookTable,
  insertBook,
  getBooks,
  getBook,
  updateBookProgress,
  createHighlightsTable,
  dropHighlightsTable,
  insertHighlight,
  deleteHighlight,
  getHighlights,
};
