export interface Book {
  id: string;
  userId: string;
  filename: string;
  bookBucketKey: string;
  bookLocalUri: string;
  epubLocalUri: string;
  percentageRead: number;
  lastLocation: string;
  title: string;
  author: string;
  coverBucketKey?: string;
  coverLocalUri: string;
  language: "en" | "es" | "fr" | "de" | "it" | "pt";
}
