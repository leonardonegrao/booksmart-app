import { ActivityIndicator, View, useWindowDimensions } from "react-native";
import { Reader, useReader } from "@/lib/custom-reader";
import { useFileSystem } from "@epubjs-react-native/expo-file-system";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ReaderHeader from "./reader-header";
import ReaderFooter from "./reader-footer";

interface ReaderContainerProps {
  bookUri: string;
  title: string;
  author: string;
}

function OpeningBookIndicator({ calculatedHeight }: { calculatedHeight: number }) {
  return (
    <ActivityIndicator style={{ height: calculatedHeight, backgroundColor: "#FAFAFA" }} size="large" color="#939393" />
  );
}

export default function ReaderContainer({ bookUri, title, author }: ReaderContainerProps) {
  const { currentLocation, totalLocations, progress } = useReader();

  const { height, width } = useWindowDimensions();
  const { bottom: bottomInset, top: topInset } = useSafeAreaInsets();
  const headerHeight = 48;
  const footerHeight = 48;
  const calculatedHeight = height - headerHeight - footerHeight - bottomInset - topInset - 80;
  const calculatedWidth = width - 80;

  const handleLocationChange = (cfi: string) => {
    console.log(cfi);

    // store on state
    // when user leaves the reader, store the last location on DB
  };

  return (
    <View style={{ width: "100%" }}>
      <ReaderHeader title={title} author={author} />
      {bookUri && (
        <View style={{ padding: 40 }}>
          <Reader
            src={bookUri}
            fileSystem={useFileSystem}
            height={calculatedHeight}
            width={calculatedWidth}
            defaultTheme={defaultTheme}
            renderOpeningBookComponent={() => OpeningBookIndicator({ calculatedHeight })}
            onSelected={() => { console.log("selected"); }}
            onStarted={() => { console.log("started", bookUri); }}
            onLocationChange={(_, curLocation) => handleLocationChange(curLocation.start.cfi)}
          />
        </View>
      )}
      <ReaderFooter
        currentLocation={currentLocation?.end.location || 0}
        totalLocations={totalLocations?.toString() || ""}
        progress={progress}
      />
    </View>
  );
}

const defaultTheme = {
  body: {
    background: "#FAFAFA",
  },
  span: {
    color: "#1E1E1EB2 !important",
  },
  p: {
    color: "#1E1E1EB2 !important",
    "font-size": "18px !important",
    "line-height": "1.5 !important",
  },
  li: {
    color: "#1E1E1EB2 !important",
  },
  h1: {
    color: "#1E1E1EB2 !important",
  },
  a: {
    color: "#1E1E1EB2 !important",
  },
};
