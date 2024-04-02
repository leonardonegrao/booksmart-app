import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "books",
      columns: [
        { name: "bookBucketKey", type: "string", isOptional: true },
        { name: "coverBucketKey", type: "string", isOptional: true },
        { name: "title", type: "string", isIndexed: true },
        { name: "author", type: "string" },
        { name: "percentageRead", type: "number" },
        { name: "lastLocation", type: "string" },
        { name: "language", type: "string" },
        { name: "createdAt", type: "number" },
        { name: "updatedAt", type: "number" },
      ],
    }),
    tableSchema({
      name: "highlights",
      columns: [
        { name: "location", type: "string" },
        { name: "color", type: "string" },
        { name: "content", type: "string" },
        { name: "book_id", type: "string", isIndexed: true },
        { name: "createdAt", type: "number" },
        { name: "updatedAt", type: "number" },
      ],
    }),
  ],
});
