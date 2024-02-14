export interface Book {
  id: string;
  userId: string;
  filename: string;
  bookUrl: string;
  bookLocalUri: string;
  percentageRead: number;
  title: string;
  author: string;
  coverUrl?: string;
  language: "en" | "es" | "fr" | "de" | "it" | "pt";
}
