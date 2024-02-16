import { View, useWindowDimensions } from "react-native";
import { Reader } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/expo-file-system";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ReaderHeader from "./reader-header";
import ReaderFooter from "./reader-footer";

interface ReaderContainerProps {
  bookUri: string;
  title: string;
  author: string;
}

export default function ReaderContainer({ bookUri, title, author }: ReaderContainerProps) {
  const { height, width } = useWindowDimensions();
  const { bottom: bottomInset, top: topInset } = useSafeAreaInsets();
  const headerHeight = 48;
  const footerHeight = 48;
  const calculatedHeight = height - headerHeight - footerHeight - bottomInset - topInset - 80;
  const calculatedWidth = width - 80;

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
          />
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
