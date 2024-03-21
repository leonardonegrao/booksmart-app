import { createContext, useContext, useEffect, useState } from "react";
import type { SQLiteDatabase } from "expo-sqlite";
import type {
  DataType,
  DataTypeMap,
  InsertBookInput,
  InsertHighlightInput,
  StorageProps,
} from "@/src/@types/storage";

import database from "@/src/services/db";

const initialValue: StorageProps = {
  db: null,
  actions: {
    save: () => {},
  },
};

const StorageContext = createContext<StorageProps>(initialValue);

export const useStorage = () => {
  return useContext(StorageContext);
};

export const StorageProvider = ({ children }: { children: React.ReactNode }) => {
  const [dbInstance, setDbInstance] = useState<SQLiteDatabase>(() => {
    return database.openDatabase();
  });

  const openDb = () => {
    const db = database.openDatabase();
    setDbInstance(db);
  };

  const createTables = () => {
    if (!dbInstance) return;
    database.books.createTable(dbInstance);
    database.highlights.createTable(dbInstance);
  };

  useEffect(() => {
    openDb();
    createTables();
  }, []);

  const storageActions = {
    save: <T extends DataType>(type: T, data: DataTypeMap[T]) => {
      if (!dbInstance) return { error: "DB is not defined." };
      
      if (type === "book") {
        database.books.insert(dbInstance, data as InsertBookInput);
      }
      
      if (type === "highlight") {
        database.highlights.insert(dbInstance, data as InsertHighlightInput);
      }
    },
  };

  return (
    <StorageContext.Provider value={{ db: dbInstance, actions: storageActions }}>
      {children}
    </StorageContext.Provider>
  );
};
