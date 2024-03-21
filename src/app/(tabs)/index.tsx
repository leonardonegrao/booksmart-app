import { StorageProvider } from "@/src/context/StorageContext";
import HomeScreen from "@/src/screens/tabs/home";

export default function Home() {
  return (
    <StorageProvider>
      <HomeScreen />
    </StorageProvider>
  );
}
