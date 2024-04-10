import { Model } from "@nozbe/watermelondb";
import { Associations } from "@nozbe/watermelondb/Model";
import { date, field, text, children } from "@nozbe/watermelondb/decorators";

export default class BookModel extends Model {
  static table = "books";
  static associations: Associations = {
    highlights: { type: "has_many", foreignKey: "book_id" },
  };

  // @ts-expect-error - ignore "any" error
  @text("user_id") userId;
  // @ts-expect-error - ignore "any" error
  @text("book_local_uri") bookLocalUri;
  // @ts-expect-error - ignore "any" error
  @text("epub_local_uri") epubLocalUri;
  // @ts-expect-error - ignore "any" error
  @text("cover_local_uri") coverLocalUri;
  // @ts-expect-error - ignore "any" error
  @field("book_bucket_key") bookBucketKey;
  // @ts-expect-error - ignore "any" error
  @field("cover_bucket_key") coverBucketKey;
  // @ts-expect-error - ignore "any" error
  @text("title") title;
  // @ts-expect-error - ignore "any" error
  @text("author") author;
  // @ts-expect-error - ignore "any" error
  @field("percentage_read") percentageRead;
  // @ts-expect-error - ignore "any" error
  @text("last_location") lastLocation;
  // @ts-expect-error - ignore "any" error
  @text("language") language;
  // @ts-expect-error - ignore "any" error
  @children("highlights") highlights;
  // @ts-expect-error - ignore "any" error
  @date("created_at") createdAt;
  // @ts-expect-error - ignore "any" error
  @date("updated_at") updatedAt;
}
