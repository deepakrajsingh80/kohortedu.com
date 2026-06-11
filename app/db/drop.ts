import { getDb } from "../api/queries/connection";

async function dropTables() {
  const db = getDb();
  await db.execute("DROP TABLE IF EXISTS applications, student_profiles, leads, users;");
  console.log("All tables dropped successfully");
}

dropTables().catch(console.error);
