import { ActivityIndicator, View, useWindowDimensions } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as FileSystem from "expo-file-system";

import { useReader } from "@/src/context/ReaderContext";

import ReaderHeader from "./reader-header";
import ReaderFooter from "./reader-footer";
import Highlight from "@/src/@types/highlight";
import ReaderWebView from "./web-view";
import { useEffect } from "react";
import template from "./web-view/template/template";
import { useStorage } from "@/src/context/StorageContext";
import { Book } from "@/src/@types/book";

interface ReaderContainerProps {
  book: Book;
  highlights: Highlight[];
}

const getCalculatedDimensions = (topInset: number, bottomInset: number, windowHeight: number, windowWidth: number) => {
  const headerHeight = 48;
  const footerHeight = 48;

  return {
    height: windowHeight - headerHeight - footerHeight - bottomInset - topInset - 80,
    width: windowWidth - 80,
  };
};

export default function ReaderContainer({ book, highlights }: ReaderContainerProps) {
  const reader = useReader();
  const storage = useStorage();
  const templateUrl = `${FileSystem.documentDirectory}epub-reader.html`;
 
  const { height, width } = useWindowDimensions();
  const { bottom: bottomInset, top: topInset } = useSafeAreaInsets();
  const { height: calculatedHeight, width: calculatedWidth } = getCalculatedDimensions(topInset, bottomInset, height, width);

  useEffect(() => {
    const saveTemplateFileToDocuments = async () => {
      reader.actions.setIsLoading(true);

      try {
        if (template) {
          const content = template;
          await FileSystem.writeAsStringAsync(templateUrl, content);
        }
      } catch (error) {
        console.error("Error saving HTML file: " + error);
      }

      reader.actions.setIsLoading(false);
    };

    saveTemplateFileToDocuments();
  }, []);

  const onBackPress = async () => {
    // storage.actions.update("book", {
    //   ...book,
    //   lastLocation: reader.data.currentLocation.start.cfi,
    //   percentageRead: reader.data.progress,
    // });
    router.navigate("/(tabs)/");
  };

  const onSelected = async (contents: string, cfiRange: string, color: string) => {    
    storage.actions.save("highlight", {
      bookId: book.id,
      location: cfiRange,
      color,
      content: contents,
    });
  };

  return (
    <View style={{ width: "100%" }}>
      <ReaderHeader title={book.title} author={book.author} onBackPress={onBackPress} />
      {book.bookLocalUri && (
        <View style={{ padding: 40, height: (calculatedHeight + 80) }}>
          {reader.data.isLoading ? (
            <View
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color="#939393" />
            </View>
          ) : (
            <ReaderWebView
              src={book.bookLocalUri}
              templateUrl={templateUrl}
              height={calculatedHeight}
              width={calculatedWidth}
              initialLocation={book.lastLocation}
              highlights={highlights}
              theme={{ backgroundColor: "#FAFAFA", fontFamily: "Inter", fontSize: "16px", textColor: "#000000" }}
              onSelected={onSelected}
            />
          )}
        </View>
      )}
      <ReaderFooter
        currentLocation={reader.data.currentLocation.end.location}
        totalLocations={reader.data.totalLocations}
        progress={reader.data.progress}
      />
    </View>
  );
}
