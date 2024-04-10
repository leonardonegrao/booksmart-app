import type { Database } from "@nozbe/watermelondb";
import { DatabaseService } from "../services/db";

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

export interface UpdateBookInput extends Partial<InsertBookInput> {
  id: string;
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

export interface StorageActions extends DatabaseService {
  saveBookFiles: (uri: string, name: string) => Promise<{
    metadata: {
        title: string | null | undefined;
        author: string | null | undefined;
        language: string | null | undefined;
    };
    coverImagePath: string;
    coverLocalPath: string;
    folderUri: string;
    opfUri: string}>;
}

export interface StorageProps {
  db: Database | null;
  actions: StorageActions;
}
