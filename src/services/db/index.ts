import { Collection, Database } from "@nozbe/watermelondb";
import { database } from "./model";

import type { InsertBookInput, InsertHighlightInput, UpdateBookInput } from "@/src/@types/storage";
import BookModel from "./model/book";
import HighlightModel from "./model/highlight";

export interface DatabaseService {
  openDatabase: () => Database;
  books: {
    insert: (db: Database, bookData: InsertBookInput) => Promise<BookModel>;
    update: (db: Database, bookData: UpdateBookInput) => Promise<BookModel>;
    delete: (db: Database, bookId: string) => Promise<void>;
    getAll: (db: Database) => Promise<Collection<BookModel>>;
    findOne: (db: Database, bookId: string) => Promise<BookModel>;
    deleteAll: (db: Database) => Promise<void>;
  };
  highlights: {
    insert: (db: Database, highlightData: InsertHighlightInput) => Promise<HighlightModel>;
    delete: (db: Database, highlightId: string) => Promise<void>;
  };
}

const databaseService: DatabaseService = {
  openDatabase: () => {
    return database;
  },
  books: {
    insert: async (db: Database, bookData: InsertBookInput) => {
      const newBook = await db.write(async () => {
        return db.get<BookModel>("books").create(book => {
          book.userId = bookData.userId; // ok
          book.bookLocalUri = bookData.bookLocalUri; // ok
          book.epubLocalUri = bookData.epubLocalUri; // ok
          book.coverLocalUri = bookData.coverLocalUri; // ok
          book.bookBucketKey = "";
          book.coverBucketKey = "";
          book.title = bookData.title; // ok
          book.author = bookData.author; // ok
          book.percentageRead = bookData.percentageRead; // ok
          book.lastLocation = bookData.lastLocation; // ok
          book.language = bookData.language; // ok
        });
      });

      return newBook;
    },
    update: async (db: Database, bookData: UpdateBookInput) => {
      const updatedBook = await db.write(async () => {
        const book = await db.get<BookModel>("books").find(bookData.id);

        return await book.update(b => {
          if (bookData.author) {
            b.author = bookData.author;
          }

          if (bookData.title) {
            b.title = bookData.title;
          }

          if (bookData.lastLocation) {
            b.lastLocation = bookData.lastLocation;
          }

          if (bookData.percentageRead) {
            b.percentageRead = bookData.percentageRead;
          }
        });
      });

      return updatedBook;
    },
    delete: async (db: Database, bookId: string) => {
      const book = await db.get<BookModel>("books").find(bookId);

      await db.write(async () => {
        await book.destroyPermanently();
      });
    },
    getAll: async (db: Database) => {
      return db.get<BookModel>("books");
    },
    findOne: async (db: Database, bookId: string) => {
      return db.get<BookModel>("books").find(bookId);
    },
    deleteAll: async (db: Database) => {
      const books = await db.get<BookModel>("books").query().fetch();
      const deletedBooks = books.map(book => book.prepareDestroyPermanently());
      db.batch(deletedBooks);
    },
  },
  highlights: {
    insert: async (db: Database, highlightData: InsertHighlightInput) => {
      const newHighlight = await db.write(async () => {
        return db.get<HighlightModel>("highlights").create(highlight => {
          highlight.location = highlightData.location;
          highlight.color = highlightData.color;
          highlight.content = highlightData.content;
          highlight.book.id = highlightData.bookId;
        });
      });

      return newHighlight;
    },
    delete: async (db:Database, highlightId: string) => {
      const highlight = await db.get<HighlightModel>("highlights").find(highlightId);

      await db.write(async () => {
        await highlight.destroyPermanently();
      });
    },
  },
};

export default databaseService;
