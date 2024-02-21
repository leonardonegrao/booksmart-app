import { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as FileSystem from "expo-file-system";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import FileInput, { HandleUploadResponse } from "@/components/ui/file-input";
import Text from "@/components/ui/text";
import { useAuth } from "@/context/AuthContext";

import api from "@/services/api";
import getMetadata from "@/utils/getMetadata";

export default function UploadScreen() {
  const { authState } = useAuth();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [language, setLanguage] = useState("");
  const [file, setFile] = useState<HandleUploadResponse | null>(null);
  const [folder, setFolder] = useState("");
  const [coverLocalPath, setCoverLocalPath] = useState<string | null>("");

  const [buttonLabel, setButtonLabel] = useState("Upload book");

  const handleUpload = async (data: HandleUploadResponse) => {
    setButtonLabel("Loading data, please wait");

    setFile(data);

    const fileData = await FileSystem.readAsStringAsync(data.uri, { encoding: "base64" });

    const { metadata, coverLocalPath, folderUri } = await getMetadata(fileData, data.name);
    
    if (metadata.title)
      setTitle(metadata.title);
    if (metadata.author)
      setAuthor(metadata.author);
    if (metadata.language)
      setLanguage(metadata.language);
    if (coverLocalPath)
      setCoverLocalPath(coverLocalPath);
    if (folderUri)
      setFolder(folderUri);

    setButtonLabel("Upload book");
  };

  const handleSaveBook = async () => {
    if (!file) return;

    setButtonLabel("Uploading you book to the cloud, this may take a while");
    
    const response = await api.createBook({
      title,
      author,
      language,
      file,
      name: file.name.split(".")[0],
      userId: authState!.userData.id!,
      coverLocalPath: coverLocalPath!,
      folder,
    });

    if (response.status === "error") {
      alert(`An error occurred while trying to upload your book: ${response.message}`, );
      return;
    }

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
          <Input placeholder="Title" value={title} onChangeText={(text) => setTitle(text)} />
          <Input placeholder="Author" value={author} onChangeText={(text) => setAuthor(text)} />
          <Input placeholder="Language" value={language} onChangeText={(text) => setLanguage(text)} />
        </View>

        <Button label={buttonLabel} onPress={handleSaveBook} />
      </View>

      <View style={{ width: "100%" }}>
        <FileInput
          title={file ? file.name : "Upload your book"}
          instruction={file ? "Your file is ready" : "Select your .epub file"}
          fileTypes="application/epub+zip"
          value={file}
          onChange={handleUpload}
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
