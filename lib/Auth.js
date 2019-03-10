import axios from 'axios'
import Cookies from 'js-cookie'

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
 * Login
 */
export function login() {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios.post('/api/auth/login', {
        login: this.refs.login.value,
        password: this.refs.password.value,
      })
      console.log('data', data)
      Cookies.set('accessToken', data.accessToken)
      return resolve(data)
    } catch (error) {
      return reject(data)
    }
  })
}
