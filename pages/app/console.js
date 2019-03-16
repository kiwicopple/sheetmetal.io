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
      return { profile: user }
    } catch (error) {
      console.error('Auth: getInitialProps', error.toString())
      return {
        serverError: true,
      }
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      profile: props.profile,
      apiKeys: [],
      showNewModal: false,
      newKeyDescription: '',
    }
    this.userIdInput = React.createRef()
    this.createKey = this.createKey.bind(this)
    this.onCreateKeyConfirm = this.onCreateKeyConfirm.bind(this)
    this.getKeys = this.getKeys.bind(this)
  }
  componentDidMount() {
    this.getKeys()
  }
  onCreateKeyConfirm() {
    this.setState({ showNewModal: true })
  }
  async getKeys() {
    let apiKeys = await keys()
    console.log('apiKeys', apiKeys)
    this.setState({ apiKeys })
  }
  async createKey() {
    try {
      let { newKeyDescription } = this.state
      let { data: key } = await axios.post('/api/auth/keys', {
        description: newKeyDescription,
      })
      console.log('key', key)
      let apiKeys = [key, ...this.state.apiKeys]
      this.setState({
        apiKeys,
        showNewModal: false,
        newKeyDescription: '',
      })
    } catch (error) {
      console.error('error', error)
      toast(`There was an error creating your new key :(`, {
        type: toast.TYPE.ERROR,
      })
    }
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
            onPrimaryClick={() => this.createKey()}
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
                        () =>
                          toast('Copied', {
                            type: toast.TYPE.INFO,
                          }),
                        () =>
                          toast(`Couldn't access your clipboard`, {
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
                  <a className="button is-primary" onClick={() => this.onCreateKeyConfirm()}>
                    <span>New</span>
                    <span className="icon">
                      <i className="fas fa-plus" />
                    </span>
                  </a>
                </div>
              </nav>
              <div>
                {apiKeys.map(apiKey => (
                  <KeyCard apiKey={apiKey} key={apiKey.id} onDelete={() => this.getKeys()} />
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
