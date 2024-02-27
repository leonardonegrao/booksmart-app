export default `
<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EPUB.js</title>
    <script src="https://cdn.jsdelivr.net/npm/epubjs@0.3.93/dist/epub.min.js"></script>
    <script>
      let book;
      let rendition;

      const type = window.type;
      const file = window.book;
      const theme = window.theme;
      const initialLocations = window.locations;
      const enableSelection = window.enable_selection;

      if (!file) {
        alert('Failed load book');
      }

      try {
        book = ePub(file);
      } catch (e) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: "Console",
            log: \`Error on line 24: 'book = ePub(file);' - \${e.message}\`,
          })
        );
      }

      window.ReactNativeWebView.postMessage(JSON.stringify({ type: "onStarted" }));

      try {
        rendition = book.renderTo("viewer", {
          width: "100%",
          height: "100%",
          allowScriptedContent: true,
        });
      } catch (e) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: "Console",
            log: \`Error on line 35: 'rendition = book.renderTo(...' - \${e.message}\`,
          })
        );
      }

      window.ReactNativeWebView.postMessage(JSON.stringify({ type: "Console", log: "Rendition created" }));

      try {
        book.ready
          .then(() => {
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: "Console", log: "Book is ready" }));

            if (initialLocations) {
              return book.locations.load(initialLocations);
            }

            book.locations.generate(1600).then(() => {
              window.ReactNativeWebView.postMessage(
                JSON.stringify({
                  type: "onLocationsReady",
                  epubKey: book.key(),
                  locations: book.locations.save(),
                })
              );
            });
          })
          .then(() => {
            const displayed = rendition.display();

            displayed.then(() => {
              const currentLocation = rendition.currentLocation();

              window.ReactNativeWebView.postMessage(
                JSON.stringify({
                  type: "onReady",
                  totalLocations: book.locations.total,
                  currentLocation: currentLocation,
                  progress: book.locations.percentageFromCfi(currentLocation.start.cfi),
                })
              );
            });
          });
      } catch (e) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: "Console",
            log: \`Error on line 53: 'book.ready.then(...' - \${e.message}\`,
          })
        );
      }

      rendition.on("started", () => {
        rendition.themes.register({ theme: theme });
        rendition.themes.select("theme");
      });

      rendition.on("relocated", (location) => {
        const percent = book.locations.percentageFromCfi(location.start.cfi);
        const percentage = Math.floor(percent * 100);

        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: "onLocationChange",
            totalLocations: book.locations.total,
            currentLocation: location,
            progress: percentage,
          })
        );

        if (location.atStart) {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({
              type: "onBeginning",
            })
          );
        }

        if (location.atEnd) {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({
              type: "onFinish",
            })
          );
        }
      });

      rendition.on("rendered", () => {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: "onRendered",
            section: section,
            currentSection: book.navigation.get(section.href),
          })
        );
      });

      rendition.on("selected", (cfiRange, contents) => {
        try {
          const frame = contents.document.defaultView.frameElement;
          const selection = contents.window.getSelection();
          const range = selection.getRangeAt(0);
          const { left, right, top, bottom } = getRect(range, frame);

          window.ReactNativeWebView.postMessage(
            JSON.stringify({
              type: "Console",
              log: contents.locationOf(cfiRange),
            })
          );

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
            {
              bg: "#63C8D6",
              id: "blue",
            },
            {
              bg: "#63D675",
              id: "green",
            },
            {
              bg: "#D4D663",
              id: "yellow",
            },
            {
              bg: "#D66363",
              id: "red",
            },
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
              rendition.annotations.add("highlight", cfiRange, {}, (e) => {
                window.ReactNativeWebView.postMessage(
                  JSON.stringify({
                    type: "Console",
                    log: "selected",
                  })
                );
              },
              "",
              { "fill": color.bg }
              );
            });
          });

          viewerEl.appendChild(newEl);
          const frameEl = contents.document;
          frameEl.addEventListener("click", (e) => {
              console.log(e.target, newEl);
              newEl.remove();
          });

          // rendition.annotations.add("highlight", cfiRange, {}, (e) => {
          //  window.ReactNativeWebView.postMessage(
          //    JSON.stringify({
          //      type: "Console",
          //      log: "selected",
          //    })
          //  );
          // });
        } catch (e) {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({
              type: "Console",
              log: \`Error on line 68: 'rendition.annotations.add(...' - \${e.message}\`,
            })
          );
        }
      });

      rendition.hooks.content.register((contents, view) => {
        const frame = contents.document.defaultView.frameElement;
        contents.document.onclick = e => {
          e.preventDefault();
          const selection = contents.window.getSelection();
          const range = selection.getRangeAt(0);
          const { left, right, top, bottom } = getRect(range, frame);

          window.ReactNativeWebView.postMessage(
            JSON.stringify({
              type: "Console",
              log: "click " + left,
            })
          );
        };
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
    </script>

    <style type="text/css">
      body {
        margin: 0;
      }

      #viewer {
        height: 100vh;
        width: 100vw;
        overflow: hidden !important;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    </style>
  </head>

  <body oncopy='return false' oncut='return false'>
    <div id="viewer"></div>
  </body>
</html>
`;
