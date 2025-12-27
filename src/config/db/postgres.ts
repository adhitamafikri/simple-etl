import { drizzle } from 'drizzle-orm/postgres-js'

export const db = drizzle({
  connection: {
    url: process.env.PG_DATABASE_URL,
    ssl: false,
  },
})
