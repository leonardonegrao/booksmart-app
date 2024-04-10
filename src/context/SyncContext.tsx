import { createContext, useContext, useState } from "react";
import ky, { HTTPError } from "ky";
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

      const requestBody = {
        id: input.id,
        userId: input.userId,
        name: input.name,
        title: input.title,
        author: input.author,
        language: input.language,
        percentageRead: input.percentageRead,
        lastLocation: input.lastLocation,
      };
      
      try {
        const response = await api.post("books/upload", {
          json: requestBody,
        }).json<CreateBookApiResponse>();

        await uploadBookFile(response.bookSignedUrl, input.file.uri);
        await uploadBookCover(response.coverSignedUrl, input.coverLocalUri);
      } catch (e: any) {
        console.error(e.message);
      }
    },
  };

  return (
    <SyncContext.Provider value={{ api, actions: syncActions, isSyncEnabled }}>
      {children}
    </SyncContext.Provider>
  );
};
