require('dotenv').config()

const express = require('express')
const next = require('next')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const axios = require('axios')

const verifyJWT = token => {
  return new Promise(resolve => {
    resolve(jwt.verify(token, JWT_SECRET))
  })
}

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const PORT = process.env.PORT ? process.env.PORT : dev ? 3000 : 8080
const AUTH_URL = dev ? '' : ''
const JWT_SECRET = 'secret account key'

const noLoginRequired = async (req, res, next) => {
  next()
  return
}

const verifyLoggedIn = async (req, res, next) => {
  try {
    let token = req.cookies['accessToken']
    if (!token) throw new Error('No auth token')
    let decoded = await verifyJWT(token)
    // console.log('decoded', decoded)
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
     * API
     */
    server.post('/api/auth/login', async (req, res, next) => {
      try {
        const { login, password } = req.body
        let url = `${AUTH_URL}/api/login`
        let payload = {
          user: {
            login: login,
            password: password,
          },
        }
        let { data: validUser } = await axios.post(url, payload)
        delete validUser.accounts
        delete validUser.subscriptions
        const accessToken = jwt.sign(validUser, JWT_SECRET)
        return res.json({ accessToken })
      } catch (error) {
        console.log('error', error)
        console.log('Error data', error.response.data)
        return res.status(422).json({ message: 'Invalid username or password' })
      }
    })

    server.get('/api/me', async (req, res, next) => {
      try {
        let token = req.cookies['accessToken']
        if (!token) throw new Error('No auth token')
        let decoded = await verifyJWT(token)
        return res.json({ user: decoded })
      } catch (err) {
        console.log('err', err)
        return res.status(422).json({ message: 'Not logged in' })
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
