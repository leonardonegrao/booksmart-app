import { StorageProvider } from "@/src/context/StorageContext";
import UploadScreen from "@/src/screens/tabs/upload";

export default function Upload() {
  return (
    <StorageProvider>
      <UploadScreen />
    </StorageProvider>
  );
}
