import { Platform } from "react-native";
import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import schema from "./schema";
import migrations from "./migrations";
import BookModel from "./book";
import HighlightModel from "./highlight";

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  jsi:  Platform.OS === "ios",
  onSetUpError: error => {
    console.log("Database setup error:", error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [
    BookModel,
    HighlightModel,
  ],
});

