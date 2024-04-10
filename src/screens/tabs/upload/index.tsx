import { useState } from "react";
import { StyleSheet, View } from "react-native";

import Button from "@/src/components/ui/button";
import FileInput from "@/src/components/ui/file-input";
import Text from "@/src/components/ui/text";
import { useAuth } from "@/src/context/AuthContext";

import { useStorage } from "@/src/context/StorageContext";
import { FileData } from "@/src/@types/sync";
import { useSync } from "@/src/context/SyncContext";
import BookModel from "@/src/services/db/model/book";

export default function UploadScreen() {
  const { authState } = useAuth();
  const sync = useSync();
  const storage = useStorage();

  const [createdBook, setCreatedBook] = useState<BookModel>({} as BookModel);
  const [file, setFile] = useState<FileData | null>(null);

  const [buttonLabel, setButtonLabel] = useState("Upload book");

  const loadBook = async (data: FileData) => {
    setButtonLabel("Loading data, please wait");

    setFile(data);

    const { metadata, coverLocalPath, opfUri } = await storage.actions.saveBookFiles(
      data.uri,
      data.name
    );
    
    const createdBook = await storage.actions.books.insert(storage.db!, {
      userId: authState!.userData.id!,
      title: metadata.title || "",
      author: metadata.author || "",
      language: metadata.language || "",
      coverLocalUri: coverLocalPath || "",
      epubLocalUri: data.uri,
      bookLocalUri: opfUri || "",
      percentageRead: 0,
      lastLocation: "",
    });

    setCreatedBook(createdBook);
    setButtonLabel("Upload book");
  };

  const handleSyncBook = async () => {
    if (!file) return;
    if (!sync.isSyncEnabled) return;

    setButtonLabel("Uploading you book to the cloud, this may take a while");

    if (!createdBook) return;
    
    await sync.actions.registerBook({
      id: createdBook.id,
      name: file.name.split(".")[0],
      userId: authState!.userData.id!,
      author: createdBook.author,
      title: createdBook.title,
      language: createdBook.language,
      coverLocalUri: createdBook.coverLocalUri,
      percentageRead: 0,
      lastLocation: "",
      file,
    });

    setButtonLabel("Book uploaded");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text fontType="serifBold" style={styles.pageTitle}>
          Book metadata
        </Text>

        <Text fontType="sansRegular" style={styles.pageSubtitle}>
          Once your file is loaded, you can edit the metadata if you need
        </Text>
      </View>

      <View style={styles.metadataSection}>
        <View style={{ gap: 8 }}>
        </View>

        <Button label={buttonLabel} onPress={handleSyncBook} />
      </View>

      <View style={{ width: "100%" }}>
        <FileInput
          title={file ? file.name : "Select your book"}
          instruction={file ? "Your file is ready" : "Select your .epub file"}
          fileTypes="application/epub+zip"
          value={file}
          onChange={loadBook}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 16,
    gap: 16,
  },
  header: {
    gap: 8,
    maxWidth: "75%",
    marginBottom: 10,
  },
  pageTitle: {
    fontSize: 17,
    color: "#1E1E1E",
  },
  pageSubtitle: {
    fontSize: 12,
    color: "#1E1E1E",
    opacity: 0.6,
  },
  metadataSection: {
    gap: 16,
    width: "100%",
  },
});
