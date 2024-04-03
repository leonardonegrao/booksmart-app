import { createContext, useContext, useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";

import databaseService from "@/src/services/db";

import type { Database } from "@nozbe/watermelondb";
import type { StorageActions, StorageProps } from "@/src/@types/storage";
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
    return databaseService.openDatabase();
  });

  const openDb = () => {
    const db = databaseService.openDatabase();
    setDbInstance(db);
  };

  useEffect(() => {
    openDb();
  }, []);

  const storageActions: StorageActions = {
    saveBookFiles: async (uri: string, name: string) => {
      const fileData = await FileSystem.readAsStringAsync(uri, { encoding: "base64" });
      return await loadBook(fileData, name);
    },
    ...databaseService,
  };

  return (
    <StorageContext.Provider value={{ db: dbInstance, actions: storageActions }}>
      {children}
    </StorageContext.Provider>
  );
};
