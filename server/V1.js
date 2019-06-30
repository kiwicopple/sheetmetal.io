const routes = require('express').Router()
const Database = require('../db/database')
const GoogleHelpers = require('./Google')

const UNAUTHORIZED = 401
const SERVER_ERROR = 500
const NOT_IMPLEMENTED = 501

const verifyMetalKey = async (req, res, next) => {
  try {
    const { key } = req.params
    let metalKey = await Database.getKey(key)
    if (!metalKey) return res.status(UNAUTHORIZED).json({ message: `Can't find a matching key.` })
    else req.metalKey = metalKey
    return next()
  } catch (err) {
    console.log('err', err)
    return res.status(SERVER_ERROR).json({ message: err.toString() })
  }
}

const handleError = (req, err) => {
  console.log(req.path, err.toString())
  return res.status(SERVER_ERROR).json({ message: err.toString() })
}

const getSheetsValues = (userId, oauth_token, config) => {
  return new Promise((resolve, reject) => {
    const sheets = GoogleHelpers.authorisedClient(oauth_token)
    sheets.spreadsheets.values.get(config, (err, response) => {
      GoogleHelpers.handlePotentiallyNewOauth(oauth_token, sheets, userId)
      if (err) return reject(err)
      else return resolve(response.data)
    })
  })
}

/**
 * GET /sheets/:key
 */
routes.get('/sheets/:key', verifyMetalKey, async function(req, res) {
  try {
    let metalKey = req.metalKey
    let user = await Database.getUser(metalKey.user_id)
    const sheets = GoogleHelpers.authorisedClient(user.oauth_token)
    sheets.spreadsheets.get(
      {
        spreadsheetId: metalKey.sheet_id,
      },
      (err, response) => {
        if (err) return GoogleHelpers.handleGoogleError(err, req, res)
        let data = response.data
        return res.send(data)
      }
    )
  } catch (err) {
    handleError(req, err)
  }
})

/**
 * GET /sheets/:key
 */
routes.get('/sheets/:key/:sheet/:range?', verifyMetalKey, async function(req, res) {
  try {
    let metalKey = req.metalKey
    const { sheet, range } = req.params
    const { raw } = req.query
    let fullRangeString = range ? `${sheet}!${range}` : sheet
    let user = await Database.getUser(metalKey.user_id)
    let config = { spreadsheetId: metalKey.sheet_id, range: fullRangeString }
    let data = await getSheetsValues(user.id, user.oauth_token, config)
    if (raw) res.send(data)
    else res.send({ ...data, values: GoogleHelpers.valuesToJson(data.values) })
  } catch (err) {
    handleError(req, err)
  }
})

/* POST create new values. */
routes.post('/api/v1/sheets/:key/:sheet/', verifyMetalKey, async function(req, res) {
  try {
    return res.status(NOT_IMPLEMENTED).json({ message: 'Not yet implemented' })
  } catch (err) {
    handleError(req, err)
  }
})

module.exports = routes
