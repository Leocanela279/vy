import { Database } from "bun:sqlite";
import { join } from "node:path";

const dbPath = join(import.meta.dir, "vy.sqlite");
const migrationsDir = join(import.meta.dir, "migrations");

const db = new Database(dbPath, { create: true });
db.run("PRAGMA foreign_keys = ON");

db.run(`
  CREATE TABLE IF NOT EXISTS schema_migrations (
    name TEXT PRIMARY KEY,
    applied_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

const applied = new Set(
  (db.query("SELECT name FROM schema_migrations").all() as { name: string }[]).map(
    (row) => row.name,
  ),
);

const files = [...new Bun.Glob("*.sql").scanSync(migrationsDir)].sort();

let count = 0;

for (const file of files) {
  if (applied.has(file)) continue;

  const sql = await Bun.file(join(migrationsDir, file)).text();

  // Run the migration and record it together, so a failure leaves neither behind.
  const apply = db.transaction(() => {
    db.exec(sql);
    db.run("INSERT INTO schema_migrations (name) VALUES (?)", [file]);
  });

  try {
    apply();
  } catch (error) {
    console.error(`✗ ${file} failed`);
    throw error;
  }

  console.log(`✓ ${file}`);
  count++;
}

console.log(count === 0 ? "No pending migrations." : `Applied ${count} migration(s).`);

db.close();
