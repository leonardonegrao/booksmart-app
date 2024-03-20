export default `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>booksmart EPUB Reader</title>
      <script src="https://cdn.jsdelivr.net/npm/epubjs@0.3.93/dist/epub.min.js"></script>

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
