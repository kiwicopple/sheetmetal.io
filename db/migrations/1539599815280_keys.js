exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('keys', {
    id: 'id',
    key: {
      type: 'UUID',
      default: pgm.func('md5(random()::text || clock_timestamp()::text)::uuid'),
    },
    description: {
      type: 'varchar(255)',
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
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_by: {
      type: 'varchar(50)',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade',
    },
  })
  pgm.createIndex('keys', 'key', { unique: true })
}

exports.down = pgm => {}
