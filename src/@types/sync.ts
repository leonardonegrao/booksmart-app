import type { KyInstance } from "ky";

export interface FileData {
  name: string;
  uri: string;
  type?: string;
  size?: number;
}

export interface CreateBookInput {
  id: string;
  userId: string;
  name: string;
  title: string;
  author: string;
  language: string;
  percentageRead: number;
  lastLocation: string;
  file: FileData;
  coverLocalUri: string;
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
