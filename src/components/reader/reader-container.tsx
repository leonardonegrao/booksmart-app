import { ActivityIndicator, View, useWindowDimensions } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as FileSystem from "expo-file-system";

import { useReader } from "@/src/context/ReaderContext";

import ReaderHeader from "./reader-header";
import ReaderFooter from "./reader-footer";
import api from "@/src/services/api";
import db from "@/src/services/db";
import Highlight from "@/src/@types/highlight";
import ReaderWebView from "./web-view";
import { useEffect } from "react";
import template from "./web-view/template/template";

interface ReaderContainerProps {
  bookId: string;
  bookUri: string;
  title: string;
  author: string;
  lastLocation: string;
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

export default function ReaderContainer({
  bookId,
  lastLocation,
  bookUri,
  title,
  author,
  highlights,
}: ReaderContainerProps) {
  const reader = useReader();
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
    await api.updateBookProgress(
      bookId,
      reader.data.progress,
      reader.data.currentLocation.start.cfi
    );
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
              src={bookUri}
              templateUrl={templateUrl}
              height={calculatedHeight}
              width={calculatedWidth}
              initialLocation={lastLocation}
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
