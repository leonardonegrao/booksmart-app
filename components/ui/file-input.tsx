import * as DocumentPicker from "expo-document-picker";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { UploadSquare } from "../icons";
import { useState } from "react";

interface FileInputProps {
  title: string;
  instruction: string;
  fileTypesLabel?: string;
  fileTypes: string | string[];
  value: HandleUploadResponse | null;
  // eslint-disable-next-line no-unused-vars
  onChange: (file: HandleUploadResponse) => Promise<void>;
}

export interface HandleUploadResponse {
  name: string;
  uri: string;
  type?: string;
  size?: number;
}

type FileInputState = "default" | "uploading" | "uploaded" | "error";

export default function FileInput({ title, instruction, fileTypesLabel, fileTypes, value, onChange }: FileInputProps) {
  const [state, setState] = useState<FileInputState>("default");

  const handleUpload = async () => {
    setState("uploading");

    try {
      const docRes = await DocumentPicker.getDocumentAsync({ type: fileTypes });
      const assets = docRes.assets;

      if (!assets)
        return;

      const fileData = assets[0];

      const file: HandleUploadResponse = {
        name: fileData.name,
        uri: fileData.uri,
        type: fileData.mimeType,
        size: fileData.size,
      };
      
      await onChange(file);

      setState("uploaded");
    } catch (e) {
      setState("error");
    }

  };

  return (
    <TouchableOpacity onPress={handleUpload}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {state === "default" && title}
          {state === "uploading" && "Loading file..."}
          {state === "uploaded" && "File loaded"}
          {state === "error" && "Error while loading file"}
        </Text>

        {state === "default" && <UploadSquare color="#939393" />}
        {state === "uploading" && <ActivityIndicator color="#939393" />}

        <View style={{ alignItems: "center" }}>
          <Text style={styles.instruction}>
          {state === "default" && instruction}
          {state === "uploading" && value?.name}
          {state === "uploaded" && value?.name}
          </Text>

          {fileTypesLabel && (
            <Text style={styles.fileTypes}>
              {fileTypesLabel}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 28,
    paddingVertical: 38,
    gap: 56,
    backgroundColor: "#F2F2F2",
    borderRadius: 7,
    alignItems: "center",
  },
  title: {
    color: "#939393",
    fontFamily: "serif-bold",
    fontSize: 17,
  },
  instruction: {
    color: "#939393",
    fontFamily: "serif-regular",
    fontSize: 14,
    marginBottom: 4,
  },
  fileTypes: {
    color: "#939393",
    opacity: 0.7,
    fontFamily: "serif-regular",
    fontSize: 12,
  },
});
