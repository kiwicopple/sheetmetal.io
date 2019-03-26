/**
 * Because 'node-pg-migrate' loads 'dotenv' before we can specify the path to ".env.prod", 
 * we have to use the programatic API to run migrations
 */

// Load prod config from .env.prod
const path = require('path')
const DOT_ENV_FILE =
  process.env.NODE_ENV === 'production' || process.env.DB_ENV === 'production'
    ? path.join(__dirname, '../.env.prod')
    : path.join(__dirname, '../.env')
require('dotenv').config({ path: DOT_ENV_FILE })

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
