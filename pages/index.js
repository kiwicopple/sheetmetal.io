
import React, { Component } from 'react'
import Page from '~/components/layouts/Landing'
import Router from 'next/router'
import axios from 'axios'
import Cookies from 'js-cookie'
import { login } from '~/lib/Auth'

class Home extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      error: '',
      isLoading: false,
    }
  }

  async componentDidMount() {
    try {
      let { data } = await axios.get('/api/me').catch(err => {
        console.log('Not logged in', err)
      })
      if (data.user) Router.push('/app/')
    } catch (error) {
      console.log('Not logged in', error)
    }
  }

  async handleSubmit(e) {
    e.preventDefault()
    this.setState({ isLoading: true })
    try {
      await login()
      Router.push('/app/')
    } catch (error) {
      console.log('error', error)
      this.setState({ error: 'Login error', isLoading: false })
    }
  }

  render() {
    let { isLoading, error } = this.state
    return (
      <Page id="Home">
      <div className="hero is-large is-dark">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
            <div className="column">
              Details
            </div>
            <div className="column">


                      <h3 className="title is-3">Login</h3>
                      <form onSubmit={this.handleSubmit}>
                        <div className="box">
                          <div className="field">
                            <input className="input" type="text" ref="login" placeholder="Username" />
                          </div>
                          <div className="field">
                            <input className="input" type="password" ref="password" placeholder="Password" />
                          </div>
                        </div>
                        <input
                          type="submit"
                          value="Login"
                          className="button is-primary is-fullwidth"
                          disabled={isLoading}
                        />
                      </form>

                    <p>{error}</p>

            </div>
            </div>
          </div>
        </div>
      </div>
      </Page>
    )
  }
}

export default Home
