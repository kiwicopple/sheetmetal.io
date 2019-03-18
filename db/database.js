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
 * Get API keys for a user
 */
exports.getKeys = async userId => {
  try {
    const { rows } = await pg.query('SELECT * FROM keys WHERE user_id = $1', [userId])
    return rows
  } catch (error) {
    console.log('Error: Database.getKeys', error)
  }
}

/**
 * Get a user by their ID
 */
exports.getUser = async id => {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pg.query('SELECT * FROM users WHERE id = $1', [id])
      return resolve(rows[0])
    } catch (error) {
      console.log('error', error)
      return reject(true)
    }
  })
}

/**
 * Return a user for a given token/metal-key
 */
exports.getUserForKey = (key, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { rows } = await pg.query('SELECT * FROM user_keys WHERE key = $1 AND user_id = $2', [
        key,
        userId,
      ])
      return resolve(rows[0])
    } catch (error) {
      console.log('error', error)
      return reject(true)
    }
  })
}

/**
 * Save a new API Key
 */
exports.saveKey = (key, userId, description, sheetId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let text = 'INSERT INTO keys(key, user_id, description, sheet_id, data, updated_by) '
      text += 'VALUES($1, $2, $3, $4, $5, $2) RETURNING *'
      const values = [key, userId, description, sheetId, data]
      const { rows } = await pg.query(text, values)
      return resolve(rows[0])
    } catch (error) {
      console.log('error', error)
      return reject(true)
    }
  })
}

/**
 * Generic function to update a table, as long as the table has a PK name of "id" and user_id column
 */
exports.updateTable = (table, id, userId, payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const values = [id, userId]
      delete payload.id
      let updates = Object.keys(payload).map((key, i) => {
        values.push(payload[key])
        return `${key} = ${i + 2}`
      })
      const text = `UPDATE ${table} SET ${updates.join(', ')} WHERE id = $1 AND RETURNING *`
      const res = await pg.query(text, values)
      return resolve(res)
    } catch (error) {
      console.log('error', error)
      return reject(true)
    }
  })
}

/**
 * Delete an API Key
 */
exports.deleteKey = (id, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const text = 'DELETE FROM keys WHERE id = $1 AND user_id = $2'
      const values = [id, userId]
      const res = await pg.query(text, values)
      return resolve(res)
    } catch (error) {
      console.log('error', error)
      return reject(true)
    }
  })
}

/**
 * Create a new user or update them if they already exist
 */
exports.upsertUser = (user, oauthToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      const text = `
      INSERT INTO users(id, profile, oauth_token, updated_by) values ($1, $2, $3, $1)
      ON CONFLICT (id)
      DO UPDATE SET profile = $2, oauth_token = $3, updated_by = $1
      RETURNING *;
    `
      const values = [user.id, user, oauthToken]
      const { rows } = await pg.query(text, values)
      return resolve(rows[0])
    } catch (error) {
      console.log('error', error)
      return reject(true)
    }
  })
}

/**
 * Update oath token for a given user
 */
exports.updateOathForUser = (userId, oauthToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      const text = 'UPDATE users SET oauth_token = $1 WHERE id = $2 RETURNING *'
      const values = [oauthToken, userId]
      const res = await pg.query(text, values)
      return resolve(rows[0])
    } catch (error) {
      console.log('error', error)
      return reject(true)
    }
  })
}
