import React, { Component } from 'react'
import axios from 'axios'
import KeyCard from '~/components/console/KeyCard'
import Page from '~/components/layouts/Console'
import { copyInputValue } from '~/lib/Helpers'
import { profile, keys } from '~/lib/Auth'
import { toast } from 'react-toastify'
import NewSheetModal from '~/components/console/NewSheetModal'
import ApiDocs from '~/components/docs/Api'
import LanguageSelector from '~/components/docs/LanguageSelector'

export default class Console extends Component {
  static async getInitialProps({ req }) {
    try {
      let user = await profile(req)
      return { profile: user }
    } catch (error) {
      console.error('Auth: getInitialProps', error)
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
    this.setState({ selectedKey: apiKey })
  }
  /**
   * Render
   */
  render() {
    let { apiKeys, profile, showNewModal, newKeyDescription, selectedKey } = this.state

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
            profile={profile}
          />
        )}

        <div className="columns is-centered m-none is-gapless">
          <div className={`column is-8`}>
            <div className="p-lg">
              {!apiKeys.length ? (
                <div className="has-text-centered">
                  <nav className="level m-t-lg">
                    <div className="level-left">
                      <h3 className="title is-5">No sheets connected ... yet</h3>
                    </div>

                    <div className="level-right">
                      <a
                        className="button is-primary has-shadow"
                        onClick={() => this.onCreateKeyConfirm()}
                      >
                        <span>Connect a sheet</span>
                        <span className="icon">
                          <i className="fas fa-arrow-right" />
                        </span>
                      </a>
                    </div>
                  </nav>
                  <img src="/static/img/empty-list.png" />
                </div>
              ) : (
                <React.Fragment>
                  <h3 className="title is-3">Welcome {profile.name}</h3>

                  <div className="field">
                    <label className="label">User ID</label>
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
                </React.Fragment>
              )}
            </div>
          </div>

          {!!selectedKey && (
            <DocsPanel
              sheetKey={selectedKey.key}
              onClose={() => this.setState({ selectedKey: null })}
            />
          )}
        </div>
      </Page>
    )
  }
}

class DocsPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedLanguage: 'CURL',
      range: '',
    }
    this.emitOnClose = this.props.onClose || (() => {})
  }
  render() {
    let { selectedLanguage } = this.state
    let { sheetKey } = this.props
    return (
      <div
        id="quickviewDefault"
        className="quickview has-background-grey-darker is-active is-large"
      >
        <header className="quickview-header">
          <p className="title">
            <LanguageSelector
              onLanguageUpdated={selectedLanguage => this.setState({ selectedLanguage })}
            />
          </p>
          <span className="delete" onClick={() => this.emitOnClose()} />
        </header>
        <div className="has-overflow-scroll">
          <div className="p-md">
            <ApiDocs language={selectedLanguage} sheetKey={sheetKey.key} />
          </div>
        </div>
      </div>
    )
  }
}
