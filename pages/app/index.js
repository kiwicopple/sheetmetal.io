import React, { Component } from 'react'
import axios from 'axios'
import Page from '~/components/layouts/Console'
import { copyInputValue } from '~/lib/Helpers'
import { profile } from '~/lib/Auth'

class Console extends Component {
  static async getInitialProps({ req }) {
    try {
      let user = await profile(req)
      // let { host } = req.headers
      // let protocol = req.secure ? 'https:' : 'http:'
      // let url = `${protocol}//${host}/api/auth/keys`
      // console.log('url', url)
      // let { data: apiKeys } = await axios.post(url, { code })
      // console.log('apiKeys', apiKeys)
      return { profile: user, apiKeys: [] }
    } catch (error) {
      console.error('Auth: getInitialProps', error.toString())
      return {
        apiKeys: [],
        serverError: true,
      }
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      profile: this.props.profile,
    }
    this.userIdInput = React.createRef()
    this.copy = this.copy.bind(this)
    this.createKey = this.createKey.bind(this)
  }

  copy(ref) {
    if (copyInputValue(ref) === 'SUCCESS') console.log('SUCCESS')
    else console.log('ERR')
  }
  async createKey() {
    try {
      let { data: key } = await axios.post('/api/auth/keys')
      console.log('key', key)
    } catch (error) {
      console.error('error', error)
    }
  }
  render() {
    let { profile } = this.state

    return (
      <Page id="Console">
        <div className="section container">
          <div className="columns is-centered">
            <div className="column is-8">
              <h3 className="title is-3">Welcome User name</h3>
              <p className="subtitle is-size-6">Use your User ID with an API Key to get started.</p>

              <div className="field has-addons">
                <p className="control">
                  <a className="button is-static">User ID</a>
                </p>
                <p className="control is-expanded">
                  <input className="input" ref={this.userIdInput} value={profile.id} readOnly />
                </p>
                <p className="control">
                  <a
                    className="button is-primary"
                    onClick={() => this.copy(this.userIdInput.current)}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-copy" />
                    </span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="section container">
          <div className="columns is-centered">
            <div className="column is-8">
              <div className="m-t-lg">
                <h3 className="title is-3">API Keys</h3>
                <p className="subtitle is-size-6">
                  Create a key that you can use with the Metal API
                </p>
                <div className="buttons is-right">
                  <a className="button is-primary has-shadow power-up" onClick={() => this.createKey()}>
                    Create key
                  </a>
                  {this.props.apiKeys.map(apiKey => (
                    <KeyCard apiKey={apiKey} key={apiKey.id} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Page>
    )
  }
}

export default Console
