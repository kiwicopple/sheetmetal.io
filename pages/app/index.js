import React, { Component } from 'react'
import Page from '~/components/layouts/Console'

class Console extends Component {
  static async getInitialProps({ req }) {
    try {
      let { host } = req.headers
      let protocol = req.secure ? 'https:' : 'http:'
      let url = `${protocol}//${host}/api/auth/keys`
      let { data: apiKeys } = await axios.post(url, { code })
      console.log('apiKeys', apiKeys)
      return {}
    } catch (error) {
      console.error('Auth: getInitialProps', error.toString())
      return {
        apiKeys: [],
        serverError: true,
      }
    }
  }

  render() {
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
                  <input className="input" ref="userId" value="profile.id" readonly />
                </p>
                <p className="control">
                  <a className="button is-primary" onClick={() => this.copyId()}>
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
                  <a
                    className="button is-primary has-shadow power-up"
                    onClick={() => this.createKey()}
                  >
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
