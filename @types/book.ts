export interface Book {
  id: string;
  userId: string;
  filename: string;
  bookBucketKey: string;
  bookLocalUri: string;
  percentageRead: number;
  title: string;
  author: string;
  bookCoverKey?: string;
  language: "en" | "es" | "fr" | "de" | "it" | "pt";
}
