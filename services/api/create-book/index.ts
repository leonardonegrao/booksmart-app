import type { SQLiteDatabase } from "expo-sqlite";
import { createBookAPIRequest } from "./api-request";
import { createBookLocalDb } from "./local-storage";
import type { CreateBookInput, CreateBookResponse } from "./types";
import uploadBookFile from "./book-file-upload";
import uploadBookCover from "./book-cover-upload";
import db from "@/services/db";

const createBook = async (input: CreateBookInput): Promise<CreateBookResponse> => {
  const data = { ...input, percentageRead: 0 };
  const dbInstance: SQLiteDatabase = await db.openDatabase();
  const response: CreateBookResponse = { status: "success", message: "Book created successfully" };

  try {
    const apiResponseData = await createBookAPIRequest(data);
    await createBookLocalDb({ ...apiResponseData, bookLocalUri: input.file.uri }, dbInstance);

    await uploadBookFile(apiResponseData.bookUrl, input.file.uri);
    await uploadBookCover(apiResponseData.coverUrl, input.coverData, input.name);

    return response;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    response.status = "error";
    response.message = error.message || "Unknown error";
    return response;
  }
};

export default createBook;
