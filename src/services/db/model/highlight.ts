import { Model } from "@nozbe/watermelondb";
import { Associations } from "@nozbe/watermelondb/Model";
import { date, text, immutableRelation } from "@nozbe/watermelondb/decorators";

export default class HighlightModel extends Model {
  static table = "highlights";
  static associations: Associations = {
    books: { type: "belongs_to", key: "book_id" },
  };

  // @ts-expect-error - ignore "any" error
  @text("location") location;
  // @ts-expect-error - ignore "any" error
  @text("color") color;
  // @ts-expect-error - ignore "any" error
  @text("content") content;
  // @ts-expect-error - ignore "any" error
  @immutableRelation("books", "book_id") bookId;
  // @ts-expect-error - ignore "any" error
  @date("created_at") createdAt;
  // @ts-expect-error - ignore "any" error
  @date("updated_at") updatedAt;
}
