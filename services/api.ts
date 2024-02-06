import axios from "axios";
import * as FileSystem from "expo-file-system";

import { Book } from "@/@types/book";
import { HandleUploadResponse } from "@/components/ui/file-input";

const API_URL = "http://localhost:3333";

async function getBooks(userId: string): Promise<Book[]> {
  const response = await axios.get(`http://localhost:3333/books/${userId}`);
  return response.data;
}

interface CreateBookInput {
  name: string;
  userId: string;
  title: string;
  author: string;
  language: string;
  file: HandleUploadResponse;
}

async function createBook(input: CreateBookInput): Promise<void> {  
  const data = {
    ...input,
    percentageRead: 0,
  };

  try {
    const apiResponse = await axios.post(`${API_URL}/books/upload`, data);

    if (apiResponse.status !== 201) {
      throw new Error("Failed to upload book");
    }

    const bucketResponse = await FileSystem.uploadAsync(apiResponse.data.url, input.file.uri, {
      fieldName: "file",
      httpMethod: "PUT",
    });

    if (bucketResponse.status !== 200) {
      throw new Error("Failed to upload book");
    }
  } catch (e) {
    alert("An error ocurred while uploading the book");
  }
}

export default {
  getBooks,
  createBook,
};