import axios from "axios";
import db from "@/services/db";
import type { SQLiteDatabase } from "expo-sqlite";

const API_URL = "http://192.168.1.206:3333";

export default async function updateBookProgress(bookId: string, percentageRead: number, lastLocation: string) {
  const dbInstance: SQLiteDatabase = await db.openDatabase();
  const transactionResult = await db.updateBookProgress(dbInstance, bookId, percentageRead, lastLocation);

  if (transactionResult === "error") {
    return "error";
  }

  const response = await axios.patch(`${API_URL}/books/${bookId}`, {
    percentageRead,
    lastLocation,
  });

  if (response.status !== 200) {
    return "error";
  }

  return response.data;
}
