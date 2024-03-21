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
        // handle files and save to storage
        database.books.insert(dbInstance, data as InsertBookInput);
      }
      
      if (type === "highlight") {
        database.highlights.insert(dbInstance, data as InsertHighlightInput);
      }
    },
    update: <T extends DataType>(type: T, data: DataTypeMap[T]) => {
      if (!dbInstance) return { error: "DB is not defined." };

      if (type === "book") {
        database.books.update(dbInstance, data as InsertBookInput);
      }
    },
    remove: <T extends DataType>(type: T, id: string) => {
      if (!dbInstance) return { error: "DB is not defined." };

      if (type === "book") {
        // delete files as well
        database.books.delete(dbInstance, id);
      }

      if (type === "highlight") {
        database.highlights.delete(dbInstance, id);
      }
    },
    getAll: <T extends DataType>(type: T) => {
      if (!dbInstance) return { error: "DB is not defined." };

      if (type === "book") {
        return database.books.getAll(dbInstance);
      }
    },
    findMany: <T extends DataType>(type: T, field: string, value: string | number) => {
      if (!dbInstance) return { error: "DB is not defined." };

      if (type === "highlight") {
        return database.highlights.getAllFromBook(dbInstance, value as string);
      }
    },
    findOne: <T extends DataType>(type: T, field: string, value: string | number) => {
      if (!dbInstance) return { error: "DB is not defined." };

      if (type === "book") {
        return database.books.findOne(dbInstance, value as string);
      }
    },
    drop: <T extends DataType>(type: T) => {
      if (!dbInstance) return { error: "DB is not defined." };

      if (type === "book") {
        // also delete files
        database.books.dropTable(dbInstance);
      }

      if (type === "highlight") {
        database.highlights.dropTable(dbInstance);
      }
    },
  };

  return (
    <StorageContext.Provider value={{ db: dbInstance, actions: storageActions }}>
      {children}
    </StorageContext.Provider>
  );
};
