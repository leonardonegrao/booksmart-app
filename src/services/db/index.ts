import * as SQLite from "expo-sqlite";

import * as dbActions from "./db-actions";

import type { SQLiteDatabase } from "expo-sqlite";
import type { CreateBookAPIResponse } from "../api/create-book/types";

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

const books = {
  createBooksTable: (db: SQLiteDatabase) => {
    return dbActions.createTable({
      db,
      tableName: "books",
      fields: [
        { key: "id", type: "TEXT" },
        { key: "filename", type: "TEXT" },
        { key: "userId", type: "TEXT" },
        { key: "bookBucketKey", type: "TEXT" },
        { key: "bookLocalUri", type: "TEXT" },
        { key: "epubLocalUri", type: "TEXT" },
        { key: "coverBucketKey", type: "TEXT" },
        { key: "coverLocalUri", type: "TEXT" },
        { key: "title", type: "TEXT" },
        { key: "author", type: "TEXT" },
        { key: "percentageRead", type: "INTEGER" },
        { key: "lastLocation", type: "TEXT" },
        { key: "language", type: "TEXT" },
      ],
    });
  },
  dropBooksTable: (db: SQLiteDatabase) => {
    return dbActions.dropTable({ db, tableName: "books" });
  },
  insertBook: (db: SQLiteDatabase, bookData: InsertBookInput) => {
    return dbActions.insertRow({
      db,
      tableName: "books",
      fields: [
        "id",
        "filename",
        "userId",
        "bookBucketKey",
        "bookLocalUri",
        "epubLocalUri",
        "coverBucketKey",
        "coverLocalUri",
        "title",
        "author",
        "percentageRead",
        "lastLocation",
        "language",
      ],
      values: [
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
    });
  },
  updateBook: (db: SQLiteDatabase, bookData: InsertBookInput) => {
    return dbActions.insertRow({
      db,
      tableName: "books",
      fields: [
        "id",
        "filename",
        "userId",
        "bookBucketKey",
        "bookLocalUri",
        "epubLocalUri",
        "coverBucketKey",
        "coverLocalUri",
        "title",
        "author",
        "percentageRead",
        "lastLocation",
        "language",
      ],
      values: [
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
    });
  },
  getBooks: (db: SQLiteDatabase) => {
    return dbActions.getAll({ db, tableName: "books" });
  },
  getBook: (db: SQLiteDatabase, bookId: string) => {
    return dbActions.getOne({
      db,
      tableName: "books",
      fieldFilter: "id",
      valueFilter: bookId,
    });
  },
};

const highlights = {
  createHighlightsTable: (db: SQLiteDatabase) => {
    return dbActions.createTable({
      db,
      tableName: "highlights",
      fields: [
        { key: "id", type: "TEXT" },
        { key: "bookId", type: "TEXT" },
        { key: "location", type: "TEXT" },
        { key: "color", type: "TEXT" },
        { key: "content", type: "TEXT" },
      ],
    });
  },
  dropHighlightsTable: (db: SQLiteDatabase) => {
    return dbActions.dropTable({ db, tableName: "highlights" });
  },
  insertHighlight: (db: SQLiteDatabase, bookId: string, location: string, color: string, content: string) => {
    return dbActions.insertRow({
      db,
      tableName: "highlights",
      fields: ["id", "bookId", "location", "color", "content"],
      values: [`${bookId}-${location}`, bookId, location, color, content],
    });
  },
  deleteHighlight: (db: SQLiteDatabase, highlightId: string) => {
    return dbActions.deleteRow({
      db,
      tableName: "highlights",
      fieldFilter: "id",
      valueFilter: highlightId,
    });
  },
  getHighlights: (db: SQLiteDatabase, bookId: string) => {
    return dbActions.getMany({
      db,
      tableName: "highlights",
      fieldFilter: "bookId",
      valueFilter: bookId,
    });
  },
};

export default {
  openDatabase,
  books,
  highlights,
};
