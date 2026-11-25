import { Database } from "bun:sqlite";
import { join } from "node:path";

const db = new Database(join(import.meta.dir, "vy.sqlite"), { create: true });

db.run("PRAGMA journal_mode = WAL");
db.run("PRAGMA foreign_keys = ON");

export default db;
