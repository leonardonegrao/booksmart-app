import { HandleUploadResponse } from "@/components/ui/file-input";

export interface CreateBookInput {
  name: string;
  userId: string;
  title: string;
  author: string;
  language: string;
  file: HandleUploadResponse;
  coverData: Blob;
}

export interface CreateBookResponse {
  status: "success" | "error";
  message: string;
}

export interface CreateBookAPIRequestInput extends CreateBookInput {
  percentageRead: number;
}

export interface CreateBookAPIResponse {
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
