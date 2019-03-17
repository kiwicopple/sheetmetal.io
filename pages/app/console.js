import React, { Component } from 'react'
import axios from 'axios'
import KeyCard from '~/components/console/KeyCard'
import Page from '~/components/layouts/Console'
import { copyInputValue } from '~/lib/Helpers'
import { profile, keys } from '~/lib/Auth'
import { toast } from 'react-toastify'
import NewSheetModal from '~/components/console/NewSheetModal'
import * as Curl from '~/components/docs/Curl'

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
      selectedKey: null,
    }
    this.userIdInput = React.createRef()
    this.createKey = this.createKey.bind(this)
    this.onCreateKeyConfirm = this.onCreateKeyConfirm.bind(this)
    this.getKeys = this.getKeys.bind(this)
    this.showDocs = this.showDocs.bind(this)
  }
  componentDidMount() {
    this.getKeys()
  }
  /**
   * Functions
   */
  async createKey(payload) {
    try {
      let { data: key } = await axios.post('/api/auth/keys', payload)
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
  onCreateKeyConfirm() {
    this.setState({ showNewModal: true })
  }
  async getKeys() {
    let apiKeys = await keys()
    console.log('apiKeys', apiKeys)
    this.setState({ apiKeys })
  }
  showDocs(apiKey) {
    this.setState({ selectedKey: apiKey})
  }
  /**
   * Render
   */
  render() {
    let {
      apiKeys,
      profile,
      showNewModal,
      newKeyDescription,
      selectedKey,
    } = this.state

    return (
      <Page id="Console">
        {!!showNewModal && (
          <NewSheetModal
            onCancel={() =>
              this.setState({
                showNewModal: false,
              })
            }
            onCreate={payload => this.createKey(payload)}
          />
        )}

        <div className="columns is-centered m-none is-gapless">
          <div className={`column ${selectedKey ? 'is-6 fullpage-with-navbar' : 'is-8'}`}>
            <div className="p-lg">
              <h3 className="title is-3">Welcome {profile.name}</h3>
              {/* <p className="subtitle is-size-6">
                You can use your User ID with an API Key to access data from any Google Sheet.
              </p> */}

              <div className="field">
                <label class="label">User ID</label>
                <p className="control is-expanded has-icons-left">
                  <span className="icon is-small is-left">
                    <i className="fas fa-user-lock" />
                  </span>
                  <input className="input" ref={this.userIdInput} value={profile.id} readOnly />
                </p>
              </div>

              <p className="buttons is-right">
                <button
                  className="button is-dark"
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
                  Copy
                </button>
              </p>

              <nav className="level">
                <div className="level-left">
                  <div>
                    <h3 className="title is-3">API Keys</h3>
                  </div>
                </div>

                <div className="level-right">
                  <a
                    className="button is-primary has-shadow"
                    onClick={() => this.onCreateKeyConfirm()}
                  >
                    <span>New</span>
                    <span className="icon">
                      <i className="fas fa-plus" />
                    </span>
                  </a>
                </div>
              </nav>
              <div>
                {apiKeys.map(apiKey => (
                  <KeyCard
                    apiKey={apiKey}
                    key={apiKey.id}
                    isSelected={selectedKey && apiKey.id === selectedKey.id}
                    onDelete={() => this.getKeys()}
                    onDocsClicked={() => this.showDocs(apiKey)}
                  />
                ))}
              </div>
            </div>
          </div>

          {!!selectedKey && (
            <div id="DocsPanel" className="column is-6 has-background-black fullpage-with-navbar">
              <a
                className="delete"
                onClick={() =>
                  this.setState({
                    selectedKey: null,
                  })
                }
              />
              <div className="p-lg">
                <h3 className="title is-3">Docs</h3>
                {/* <p className="subtitle is-size-6">Todo</p> */}

                <div className="field">
                  <label class="label">Sheet ID</label>
                  <p className="control is-expanded ">
                    <input className="input" placeholder="Enter your Sheet ID prefill the docs" />
                  </p>
                </div>
                <div className="field">
                  <label class="label">Tab</label>
                  <p className="control is-expanded ">
                    <input className="input" placeholder="Select the tab" />
                  </p>
                </div>
                <div className="field">
                  <label class="label">Range</label>
                  <p className="control is-expanded ">
                    <input className="input" placeholder="eg: A:Z or A0:Z100" />
                  </p>
                </div>

                <div>
                  <div className="buttons is-right">
                    <div className="dropdown is-right is-hoverable">
                      <div className="dropdown-trigger">
                        <button
                          className="button"
                          aria-haspopup="true"
                          aria-controls="dropdown-menu"
                        >
                          <span>CURL</span>
                          <span className="icon is-small">
                            <i className="fas fa-angle-down" />
                          </span>
                        </button>
                      </div>
                      <div className="dropdown-menu">
                        <div className="dropdown-content ">
                          <a href="#" className="dropdown-item is-active">
                            CURL
                          </a>
                          <hr className="dropdown-divider" />
                          <a href="#" className="dropdown-item">
                            Javascript
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h5 className="title is-5">Create new row</h5>
                  <Curl.getRecords />
                  <h5 className="title is-5">Retrieve data</h5>
                  <Curl.getRecords />
                  <h5 className="title is-5">Update a row</h5>
                  <Curl.getRecords />
                  <h5 className="title is-5">Delete a row</h5>
                  <Curl.getRecords />
                </div>
              </div>
            </div>
          )}
        </div>
      </Page>
    )
  }
}

export default Console
