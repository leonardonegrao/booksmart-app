import { View } from "react-native";
import ReaderHeader from "./reader-header";
import ReaderFooter from "./reader-footer";

interface ReaderContainerProps {
  bookUri: string;
}

export default function ReaderContainer({ bookUri }: ReaderContainerProps) {
  return (
    <View style={{ width: "100%" }}>
      <ReaderHeader title="L'Étranger" author="Albert Camus" />
      {bookUri && (
        <View style={{ padding: 40 }}>
        </View>
      )}
      <ReaderFooter
        currentLocation={0}
        totalLocations={"100"}
        progress={0}
      />
    </View>
  );
}
