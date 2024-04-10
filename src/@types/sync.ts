import type { KyInstance } from "ky";
import BookModel from "../services/db/model/book";

export interface FileData {
  name: string;
  uri: string;
  type?: string;
  size?: number;
}

export interface CreateBookInput extends BookModel {
  name: string;
  file: FileData;
  folder: string;
}

export interface CreateBookApiResponse {
  bookSignedUrl: string;
  coverSignedUrl: string;
  bookBucketKey: string;
  coverBucketKey: string;
}

export interface SyncProps {
  api: KyInstance;
  isSyncEnabled: boolean;
  actions: {
    registerBook: (input: CreateBookInput) => Promise<void>;
  };
}
