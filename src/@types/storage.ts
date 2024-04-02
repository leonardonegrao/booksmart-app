import type { Collection, Database } from "@nozbe/watermelondb";
import type Highlight from "./highlight";
import BookModel from "../services/db/model/book";
import HighlightModel from "../services/db/model/highlight";

// Database actions

export interface CreateTableInput {
  db: Database;
  tableName: string;
  fields: { key: string; type: string }[];
}

export interface DropTableInput {
  db: Database;
  tableName: "books" | "highlights";
}

export interface InsertRowInput {
  db: Database;
  tableName: "books" | "highlights";
  fields: string[];
  values: any[];
}

export interface UpdateRowInput {
  db: Database;
  tableName: "books" | "highlights";
  fields: string[];
  values: any[];
  id: string;
}

export interface GetAllInput {
  db: Database;
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
  userId: string;
  bookBucketKey?: string;
  coverBucketKey?: string;
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

export interface DataTypeMap {
  book: Omit<InsertBookInput, "id">;
  highlight: InsertHighlightInput;
}

export type DataType = keyof DataTypeMap;

export interface StorageProps {
  db: Database | null;
  actions: {
    saveBookFiles: (uri: string, name: string) => Promise<{
      metadata: {
          title: string | null | undefined;
          author: string | null | undefined;
          language: string | null | undefined;
      };
      coverImagePath: string;
      coverLocalPath: string;
      folderUri: string;
      opfUri: string;
    }>;
    save: <T extends DataType>(type: T, data: DataTypeMap[T]) => Promise<BookModel | HighlightModel | { error: string } | undefined>;
    update?: <T extends DataType>(type: T, data: DataTypeMap[T]) => void;
    remove?: <T extends DataType>(type: T, id: string) => void;
    getAll: <T extends keyof DataTypeMap>(type: T) => Promise<Collection<BookModel> | undefined>;
    findMany?: <T extends keyof DataTypeMap>(type: T, field: string, value: string | number) => Promise<Highlight[]> | undefined;
    findOne: <T extends keyof DataTypeMap>(type: T, field: string, value: string | number) => Promise<BookModel | undefined>;
    drop?: <T extends keyof DataTypeMap>(type: T) => {
      error: string;
    } | undefined;
  };
}
