import db from "@/src/services/db";
import type { Book } from "@/src/@types/book";

async function getBooks(userId: string): Promise<Book[]> {
  const dbInstance = db.openDatabase();
  await db.createBookTable(dbInstance);
  return db.getBooks(dbInstance, userId);
}

export default getBooks;
