import { StyleSheet, Text, View } from "react-native";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import FileInput from "@/components/ui/file-input";

export default function UploadScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>
          Book metadata
        </Text>

        <Text style={styles.pageSubtitle}>
          Once your file is uploaded, you can edit the metadata if you need
        </Text>
      </View>

      <View style={styles.metadataSection}>
        <FileInput
          title="Custom cover"
          instruction="Select a .jpg or .png file"
          fileTypes="image/*"
        />

        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View style={{ gap: 8 }}>
            <Input placeholder="Title" />
            <Input placeholder="Author" />
          </View>

          <Button label="Save book" />
        </View>
      </View>

      <View style={{ width: "100%" }}>
        <FileInput
          title="Upload your e-book"
          instruction="Select an .epub file"
          fileTypes="application/epub+zip"
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
    fontFamily: "Bitter_700Bold",
    color: "#1E1E1E",
  },
  pageSubtitle: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: "#1E1E1E",
    opacity: 0.6,
  },
  metadataSection: {
    flexDirection: "row",
    gap: 16,
  },
});