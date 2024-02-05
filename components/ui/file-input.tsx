import * as DocumentPicker from "expo-document-picker";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { UploadSquare } from "../icons";

interface FileInputProps {
  title: string;
  instruction: string;
  fileTypesLabel?: string;
  fileTypes: string | string[];
}

export default function FileInput({ title, instruction, fileTypesLabel, fileTypes }: FileInputProps) {
  const handleUpload = async () => {
    await DocumentPicker.getDocumentAsync({ type: fileTypes });
  };

  return (
    <TouchableOpacity onPress={handleUpload}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {title}
        </Text>

        <UploadSquare color="#939393" />

        <View style={{ alignItems: "center" }}>
          <Text style={styles.instruction}>
            {instruction}
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
    fontFamily: "Bitter_700Bold",
    fontSize: 17,
  },
  instruction: {
    color: "#939393",
    fontFamily: "Bitter_400Regular",
    fontSize: 14,
    marginBottom: 4,
  },
  fileTypes: {
    color: "#939393",
    opacity: 0.7,
    fontFamily: "Bitter_400Regular",
    fontSize: 12,
  },
});