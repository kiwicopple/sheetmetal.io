import React, { Component } from 'react'
import axios from 'axios'
import Page from '~/components/layouts/Landing'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { login } from '~/lib/Auth'

class Auth extends Component {
  static async getInitialProps({ req }) {
    try {
      let { error, code } = req.query
      let { host } = req.headers

      if (error) {
        // no token :( the user probably didn't authorise,
        // or the app isn't set up correctly on Google console
        throw new Error(error)
      } else {
        let protocol = req.secure ? 'https:' : 'http:'
        let url = `${protocol}//${host}/api/auth/login`
        let { data } = await axios.post(url, { code })
        console.log('data', data)
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
    console.log('props.metalToken', props.metalToken)

    this.state = {
      isLoading: false,
      loggedIn: props.isLoggedIn,
    }
  }

  render() {
    let { isLoading, loggedIn } = this.state
    return (
      <Page id="Auth" classNames="">
        <div className="section container">
          {!!loggedIn ? (
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
