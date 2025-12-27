import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
  schema: './src/config/db/schema',
  out: './src/config/db/schema/sql',
  dbCredentials: {
    database: process.env.PG_DATABASE || '',
    host: process.env.PG_HOST || '',
    user: process.env.PG_USER || '',
    password: process.env.PG_PASSWORD || '',
    ssl: false
  }
})
