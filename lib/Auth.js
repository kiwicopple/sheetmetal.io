import axios from 'axios'
import Cookies from 'js-cookie'
import { baseUrl } from '~/lib/Helpers'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const OAUTH_REDIRECT_URL = process.env.OAUTH_REDIRECT_URL
const GOOGLE_OATH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const SCOPES = [
  'https://www.googleapis.com/auth/userinfo.profile', // this comes anyway
  'https://www.googleapis.com/auth/userinfo.email', // not strictly required, but likely to be used soon for sharing
  'https://www.googleapis.com/auth/spreadsheets', // CRUD
  'https://www.googleapis.com/auth/drive', // Get a list of sheets (allow the user to "favourite" some), and in the future subscribe to updates
]

/**
 * Constructs the google OAuth URL
 */
export function authUrl() {
  let scope = encodeURIComponent(SCOPES.join(' '))
  let redirect = encodeURIComponent(OAUTH_REDIRECT_URL)
  return (
    `${GOOGLE_OATH_URL}?scope=${scope}` +
    `&access_type=offline` +
    `&include_granted_scopes=true` +
    `&state=state_parameter_passthrough_value` +
    `&redirect_uri=${redirect}` +
    `&response_type=code` +
    `&prompt=consent` +
    `&client_id=${GOOGLE_CLIENT_ID}`
  )
}

/**
 * Login
 */
export function login({ metalToken }) {
  return new Promise(async (resolve, reject) => {
    try {
      Cookies.set('metalToken', metalToken)
      return resolve(true)
    } catch (error) {
      return reject(data)
    }
  })
}

/**
 * Logout
 */
export function logout() {
  return new Promise((resolve, reject) => {
    try {
      Cookies.remove('metalToken')
      return resolve('Logout success')
    } catch (error) {
      return reject(error)
    }
  })
}

/**
 * Get the user's logged in profile. Throw an error if not logged in
 * Isomorphic - if called from serverside then you must also pass 'req'
 */
export function profile(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let base = req ? baseUrl(req) : ''
      let { data } = await axios.get(`${base}/api/auth/me`, {
        headers: req ? { cookie: req.headers.cookie } : undefined,
      })
      if (data && data.id) return resolve(data)
      else return reject(null)
    } catch (error) {
      return reject(error)
    }
  })
}

/**
 * Get the user's api keys
 * Isomorphic - if called from serverside then you must also pass 'req'
 */
export function keys(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let base = req ? baseUrl(req) : ''
      let { data } = await axios.get(`${base}/api/auth/keys`, {
        headers: req ? { cookie: req.headers.cookie } : undefined,
      })
      if (data) return resolve(data)
      else return reject(null)
    } catch (error) {
      return reject(error)
    }
  })
}
