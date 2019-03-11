exports.shorthands = undefined

exports.up = pgm => {
  pgm.createView(
    'user_keys',
    {
      columns: [
        'user_id',
        'user_profile',
        'oauth_token',
        'token_id',
        'key',
      ],
    },
    `
      SELECT users.id, users.profile, users.oauth_token, keys.id, keys.key 
      FROM users 
        JOIN keys ON keys.user_id = users.id
    `
  )
}

exports.down = pgm => {}
