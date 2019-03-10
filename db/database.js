const pg = require('./index')

/**
 * Return a UUID - good for tokens. The database already handles this too, but *shrug*
 */
exports.uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * Get tokens/metal-keys for a user
 */
exports.getTokens = async userId => {
  // eslint-disable-line
  try {
    const { rows } = await pg.query('SELECT * FROM tokens WHERE user_id = $1', [
      userId,
    ])
    return rows
  } catch (error) {
    console.log('error', error)
  }
}

/**
 * Get a user by their ID
 */
exports.getUser = async id => {
  // eslint-disable-line
  try {
    const { rows } = await pg.query('SELECT * FROM users WHERE id = $1', [id])
    return rows[0]
  } catch (error) {
    console.log('error', error)
  }
}

/**
 * Return a user for a given token/metal-key
 */
exports.getUserForKey = async (key, userId) => {
  // eslint-disable-line
  try {
    const { rows } = await pg.query(
      'SELECT * FROM user_tokens WHERE token_key = $1 AND user_id = $2',
      [key, userId]
    )
    return rows[0]
  } catch (error) {
    console.log('error', error)
  }
}

/**
 * Save a new token/metal-key (this is different from the google oath token)
 */
exports.saveToken = async (key, userId) => {
  // eslint-disable-line
  try {
    const text = 'INSERT INTO tokens(key, user_id) VALUES($1, $2) RETURNING *'
    const values = [key, userId]
    const res = await pg.query(text, values)
    return res.rows[0]
  } catch (error) {
    console.log('error', error)
  }
}

/**
 * Create a new user or update them if they already exist
 */
exports.upsertUser = async (user, oauthToken) => {
  console.log('user', user)
  console.log('oauthToken', oauthToken)
  try {
    const text = `
      INSERT INTO users(id, profile, oauth_token) values ($1, $2, $3)
      ON CONFLICT (id)
      DO UPDATE SET profile = $2, oauth_token = $3
      RETURNING *;
    `
    const values = [user.id, user, oauthToken]
    const res = await pg.query(text, values)
    return res.rows[0]
  } catch (error) {
    console.log('error', error)
  }
}

/**
 * Update oath token for a given user
 */
exports.updateOathForUser = async (
  userId,
  oauthToken
) => {
  try {
    const text = 'UPDATE users SET oauth_token = $1 WHERE id = $2 RETURNING *'
    const values = [oauthToken, userId]
    const res = await pg.query(text, values)
    return res.rows[0]
  } catch (error) {
    console.log('error', error)
  }
}
