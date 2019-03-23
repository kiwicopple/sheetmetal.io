const path = require('path')
const DOT_ENV_FILE =
  process.env.NODE_ENV === 'production'
    ? path.join(__dirname, '.env.prod')
    : path.join(__dirname, '.env')
require('dotenv').config({ path: DOT_ENV_FILE })

module.exports = {
  host: process.env.PG_HOST || 'localhost',
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'postgres',
  port: process.env.PG_PORT || 5432,
  database: process.env.PG_DATABASE || 'sheet_metal',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
}
