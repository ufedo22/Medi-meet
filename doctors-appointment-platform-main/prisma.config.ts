import { defineConfig } from "prisma/config";
import * as dotenv from "dotenv";

// Load .env file
dotenv.config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    // Use process.env directly
    url: process.env.DATABASE_URL || "",
  },
});
