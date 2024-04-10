import { createContext, useContext, useState } from "react";
import ky from "ky";
import { CreateBookApiResponse, CreateBookInput, SyncProps } from "../@types/sync";
import uploadBookFile from "../services/api/create-book/book-file-upload";
import uploadBookCover from "../services/api/create-book/book-cover-upload";

const SyncContext = createContext<SyncProps>({} as SyncProps);

export const useSync = () => {
  return useContext(SyncContext);
};

const API_URL = "http://192.168.1.206:3333";

export const SyncProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSyncEnabled, setIsSyncEnabled] = useState(true);
  const api = ky.create({
    prefixUrl: API_URL,
  });

  const syncActions: SyncProps["actions"] = {
    registerBook: async (input: CreateBookInput) => {
      if (!isSyncEnabled) {
        throw new Error("Sync is disabled");
      }
      // 1. create book in database
      const response = await api.post("/books", {
        json: {
          id: input.id,
          userId: input.userId,
          name: input.name,
          title: input.title,
          author: input.author,
          language: input.language,
          percentageRead: input.percentageRead,
          lastLocation: input.lastLocation,
        },
      }).json<CreateBookApiResponse>();
      // 2. upload book file to cloud
      await uploadBookFile(response.bookSignedUrl, input.file.uri);
      // 3. upload book cover to cloud
      await uploadBookCover(response.coverSignedUrl, input.coverLocalUri);
      // 4. update book in database
    },
  };

  return (
    <SyncContext.Provider value={{ api, actions: syncActions, isSyncEnabled }}>
      {children}
    </SyncContext.Provider>
  );
};
