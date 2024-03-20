import { createContext, useContext, useRef, useState } from "react";

import type { Location, Mark } from "@/src/@types/book";
import type { ReaderTheme } from "@/src/@types/reader-theme";
import type WebView from "react-native-webview";

interface ReaderContextProps {
  data: ReaderData;
  actions: ReaderActions;
}

interface MarkProps {
  type: Mark,
  cfiRange: string,
  data?: any,
  callback?: () => void,
  className?: string,
  styles?: any,
}

interface ReaderData {
  theme: ReaderTheme;
  atStart: boolean;
  atEnd: boolean;
  key: string;
  totalLocations: number;
  currentLocation: Location;
  meta: {
    cover: string | ArrayBuffer | null;
    author: string;
    title: string;
    description: string;
    language: string;
  };
  progress: number;
  locations: string[];
  isLoading: boolean;
  isRendering: boolean;
  searchResults: {
    cfi: string;
    excerpt: string;
  }[];
}

interface ReaderActions {
  registerBook: (ref: WebView) => void;
  onThemeChange: (theme: ReaderTheme) => void;
  setAtStart: (atStart: boolean) => void;
  setAtEnd: (atEnd: boolean) => void;
  setTotalLocations: (totalLocations: number) => void;
  setCurrentLocation: (currentLocation: Location) => void;
  setMeta: (meta: ReaderData["meta"]) => void;
  setProgress: (progress: number) => void;
  setLocations: (locations: string[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsRendering: (isRendering: boolean) => void;
  goToLocation: (targetCfi: string) => void;
  goPrevious: () => void;
  goNext: () => void;
  search: (query: string) => void;
  setSearchResults: (results: ReaderData["searchResults"]) => void;
  addMark: (props: MarkProps) => void;
  removeMark: (cfiRange: string, type: Mark) => void;
  setKey: (key: string) => void;
}

const initialReaderData: ReaderData = {
  theme: { backgroundColor: "#FAFAFA", textColor: "#000000", fontSize: "18px", fontFamily: "Arial" },
  atStart: false,
  atEnd: false,
  key: "",
  totalLocations: 0,
  currentLocation: {
    start: {
      cfi: "",
      index: 0,
      displayed: { page: 0, total: 0 },
      href: "",
      location: 0,
      percentage: 0,
    },
    end: {
      cfi: "",
      index: 0,
      displayed: { page: 0, total: 0 },
      href: "",
      location: 0,
      percentage: 0,
    },
  },
  meta: {
    cover: null,
    author: "",
    title: "",
    description: "",
    language: "",
  },
  progress: 0,
  searchResults: [],
  locations: [],
  isLoading: true,
  isRendering: true,
};

const ReaderContext = createContext<ReaderContextProps>({} as ReaderContextProps);

export const useReader = () => {
  return useContext(ReaderContext);
};

export const ReaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [readerData, setReaderData] = useState<ReaderData>(initialReaderData);
  const bookView = useRef<WebView | null>(null);

  const readerActions = {
    registerBook: (ref: WebView) => {
      bookView.current = ref;
    },
    onThemeChange: (theme: ReaderTheme) => {
      bookView.current?.injectJavaScript(`
        rendition.themes.register({ theme: ${JSON.stringify(theme)} });
        rendition.themes.select('theme');
        rendition.views().forEach(view => view.pane ? view.pane.render() : null);
        true;
      `);
  
      setReaderData((prevReaderData) => ({ ...prevReaderData, theme }));
    },
    setAtStart: (atStart: boolean) => {
      setReaderData((prevReaderData) => ({ ...prevReaderData, atStart }));
    },
    setAtEnd: (atEnd: boolean) => {
      setReaderData((prevReaderData) => ({ ...prevReaderData, atEnd }));
    },
    setTotalLocations: (totalLocations: number) => {
      setReaderData((prevReaderData) => ({ ...prevReaderData, totalLocations }));
    },
    setCurrentLocation: (currentLocation: Location) => {
      setReaderData((prevReaderData) => ({ ...prevReaderData, currentLocation }));
    },
    setMeta: (meta: ReaderData["meta"]) => {
      setReaderData((prevReaderData) => ({ ...prevReaderData, meta }));
    },
    setProgress: (progress: number) => {
      setReaderData((prevReaderData) => ({ ...prevReaderData, progress }));
    },
    setLocations: (locations: string[]) => {
      setReaderData((prevReaderData) => ({ ...prevReaderData, locations }));
    },
    setIsLoading: (isLoading: boolean) => {
      setReaderData((prevReaderData) => ({ ...prevReaderData, isLoading }));
    },
    setIsRendering: (isRendering: boolean) => {
      setReaderData((prevReaderData) => ({ ...prevReaderData, isRendering }));
    },
    goToLocation: (targetCfi: string) => {
      bookView.current?.injectJavaScript(`
        rendition.display('${targetCfi}');
        true;
      `);
    },
    goPrevious: () => {
      bookView.current?.injectJavaScript(`
        rendition.prev();
        true;
      `);
    },
    goNext: () => {
      bookView.current?.injectJavaScript(`
        rendition.next();
        true;
      `);
    },
    search: (query: string) => {
      bookView.current?.injectJavaScript(`
        Promise.all(
          book.spine.spineItems.map((item) => {
            return item.load(book.load.bind(book)).then(() => {
              let results = item.find('${query}'.trim());
              item.unload();
              return Promise.resolve(results);
            });
          })
        ).then((results) =>
          window.ReactNativeWebView.postMessage(
            JSON.stringify({ type: 'onSearch', results: [].concat.apply([], results) })
          )
        );
        true;
      `);
    },
    setSearchResults: (results: ReaderData["searchResults"]) => {
      setReaderData({ ...readerData, searchResults: results });
    },
    addMark: ({ type, cfiRange, data, callback, className, styles }: MarkProps) => {
      const defaultStyles = { fill: "yellow" };
  
      bookView.current?.injectJavaScript(`
        rendition.annotations.add(
          '${type}',
          '${cfiRange}',
          ${JSON.stringify(data ?? {})},
          ${JSON.stringify(callback ? callback() : () => {})},
          '${className}',
          ${JSON.stringify(styles ?? defaultStyles)}
        );
        true;
      `);
    },
    removeMark: (cfiRange: string, type: Mark) => {
      bookView.current?.injectJavaScript(`
        rendition.annotations.remove('${cfiRange}', '${type}');
        true;
      `);
    },
    setKey: (key: string) => {
      setReaderData({ ...readerData, key });
    },
  };

  const value = {
    data: readerData,
    actions: readerActions,
  };

  return (
    <ReaderContext.Provider value={value}>
      {children}
    </ReaderContext.Provider>
  );
};
