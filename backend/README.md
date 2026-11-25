# backend

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

To type check:

```bash
bun check
```

## Migrations

SQL migrations live in `db/migrations/` and are applied in filename order.

```bash
bun run migrate
```

Applied migrations are recorded in the `schema_migrations` table, so re-running
the command only applies new files. To add one, create the next numbered file,
for example `db/migrations/002_add_sessions.sql`.

Run `bun fmt` to format the code.

This project was created using `bun init` in bun v1.4.5. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
