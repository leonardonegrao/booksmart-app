import { useLocalSearchParams } from "expo-router";
import ReaderScreen from "@/src/screens/reader";
import { StorageProvider } from "@/src/context/StorageContext";

export default function Reader() {
  const { id } = useLocalSearchParams();

  return (
    <StorageProvider>
      <ReaderScreen bookId={id as string} />
    </StorageProvider>
  );
}
