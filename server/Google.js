const Database = require('../db/database')
const { google } = require('googleapis')

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const OAUTH_REDIRECT_URL = process.env.OAUTH_REDIRECT_URL

/**
 * Probably the most annoying part of the whole google library is figuring out refreshed tokens
 * https://github.com/googleapis/google-api-nodejs-client/pull/235 and
 * https://github.com/googleapis/google-api-nodejs-client/issues/783
 * helped a lot
 */

/**
 * Google may refresh the token upon returning a result
 * Save the token so that it's faster next time (and we don't hit account limits on refreshes)
 */
exports.handlePotentiallyNewOauth = (oldOauth, googleLib, userId) => {
  let responseToken = googleLib['_options'].auth.credentials
  if (oldOauth.access_token !== responseToken.access_token) {
    console.log('newToken needs refreshing', responseToken)
    Database.updateOathForUser(userId, responseToken)
  }
}

exports.authorisedClient = googleAuth => {
  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    OAUTH_REDIRECT_URL
  )
  oauth2Client.setCredentials({ ...googleAuth })
  return google.sheets({ version: 'v4', auth: oauth2Client })
}

exports.handleGoogleError = (error, req, res) => {
  let err = error.response.data
  console.log('error', err)
  return res.status(500).send(err)
}

exports.getAuthFromHeaders = async (headers, query, userId) => {
  try {
    const key = query ? query.key : null
    const googleToken = headers['google-token'] ? JSON.parse(headers['google-token']) : null
    const metalKey = headers['metal-key'] || null
    if (googleToken) {
      // no need to look up the token, just use the one provided
      return googleToken
    } else if (metalKey || key) {
      // API is being called externally, they should be passing a 'metal-key'
      let apiKey = metalKey || key
      let user = (await Database.getUserForKey(apiKey, userId)) || null
      return user && user['oauth_token'] ? user['oauth_token'] : null
    } else {
      console.log('no auth')
      return null
    }
  } catch (error) {
    console.log('error', error)
    return null
  }
}

exports.valuesToJson = arrayValues => {
  let headers = arrayValues[0]
  let values = arrayValues.slice(1)
  return values.map(val => {
    // turn the array into an object
    let o = {}
    for (var i = 0; i < headers.length; i++) {
      let header = headers[i]
      o[`${header}`] = val[i]
    }
    return o
  })
}
