import { existsSync } from 'node:fs'

// Applies pending migrations when the server starts (disable with NUXT_POSTGRES_AUTO_MIGRATE=false,
// e.g. if you run `pnpm db:postgres:migrate` as a deploy step instead).
export default defineNitroPlugin((nitroApp) => {
  const { autoMigrate, migrationsDir } = useRuntimeConfig().postgres

  if (!autoMigrate) {
    return
  }

  if (!existsSync(migrationsDir)) {
    console.warn(`[db-postgres] Migrations folder not found (${migrationsDir}). Run \`pnpm db:postgres:migrate\` when deploying.`)
    return
  }

  const ready = migratePostgresDb(migrationsDir).catch((error) => {
    console.error('[db-postgres] Migration failed:', error)
    throw error
  })

  // Hold incoming requests until migrations are done (instant after the first one)
  nitroApp.hooks.hook('request', async () => {
    await ready
  })
})
