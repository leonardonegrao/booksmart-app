import type Highlight from "@/src/@types/highlight";
import type { ReaderTheme } from "@/src/@types/reader-theme";
import { generateReaderTheme } from "@/src/utils/generateReaderTheme";

const utils = {
  postMessageToWebView: `
    function postMessageToWebView(type, data) {
      const stringifiedData = JSON.stringify({ type, ...data });
      window.ReactNativeWebView.postMessage(stringifiedData);
    };
  `,
  setupLocations: `
    function setupLocations() {
      if (initialLocations[0]) {
        book.locations.load(initialLocations);
      }

      book.locations.generate(1600).then(() => {
        postMessageToWebView(
          "locations-ready",
          {
            epubKey: book.key(),
            locations: book.locations.save()
          }
        );
      });
    }
  `,
  setupDisplay: `
    function setupDisplay() {
      if (initialLocations[0]) {
        const displayed = rendition.display(initialLocations[0]);
      } else {
        const displayed = rendition.display();
      }

      displayed.then(() => {
        const currentLocation = rendition.currentLocation();

        postMessageToWebView("book-ready", {
          totalLocations: book.locations.total,
          currentLocation: currentLocation,
          progress: book.locations.percentageFromCfi(currentLocation.start.cfi),
        });
      });
    };
  `,
  registerTheme: `
    function registerTheme() {
      rendition.themes.register({ theme: theme });
      rendition.themes.select("theme");
    };
  `,
  loadHighlights: `
    function loadHighlights() {
      highlights.forEach((highlight) => {
        rendition.annotations.highlight(
          highlight.location,
          {},
          () => {},
          "",
          { "fill": highlight.color }
        );
      });
    };
  `,
};

const scripts = {
  setup: ({ src, highlights, initialLocation, theme }: GetScriptProps) => `
    let book;
    let rendition;

    const file = "${src}";
    const highlights = ${JSON.stringify(highlights)};
    const theme = ${JSON.stringify(generateReaderTheme(theme))};
    const initialLocations = ["${initialLocation}"];

    ${utils.postMessageToWebView}
    ${utils.setupLocations}
    ${utils.setupDisplay}
    ${utils.registerTheme}
    ${utils.loadHighlights}
  `,
  createBook: `
    try {
      book = ePub(file);
      book.on("openFailed", (err) => {
        postMessageToWebView("error", { message: \`Error opening book: \${err}\` });
      });
      postMessageToWebView("started", {});
    } catch (e) {
      postMessageToWebView("error", { message: \`Error while creating book: \${e}\` });
    }
  `,
  renderBook: `
    try {
      rendition = book.renderTo("viewer", {
        width: "100%",
        height: "100%",
        allowScriptedContent: true,
      });

      postMessageToWebView("rendition-setup", {});
    } catch (e) {
      postMessageToWebView("error", { message: \`Error on rendition setup: \${e}\` });
    }
  `,
  displayBook: `
    try {
      book.ready
        .then(() => setupLocations())
        .then(() => setupDisplay());
    } catch (e) {
      postMessageToWebView("error", { message: \`Error on displaying book: \${e.message}\` });
    }
  `,
  onStarted: `
    rendition.on("started", () => {
      registerTheme();
    });
  `,
  onRelocated: `
    rendition.on("relocated", (location) => {
      const percent = book.locations.percentageFromCfi(location.start.cfi);
      const percentage = Math.floor(percent * 100);

      postMessageToWebView("location-change", {
        type: "location-change",
        totalLocations: book.locations.total,
        currentLocation: location,
        progress: percentage,
      });

      if (location.atStart) {
        postMessageToWebView("beginning", {});
      }

      if (location.atEnd) {
        postMessageToWebView("finish", {});
      }
    });
  `,
  onRendered: `
    rendition.on("rendered", () => {
      postMessageToWebView("rendered", { section, currentSection: book.navigation.get(section.href) });
    });
  `,
  onSelected: `
    rendition.on("selected", (cfiRange, contents) => {
      try {
        const frame = contents.document.defaultView.frameElement;
        const selection = contents.window.getSelection();
        const range = selection.getRangeAt(0);
        const { left, right, top, bottom } = getRect(range, frame);

        const viewerEl = document.getElementById("viewer");
        const newEl = document.createElement("div");

        const topPos = bottom + 4;

        newEl.style.position = "absolute";
        newEl.style.left = left + "px";
        newEl.style.top = topPos + "px";
        newEl.style.backgroundColor = "#F8F8F8";
        newEl.style.padding = "8px";
        newEl.style.border = "1px solid rgba(63, 63, 63, 0.1)";
        newEl.style.borderRadius = "16px";
        newEl.style.boxShadow = '0px 8px 18px 0px rgba(30, 30, 30, 0.15)';
        newEl.style.display = "flex";
        newEl.style.gap = "8px";

        const colors = [
          { bg: "#63C8D6", id: "blue" },
          { bg: "#63D675", id: "green" },
          { bg: "#D4D663", id: "yellow" },
          { bg: "#D66363", id: "red" },
        ];

        colors.forEach(color => {
          const circle = document.createElement("div");
          circle.id = color.id;
          circle.style.width = "24px";
          circle.style.height = "24px";
          circle.style.borderRadius = "50%";
          circle.style.backgroundColor = color.bg;

          newEl.appendChild(circle);

          circle.addEventListener("click", (e) => {
            rendition.annotations.add(
              "highlight",
              cfiRange,
              {},
              () => {},
              "",
              { "fill": color.bg }
            );

            // TODO: in the future this will need to go to the top of the function
            // as the other selection options need to pop-up, but for now it's fine
            book.getRange(cfiRange).then((selectedRange) => {
              const text = selectedRange.toString();
              postMessageToWebView("selected", {
                cfiRange: cfiRange,
                text: text,
                color: color.bg,
              });
            });
          });
        });

        viewerEl.appendChild(newEl);
        const frameEl = contents.document;
        frameEl.addEventListener("click", (e) => {
            newEl.remove();
        });
      } catch (e) {
        postMessageToWebView("error", { message: \`Error on selected: \${e.message}\` });
      }
    });

    const getRect = (target, frame) => {
      const rect = target.getBoundingClientRect();
      const viewElementRect = frame ? frame.getBoundingClientRect() : { top: 0, left: 0 };
      const left = rect.left + viewElementRect.left;
      const right = rect.right + viewElementRect.left;
      const top = rect.top + viewElementRect.top;
      const bottom = rect.bottom + viewElementRect.top;
      return { left, right, top, bottom };
    };
  `,
};

interface GetScriptProps {
  src: string;
  highlights: Highlight[];
  initialLocation: string;
  theme: ReaderTheme;
}

const getScript = ({
  src,
  highlights,
  initialLocation,
  theme,
}: GetScriptProps) => {
  return `
    ${scripts.setup({ src, highlights, initialLocation, theme })}
    ${scripts.createBook}
    ${scripts.renderBook}
    ${scripts.displayBook}
    loadHighlights();

    ${scripts.onStarted}
    ${scripts.onRelocated}
    ${scripts.onRendered}
    ${scripts.onSelected}
  `;
};

export default getScript;
