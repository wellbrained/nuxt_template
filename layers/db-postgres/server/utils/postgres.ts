import { mkdirSync } from 'node:fs'
import { PGlite } from '@electric-sql/pglite'
import type { PgDatabase, PgQueryResultHKT } from 'drizzle-orm/pg-core'
import { drizzle as drizzlePglite } from 'drizzle-orm/pglite'
import { migrate as migratePglite } from 'drizzle-orm/pglite/migrator'
import { drizzle as drizzlePostgres } from 'drizzle-orm/postgres-js'
import { migrate as migratePostgres } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import * as schema from '../db/schema'

// Auto-imported in all server code (server/utils). Usage:
//   const db = usePostgres()
//   await db.select().from(pgTables.notes)
export const pgTables = schema

export type PostgresDb = PgDatabase<PgQueryResultHKT, typeof schema>

interface PostgresClient {
  db: PostgresDb
  driver: 'postgres' | 'pglite'
  migrate: (migrationsFolder: string) => Promise<void>
}

let client: PostgresClient | undefined

function createClient(): PostgresClient {
  const { url, pgliteDir } = useRuntimeConfig().postgres

  // Real PostgreSQL server when NUXT_POSTGRES_URL is set
  if (url) {
    const db = drizzlePostgres(postgres(url), { schema })
    return { db, driver: 'postgres', migrate: migrationsFolder => migratePostgres(db, { migrationsFolder }) }
  }

  // Otherwise embedded PGlite — same SQL dialect, zero setup
  mkdirSync(pgliteDir, { recursive: true })
  const db = drizzlePglite(new PGlite(pgliteDir), { schema })
  return { db, driver: 'pglite', migrate: migrationsFolder => migratePglite(db, { migrationsFolder }) }
}

function getClient(): PostgresClient {
  client ??= createClient()
  return client
}

/** Drizzle instance for PostgreSQL (or PGlite in development). */
export function usePostgres(): PostgresDb {
  return getClient().db
}

/** Which driver is active: 'postgres' (NUXT_POSTGRES_URL set) or 'pglite'. */
export function usePostgresDriver(): PostgresClient['driver'] {
  return getClient().driver
}

/** Applies pending migrations from the given folder (see server/plugins/postgres.ts). */
export function migratePostgresDb(migrationsFolder: string): Promise<void> {
  return getClient().migrate(migrationsFolder)
}
