import db from "@/src/services/db";
import type { InsertBookInput } from "@/src/services/db";
import type { SQLiteDatabase } from "expo-sqlite";

export const createBookLocalDb = async (data: InsertBookInput, dbInstance: SQLiteDatabase) => {
  db.createBookTable(dbInstance);
  db.insertBook(dbInstance, data);
};
