require('dotenv').config()

const express = require('express')
const next = require('next')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const axios = require('axios')
const Database = require('../db/database')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const PORT = process.env.PORT ? process.env.PORT : dev ? 3000 : 8080
const JWT_SECRET = process.env.JWT_SECRET
const GOOGLE_TOKEN_URL = `https://www.googleapis.com/oauth2/v4/token`
const GOOGLE_USER_URL = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json`
const GOOGLE_GRANT_TYPE = `authorization_code`
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const OAUTH_REDIRECT_URL = process.env.OAUTH_REDIRECT_URL

const verifyJWT = token => {
  return new Promise(resolve => {
    resolve(jwt.verify(token, JWT_SECRET))
  })
}

const noLoginRequired = async (req, res, next) => {
  next()
  return
}

const verifyLoggedIn = async (req, res, next) => {
  try {
    let token = req.cookies['metalToken']
    if (!token) throw new Error('No auth token')
    let decoded = await verifyJWT(token)
    console.log('decoded', decoded)
    next()
    return
  } catch (err) {
    console.log('err', err)
    return res.redirect('/')
  }
}

app
  .prepare()
  .then(() => {
    const server = express()

    server.use(cookieParser())
    server.use(bodyParser())

    /**
     * Login
     * Takes Google's short lived token and creates a refresh token
     */
    server.post('/api/auth/login', async (req, res, next) => {
      try {
        const { code } = req.body
        // Get a "refresh" token
        let { data: googleToken } = await axios.post(GOOGLE_TOKEN_URL, {
          code: code,
          client_id: GOOGLE_CLIENT_ID,
          client_secret: GOOGLE_CLIENT_SECRET,
          redirect_uri: OAUTH_REDIRECT_URL,
          grant_type: GOOGLE_GRANT_TYPE,
        })

        // Also get the user info
        let { data: user } = await axios.get(GOOGLE_USER_URL, {
          headers: { Authorization: `Bearer ${googleToken.access_token}` },
        })

        // Create a mutable token
        let token = {
          ...googleToken,
          expiry_date: new Date().getTime() + googleToken.expires_in * 1000,
        }
        delete token.expires_in
        Database.upsertUser(user, token)
        const metalToken = jwt.sign({ token, user }, JWT_SECRET)
        return res.json({ metalToken })
      } catch (error) {
        console.log('error', error)
        return res.status(422).json({ message: 'Login error' })
      }
    })

    server.get('/api/auth/me', async (req, res, next) => {
      try {
        let token = req.cookies['metalToken']
        if (!token) throw new Error('No auth token')
        let decoded = await verifyJWT(token)
        return res.json({ ...decoded.user })
      } catch (err) {
        console.log('/api/auth/me', err.toString())
        return res.status(422).json({ message: 'Not logged in' })
      }
    })

    // Get all metal keys for this user
    server.get('/api/auth/keys/', verifyLoggedIn, async function(req, res) {
      try {
        let token = req.cookies['metalToken']
        let { user } = await verifyJWT(token)
        let tokens = await Database.getKeys(user.id)
        return res.json(tokens)
      } catch (error) {
        console.log('error', error)
        return res.error(error)
      }
    })

    // Save a metal key
    server.post('/api/auth/keys/', verifyLoggedIn, async function(req, res) {
      try {
        let token = req.cookies['metalToken']
        let { user } = await verifyJWT(token)
        const { description } = req.body
        let id = await Database.saveKey(Database.uuidv4(), user.id, description)
        return res.json(id)
      } catch (error) {
        console.log('error', error)
        return res.error(error)
      }
    })

    // Update a metal key
    server.patch('/api/auth/keys/:id', verifyLoggedIn, async function(req, res) {
      try {
        let token = req.cookies['metalToken']
        const { user } = await verifyJWT(token)
        const { id } = req.params
        const { payload } = req.body
        if (!id) return res.error('ID is required')
        if (!payload) return res.error('Payload is required')
        let response = await Database.updateTable('keys', id, user.id, payload)
        return res.json(response)
      } catch (error) {
        console.log('error', error)
        return res.error(error)
      }
    })

    // Delete a metal key
    server.delete('/api/auth/keys/:id', verifyLoggedIn, async function(req, res) {
      try {
        const { id } = req.params
        if (!id) return res.error('ID is required')
        let token = req.cookies['metalToken']
        let { user } = await verifyJWT(token)
        let response = await Database.deleteKey(id, user.id)
        return res.json(response)
      } catch (error) {
        console.log('error', error)
        return res.error(error)
      }
    })

    /**
     * Secured
     */
    server.get('/app/*', verifyLoggedIn, (req, res) => {
      return handle(req, res)
    })

    /**
     * Unsecured - only the login page and other static resources
     */
    server.get('*', noLoginRequired, (req, res) => {
      return handle(req, res)
    })

    server.listen(PORT, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${PORT}`)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
