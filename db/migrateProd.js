/**
 * Because 'node-pg-migrate' loads 'dotenv' before we can specify the path to ".env.production",
 * we have to use the programatic API to run migrations
 */

// Load prod config from .env.production
require('custom-env').env(true)

/**
 * Set up the DB connection
 */
const migrationRunner = require('node-pg-migrate')
const DATABASE_URL =
  `postgresql://` +
  `${process.env.PG_USER}:` +
  `${process.env.PG_PASSWORD}@` +
  `${process.env.PG_HOST}:${process.env.PG_PORT}` +
  `/${process.env.PG_DATABASE}`
const migrationDir = path.join(__dirname, '/migrations')

/**
 * Run the migrations
 */
const runMigrations = async () => {
  const options = {
    databaseUrl: DATABASE_URL,
    dir: migrationDir,
    migrationsTable: 'pgmigrations',
    direction: 'up',
    count: Infinity,
  }
  try {
    await migrationRunner(options)
  } catch (e) {
    process.exit(1)
  }
}

runMigrations()
