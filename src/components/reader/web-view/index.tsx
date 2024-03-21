import { useEffect, useRef } from "react";
import WebView, { WebViewMessageEvent } from "react-native-webview";

import getScript from "./script";

import type Highlight from "@/src/@types/highlight";
import type { ReaderTheme } from "@/src/@types/reader-theme";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";
import SwipeHandler from "./swipe-handler";
import { useReader } from "@/src/context/ReaderContext";
import { Location } from "@/src/@types/book";

interface ReaderWebViewProps {
  src: string;
  highlights: Highlight[];
  initialLocation: string;
  theme: ReaderTheme;
  width: number;
  height: number;
  templateUrl: string;
  onStarted?: () => void;
  onRenditionSetup?: () => void;
  onBookReady?: (currentLocation: Location, progress: number, totalLocations: number) => void;
  onLocationChanged?: (currentLocation: Location, progress: number) => void;
  onSelected?: (contents: string, cfiRange: string, color: string) => void;
}

export default function ReaderWebView({ src, highlights, initialLocation, theme, ...props }: ReaderWebViewProps) {
  const reader = useReader();
  const webviewRef = useRef<WebView>(null);
  const script = getScript({ src, highlights, initialLocation, theme });

  useEffect(() => {
    if (webviewRef.current) {
      reader.actions.registerBook(webviewRef.current);
    }
  }, [reader.actions.registerBook]);

  const onMessage = (event: WebViewMessageEvent) => {
    event.persist();

    const data = JSON.parse(event.nativeEvent.data);
    const { type } = data;
    
    switch (type) {
      case "started":
        if (props.onStarted) props.onStarted();
        break;
      case "rendition-setup":
        if (props.onRenditionSetup) props.onRenditionSetup();
        break;
      case "locations-ready":
        reader.actions.setKey(data.epubKey);
        break;
      case "book-ready":
        reader.actions.setProgress(data.progress);
        reader.actions.setCurrentLocation(data.currentLocation);
        reader.actions.setTotalLocations(data.totalLocations);
        reader.actions.setIsRendering(false);
        if (props.onBookReady) props.onBookReady(data.currentLocation, data.progress, data.totalLocations);
        break;
      case "beginning":
        reader.actions.setAtStart(true);
        break;
      case "finish":
        reader.actions.setAtEnd(true);
        break;
      case "location-change":
        reader.actions.setCurrentLocation(data.currentLocation);
        reader.actions.setTotalLocations(data.totalLocations);
        reader.actions.setProgress(data.progress);
        if (props.onLocationChanged) props.onLocationChanged(data.currentLocation, data.progress);
        break;
      case "selected":
        if (props.onSelected) props.onSelected(data.text, data.cfiRange, data.color);
        break;
      case "error":
        // eslint-disable-next-line no-console
        console.error(data.message);
        break;
      case "console":
        // eslint-disable-next-line no-console
        console.log(data.log);
        break;
      default:
        console.log("Unknown message type", type);
        break;
    }
  };

  const onSwipeLeft = () => {
    reader.actions.goNext();
  };
  const onSwipeRight = () => {
    reader.actions.goPrevious();
  };

  return (
    <SwipeHandler
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback>
          {!reader.data.isLoading && (
            <WebView
              ref={webviewRef}
              originWhitelist={["*"]}
              source={{ uri: props.templateUrl }}
              injectedJavaScript={script}
              onMessage={onMessage}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              mixedContentMode="compatibility"
              allowingReadAccessToURL={`${src},${props.templateUrl}`}
              onShouldStartLoadWithRequest={(request) => {
                if (
                  !reader.data.isRendering &&
                  request.mainDocumentURL &&
                  request.url !== request.mainDocumentURL
                ) {
                  reader.actions.goToLocation(
                    request.url.replace(request.mainDocumentURL, "")
                  );
                }
                return true;
              }}
              style={{ width: props.width, height: props.height, backgroundColor: theme.backgroundColor }}
              allowUniversalAccessFromFileURLs={true}
              allowFileAccessFromFileURLs={true}
              allowFileAccess={true}
              javaScriptEnabled
              webviewDebuggingEnabled
            />
          )}
        </TouchableWithoutFeedback>
      </View>
    </SwipeHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
});
