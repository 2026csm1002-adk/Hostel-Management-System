// tests/setup-test-db.ts
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import * as schema from "../src/server/db/schema";
import path from "path";

export async function createTestDatabase() {
  const client = createClient({
    url: "file::memory:",
  });

  const db = drizzle(client, { schema });

  // Applies all SQL files from your ./drizzle directory directly to the in-memory DB
  await migrate(db, {
    migrationsFolder: path.resolve(process.cwd(), "drizzle"),
  });

  await client.execute(`PRAGMA foreign_keys = ON;`);

  return { db, client };
}