exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('users', {
    id: {
      type: 'varchar(50)', // this is the Google ID
      notNull: true,
      primaryKey: true,
    },
    profile: { type: 'JSON', notNull: true }, // the google profile of the user
    oauth_token: { type: 'JSON', notNull: true }, // this is the google token which may be refreshed regularly
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
  pgm.createIndex('users', 'id', { unique: true })
}

exports.down = pgm => {}
