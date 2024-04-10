import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "books",
      columns: [
        { name: "user_id", type: "string" },
        { name: "book_local_uri", type: "string" },
        { name: "epub_local_uri", type: "string" },
        { name: "cover_local_uri", type: "string" },
        { name: "book_bucket_key", type: "string", isOptional: true },
        { name: "cover_bucket_key", type: "string", isOptional: true },
        { name: "title", type: "string", isIndexed: true },
        { name: "author", type: "string" },
        { name: "percentage_read", type: "number" },
        { name: "last_location", type: "string" },
        { name: "language", type: "string" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: "highlights",
      columns: [
        { name: "location", type: "string" },
        { name: "color", type: "string" },
        { name: "content", type: "string" },
        { name: "book_id", type: "string", isIndexed: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
  ],
});
