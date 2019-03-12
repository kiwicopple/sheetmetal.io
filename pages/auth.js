import React, { Component } from 'react'
import axios from 'axios'
import Page from '~/components/layouts/Landing'
import Link from 'next/link'
import { login } from '~/lib/Auth'
import { baseUrl } from '~/lib/Helpers'

class Auth extends Component {
  static async getInitialProps({ req }) {
    try {
      let { error, code } = req.query
      if (error) {
        // no token :( the user probably didn't authorise,
        // or the app isn't set up correctly on Google console
        throw new Error(error)
      } else {
        let { data } = await axios.post(`${baseUrl(req)}/api/auth/login`, { code })
        return { metalToken: data.metalToken, isLoggedIn: true }
      }
    } catch (error) {
      console.error('Auth: getInitialProps', error.toString())
      return {
        isLoggedIn: false,
        user: null,
      }
    }
  }

  constructor(props) {
    super(props)
    // set the cookie
    if (props.metalToken) login({ metalToken: props.metalToken })
    this.state = { isLoading: false, loggedIn: props.isLoggedIn && props.metalToken }
  }

  render() {
    let { loggedIn } = this.state
    return (
      <Page id="Auth" classNames="">
        <div className="section container">
          {!loggedIn ? (
            <div className="columns is-centered">
              <div className="column is-8 has-text-centered">
                <h3 className="title is-3">ERROR</h3>
                <p>Something went wrong. Something always goes wrong ¯\_(ツ)_/¯</p>
                <p>
                  <img src="/static/img/fatal-error.png" />
                </p>
              </div>
            </div>
          ) : (
            <div className="columns is-centered">
              <div className="column is-8 has-text-centered">
                <h3 className="title is-3">Success!</h3>
                <p>
                  <Link href="/app/">
                    <span className="button is-primary">Go to console</span>
                  </Link>
                </p>
                <p>
                  <img src="/static/img/sign-in.png" />
                </p>
              </div>
            </div>
          )}
        </div>
      </Page>
    )
  }
}

export default Auth
