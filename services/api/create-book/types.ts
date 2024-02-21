import { HandleUploadResponse } from "@/components/ui/file-input";

export interface CreateBookInput {
  name: string;
  userId: string;
  title: string;
  author: string;
  language: string;
  file: HandleUploadResponse;
  folder: string;
  coverLocalPath: string;
}

export interface CreateBookResponse {
  status: "success" | "error";
  message: string;
}

export interface CreateBookAPIRequestInput extends CreateBookInput {
  percentageRead: number;
  lastLocation: string;
}

export interface CreateBookAPIResponse {
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
  lastLocation: string;
  language: string;
}
