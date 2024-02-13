import axios, { AxiosResponse } from "axios";
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
  coverData: Blob;
}

interface CreateBookAPIResponse {
  id: string;
  filename: string;
  userId: string;
  bookUrl: string;
  coverUrl: string;
  title: string;
  author: string;
  percentageRead: number;
  language: string;
}

async function createBook(input: CreateBookInput): Promise<void> {  
  const data = {
    ...input,
    percentageRead: 0,
  };

  try {
    const apiResponse: AxiosResponse<CreateBookAPIResponse> = await axios.post(`${API_URL}/books/upload`, data);

    if (apiResponse.status !== 201) {
      throw new Error("Failed to upload book");
    }

    const bookUploadURL = apiResponse.data.bookUrl;
    const bookLocalURI = input.file.uri;
    const uploadOptions: FileSystem.FileSystemUploadOptions = { fieldName: "file", httpMethod: "PUT" };

    const uploadBookFileResponse = await FileSystem.uploadAsync(bookUploadURL, bookLocalURI, uploadOptions);

    if (uploadBookFileResponse.status !== 200) {
      throw new Error("Failed to upload book");
    }

    const coverUploadURL = apiResponse.data.coverUrl;
    const coverBlob = input.coverData;
    const coverFile = new File([coverBlob], `${input.name}-cover.png`, { type: "image/png" });
    const formData = new FormData();
    formData.append("file", coverFile);

    const uploadCoverImageResponse = await fetch(coverUploadURL, {
      method: "PUT",
      body: formData,
    });

    if (uploadCoverImageResponse.status !== 200) {
      throw new Error("Failed to upload cover image");
    }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    alert("An error ocurred while uploading the book");
  }
}

export default {
  getBooks,
  createBook,
};
