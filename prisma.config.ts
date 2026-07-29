import "dotenv/config";
import path from "node:path";
import { defineConfig } from "prisma/config";

export default defineConfig({
  earlyAccess: true,
  schema: path.join(__dirname, "prisma", "schema.prisma"),
  datasource: {
    // Use DIRECT_URL (port 5432) for CLI operations (db push, migrate).
    // PgBouncer (port 6543) doesn't support DDL.
    url: process.env.DIRECT_URL!,
  },
  migrate: {
    async url() {
      return process.env.DIRECT_URL!;
    },
  },
});
