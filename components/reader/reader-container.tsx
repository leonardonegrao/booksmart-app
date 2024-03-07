import { ActivityIndicator, View, useWindowDimensions } from "react-native";
import { router } from "expo-router";
import { Reader, useReader } from "@/lib/custom-reader";
import { useFileSystem } from "@epubjs-react-native/expo-file-system";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ReaderHeader from "./reader-header";
import ReaderFooter from "./reader-footer";
import api from "@/services/api";
import db from "@/services/db";

interface ReaderContainerProps {
  bookId: string;
  bookUri: string;
  title: string;
  author: string;
  lastLocation: string;
}

function OpeningBookIndicator({ calculatedHeight }: { calculatedHeight: number }) {
  return (
    <ActivityIndicator style={{ height: calculatedHeight, backgroundColor: "#FAFAFA" }} size="large" color="#939393" />
  );
}

export default function ReaderContainer({ bookId, lastLocation, bookUri, title, author }: ReaderContainerProps) {
  const { currentLocation, totalLocations, progress } = useReader();

  const { height, width } = useWindowDimensions();
  const { bottom: bottomInset, top: topInset } = useSafeAreaInsets();
  const headerHeight = 48;
  const footerHeight = 48;
  const calculatedHeight = height - headerHeight - footerHeight - bottomInset - topInset - 80;
  const calculatedWidth = width - 80;

  const onBackPress = async () => {
    await api.updateBookProgress(bookId, progress, currentLocation!.start.cfi);
    router.navigate("/(tabs)/");
  };

  const onSelected = async (contents: string, cfiRange: string, color: string) => {
    const dbInstance = db.openDatabase();
    
    db.createHighlightsTable(dbInstance);
    db.insertHighlight(dbInstance, bookId, cfiRange, color, contents);
  };

  return (
    <View style={{ width: "100%" }}>
      <ReaderHeader title={title} author={author} onBackPress={onBackPress} />
      {bookUri && (
        <View style={{ padding: 40 }}>
          <Reader
            src={bookUri}
            fileSystem={useFileSystem}
            height={calculatedHeight}
            width={calculatedWidth}
            initialLocation={lastLocation}
            defaultTheme={defaultTheme}
            onSelected={onSelected}
            renderOpeningBookComponent={() => OpeningBookIndicator({ calculatedHeight })}
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
    "-webkit-touch-callout": "none",
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
