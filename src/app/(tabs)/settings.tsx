import { StorageProvider } from "@/src/context/StorageContext";
import SettingsScreen from "@/src/screens/tabs/settings";

export default function Settings() {
  return (
    <StorageProvider>
      <SettingsScreen />
    </StorageProvider>
  );
}
