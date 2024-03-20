import * as FileSystem from "expo-file-system";
import type { FileSystemUploadOptions } from "expo-file-system";

const uploadBookFile = async (destinationUrl: string, sourceUrl: string) => {
  const uploadOptions: FileSystemUploadOptions = { fieldName: "file", httpMethod: "PUT" };
  const uploadResponse = await FileSystem.uploadAsync(destinationUrl, sourceUrl, uploadOptions);

  if (uploadResponse.status !== 200) {
    throw new Error(`Failed to upload book file to destination ${uploadResponse.status.toString()}`);
  }

  return uploadResponse;
};

export default uploadBookFile;
