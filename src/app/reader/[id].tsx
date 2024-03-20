import { useLocalSearchParams } from "expo-router";
import ReaderScreen from "@/src/screens/reader";

export default function Reader() {
  const { id } = useLocalSearchParams();

  return <ReaderScreen bookId={id as string} />;
}
