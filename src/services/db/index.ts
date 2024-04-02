import { Database } from "@nozbe/watermelondb";
import { database } from "./model";

import type { InsertBookInput, InsertHighlightInput } from "@/src/@types/storage";
import BookModel from "./model/book";
import HighlightModel from "./model/highlight";

export default {
  openDatabase: () => {
    return database;
  },
  books: {
    insert: async (db: Database, bookData: InsertBookInput) => {
      const newBook = await db.get<BookModel>("books").create(book => {
        book.bookBucketKey = bookData.bookBucketKey;
        book.coverBucketKey = bookData.coverBucketKey;
        book.title = bookData.title;
        book.author = bookData.author;
        book.percentageRead = bookData.percentageRead;
        book.lastLocation = bookData.lastLocation;
        book.language = bookData.language;
      });

      return newBook;
    },
    update: () => {},
    delete: () => {},
    getAll: async (db: Database) => {
      return db.get<BookModel>("books");
    },
    findOne: async (db: Database, bookId: string) => {
      return db.get<BookModel>("books").find(bookId);
    },
  },
  highlights: {
    insert: async (db: Database, highlightData: InsertHighlightInput) => {
      const newHighlight = await db.get<HighlightModel>("highlights").create(highlight => {
        highlight.location = highlightData.location;
        highlight.color = highlightData.color;
        highlight.content = highlightData.content;
        highlight.bookId = highlightData.bookId;
      });

      return newHighlight;
    },
    delete: () => {},
  },
};
