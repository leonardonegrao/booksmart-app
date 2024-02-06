export interface Book {
  id: string;
  userId: string;
  filename: string;
  url: string;
  percentageRead: number;
  title: string;
  author: string;
  coverUrl?: string;
  language: "en" | "es" | "fr" | "de" | "it" | "pt";
}