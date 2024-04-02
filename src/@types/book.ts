export interface Book {
  id: string;
  userId: string;
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

export interface Location {
  atStart?: boolean;
  atEnd?: boolean;
  end: {
    cfi: string;
    displayed: {
      page: number;
      total: number;
    };
    href: string;
    index: number;
    location: number;
    percentage: number;
  };
  start: {
    cfi: string;
    displayed: {
      page: number;
      total: number;
    };
    href: string;
    index: number;
    location: number;
    percentage: number;
  };
}

export type Mark = "highlight" | "underline" | "note";
