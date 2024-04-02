import { createContext, useContext, useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";

import database from "@/src/services/db";

import type { Database } from "@nozbe/watermelondb";
import type {
  DataType,
  DataTypeMap,
  InsertBookInput,
  InsertHighlightInput,
  StorageProps,
} from "@/src/@types/storage";
import loadBook from "../utils/loadBook";

const initialValue: StorageProps = {
  db: null,
  actions: {} as StorageProps["actions"],
};

const StorageContext = createContext<StorageProps>(initialValue);

export const useStorage = () => {
  return useContext(StorageContext);
};

export const StorageProvider = ({ children }: { children: React.ReactNode }) => {
  const [dbInstance, setDbInstance] = useState<Database>(() => {
    return database.openDatabase();
  });

  const openDb = () => {
    const db = database.openDatabase();
    setDbInstance(db);
  };

  useEffect(() => {
    openDb();
  }, []);

  const storageActions = {
    saveBookFiles: async (uri: string, name: string) => {
      const fileData = await FileSystem.readAsStringAsync(uri, { encoding: "base64" });
      return await loadBook(fileData, name);
    },
    save: async <T extends DataType>(type: T, data: DataTypeMap[T]) => {
      if (!dbInstance) return { error: "DB is not defined." };
      
      if (type === "book") {
        return database.books.insert(dbInstance, data as InsertBookInput);
      }
      
      if (type === "highlight") {
        return database.highlights.insert(dbInstance, data as InsertHighlightInput);
      }
    },
    getAll: async <T extends DataType>(type: T) => {
      if (!dbInstance) return;

      if (type === "book") {
        return database.books.getAll(dbInstance);
      }
    },
    findOne: async <T extends DataType>(type: T, field: string, value: string | number) => {
      if (!dbInstance) return;

      if (type === "book") {
        return database.books.findOne(dbInstance, value as string);
      }
    },
  };

  return (
    <StorageContext.Provider value={{ db: dbInstance, actions: storageActions }}>
      {children}
    </StorageContext.Provider>
  );
};
