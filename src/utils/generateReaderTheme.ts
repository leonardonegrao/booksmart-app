import { ReaderTheme } from "@/src/@types/reader-theme";

export function generateReaderTheme(theme: ReaderTheme) {
  return {
    "body": {
      background: theme.backgroundColor,
    },
    "span": {
      color: `${theme.textColor} !important`,
    },
    "p": {
      color: `${theme.textColor} !important`,
      "line-height": "1.5 !important",
    },
    "li": {
      color: `${theme.textColor} !important`,
    },
    "h1": {
      color: `${theme.textColor} !important`,
    },
    "a": {
      "color": `${theme.textColor} !important`,
      "pointer-events": "auto",
      "cursor": "pointer",
    },
    "::selection": {
      background: "#FFD700",
    },
  };
}
