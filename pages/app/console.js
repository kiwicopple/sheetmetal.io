import React, { Component } from 'react'
import axios from 'axios'
import KeyCard from '~/components/console/KeyCard'
import Page from '~/components/layouts/Console'
import { copyInputValue } from '~/lib/Helpers'
import { profile, keys } from '~/lib/Auth'
import { toast } from 'react-toastify'
import Modal from '~/components/common/Modal'

class Console extends Component {
  static async getInitialProps({ req }) {
    try {
      let user = await profile(req)
      let apiKeys = await keys(req)
      return { profile: user, apiKeys }
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
      profile: props.profile,
      apiKeys: props.apiKeys,
      showNewModal: false,
      newKeyDescription: '',
    }
    this.userIdInput = React.createRef()
    this.createKey = this.createKey.bind(this)
    this.onCreateKeyConfirm = this.onCreateKeyConfirm.bind(this)
  }
  createKey() {
    this.setState({ showNewModal: true })
  }
  createKey() {
    this.setState({ showNewModal: true })
  }
  async onCreateKeyConfirm(props) {
    // try {
    //   let { data: key } = await axios.post('/api/auth/keys')
    //   console.log('key', key)
    // } catch (error) {
    //   console.error('error', error)
    // }
    console.log('props', props)
    this.setState({ showNewModal: false })
  }
  render() {
    let { apiKeys, profile, showNewModal, newKeyDescription } = this.state
    return (
      <Page id="Console">
        {!!showNewModal && (
          <Modal
            onCancel={() => this.setState({ showNewModal: false })}
            secondaryButtonClass="is-dark"
            secondaryButtonText="Cancel"
            onSecondaryClick={() => this.setState({ showNewModal: false })}
            primaryButtonClass="is-primary"
            primaryButtonText="Create"
            onPrimaryClick={props => this.onCreateKeyConfirm(props)}
            icon="fa-plus"
            title={'Create key'}
            textInput={newKeyDescription}
            onTextInputChanged={newKeyDescription => this.setState({ newKeyDescription })}
          />
        )}
        <div className="section container">
          <div className="columns is-centered">
            <div className="column is-8">
              <h3 className="title is-3">Welcome {profile.name}</h3>
              <p className="subtitle is-size-6">
                You can use your User ID with an API Key to access data from any Google Sheet.
              </p>

              <div className="field has-addons">
                <p className="control is-expanded has-icons-left">
                  <span className="icon is-small is-left">
                    <i className="fas fa-user-lock" />
                  </span>
                  <input className="input" ref={this.userIdInput} value={profile.id} readOnly />
                </p>
                <p className="control">
                  <a
                    className="button"
                    onClick={() =>
                      copyInputValue(
                        this.userIdInput.current,
                        () => toast('Copied', {
                          type: toast.TYPE.INFO,
                        }),
                        () => toast(`Couldn't access your clipboard`, {
                          type: toast.TYPE.ERROR,
                        })
                      )
                    }
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
              <nav className="level">
                <div className="level-left">
                  <div>
                    <h3 className="title is-3">API Keys</h3>
                  </div>
                </div>

                <div className="level-right">
                  <a className="button is-primary" onClick={() => this.createKey()}>
                    <span>New</span>
                    <span className="icon">
                      <i className="fas fa-plus" />
                    </span>
                  </a>
                </div>
              </nav>
              <div>
                {apiKeys.map(apiKey => (
                  <KeyCard apiKey={apiKey} key={apiKey.id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Page>
    )
  }
}

export default Console
