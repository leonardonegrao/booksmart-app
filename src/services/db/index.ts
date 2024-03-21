import * as SQLite from "expo-sqlite";
import * as dbActions from "./db-actions";

import type { SQLiteDatabase } from "expo-sqlite";
import type { InsertBookInput, InsertHighlightInput } from "@/src/@types/storage";

const database = {
  openDatabase: () => {
    const db = SQLite.openDatabase("booksmart.db");
    return db;
  },
  books: {
    createTable: (db: SQLiteDatabase) => {
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
    dropTable: (db: SQLiteDatabase) => {
      return dbActions.dropTable({ db, tableName: "books" });
    },
    insert: (db: SQLiteDatabase, bookData: InsertBookInput) => {
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
    update: (db: SQLiteDatabase, bookData: InsertBookInput) => {
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
    getAll: (db: SQLiteDatabase) => {
      return dbActions.getAll({ db, tableName: "books" });
    },
    findOne: (db: SQLiteDatabase, bookId: string) => {
      return dbActions.getOne({
        db,
        tableName: "books",
        fieldFilter: "id",
        valueFilter: bookId,
      });
    },
  },
  highlights: {
    createTable: (db: SQLiteDatabase) => {
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
    dropTable: (db: SQLiteDatabase) => {
      return dbActions.dropTable({ db, tableName: "highlights" });
    },
    insert: (db: SQLiteDatabase, highlightData: InsertHighlightInput) => {
      return dbActions.insertRow({
        db,
        tableName: "highlights",
        fields: ["id", "bookId", "location", "color", "content"],
        values: [
          `${highlightData.bookId}-${highlightData.location}`,
          highlightData.bookId,
          highlightData.location,
          highlightData.color,
          highlightData.content,
        ],
      });
    },
    delete: (db: SQLiteDatabase, highlightId: string) => {
      return dbActions.deleteRow({
        db,
        tableName: "highlights",
        fieldFilter: "id",
        valueFilter: highlightId,
      });
    },
    getAllFromBook: (db: SQLiteDatabase, bookId: string) => {
      return dbActions.getMany({
        db,
        tableName: "highlights",
        fieldFilter: "bookId",
        valueFilter: bookId,
      });
    },
  },
};

export default database;
