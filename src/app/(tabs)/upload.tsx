import { StorageProvider } from "@/src/context/StorageContext";
import { SyncProvider } from "@/src/context/SyncContext";
import UploadScreen from "@/src/screens/tabs/upload";

export default function Upload() {
  return (
    <StorageProvider>
      <SyncProvider>
        <UploadScreen />
      </SyncProvider>
    </StorageProvider>
  );
}
