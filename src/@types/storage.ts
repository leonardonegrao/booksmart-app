import type { SQLiteDatabase } from "expo-sqlite";

// Database actions

export interface CreateTableInput {
  db: SQLiteDatabase;
  tableName: string;
  fields: { key: string; type: string }[];
}

export interface DropTableInput {
  db: SQLiteDatabase;
  tableName: "books" | "highlights";
}

export interface InsertRowInput {
  db: SQLiteDatabase;
  tableName: "books" | "highlights";
  fields: string[];
  values: any[];
}

export interface GetAllInput {
  db: SQLiteDatabase;
  tableName: "books" | "highlights";
}

export interface GetManyInput extends GetAllInput {
  fieldFilter: string;
  valueFilter: string | number;
}

export interface GetOneInput extends GetManyInput {}

// DB service

export interface InsertBookInput {
  id: string;
  filename: string;
  userId: string;
  bookSignedUrl: string;
  bookBucketKey: string;
  coverSignedUrl: string;
  coverBucketKey: string;
  title: string;
  author: string;
  percentageRead: number;
  language: string;
  bookLocalUri: string;
  epubLocalUri: string;
  lastLocation: string;
  coverLocalUri: string;
}

export interface InsertHighlightInput {
  bookId: string;
  location: string;
  color: string;
  content: string;
}

// Storage context

export type DataTypeMap = {
  book: InsertBookInput;
  highlight: InsertHighlightInput;
};

export type DataType = keyof DataTypeMap;

export interface StorageProps {
  db: SQLiteDatabase | null;
  actions: {
    save: <T extends DataType>(type: T, data: DataTypeMap[T]) => void;
  };
}
