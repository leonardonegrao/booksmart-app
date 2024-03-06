import db from "@/services/db";

async function clearLibrary() {
  const dbInstance = db.openDatabase();
  await db.dropBookTable(dbInstance);
}

export default clearLibrary;
