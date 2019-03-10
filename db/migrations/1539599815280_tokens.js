exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('tokens', {
    id: 'id',
    key: {
      type: 'UUID',
      default: pgm.func('md5(random()::text || clock_timestamp()::text)::uuid'),
    },
    user_id: {
      type: 'varchar(50)',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade',
    },
    data: { type: 'JSON' },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
  pgm.createIndex('tokens', 'key', { unique: true })
}

exports.down = pgm => {}
