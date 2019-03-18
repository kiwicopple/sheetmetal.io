import axios from "axios";
import { fetchSheet } from '~/lib/Auth'
export default class NewSheetModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMobileActive: false,
      sheetId: '1S9CRnvvv81aamA0Ycyo9H2RwRuWqDjO9F1iJtizBxtQ',
      description: '',
      connected: null,
      loading: false,
    }
    this.connectSheet = this.connectSheet.bind(this)
  }

  async connectSheet() {
    try {
      let { sheetId } = this.state
      if (sheetId.length > 10) {
        this.setState({
          loading: true,
        })
        let connected = await fetchSheet(sheetId)
        this.setState({
          loading: false,
          connected,
          description: connected.properties.title
        })
      }
    } catch (error) {
      console.log('error', error)
      this.setState({
        loading: false,
      })
    }
  }

  render() {
    let { description, sheetId, connected, loading } = this.state
    let { onCancel, onCreate } = this.props
    let emitOnCancel = onCancel || (() => {})
    let emitOnCreate = onCreate || (() => {})

    return (
      <div id="NewSheetModal" className="custom-modal">
        <div className="modal is-active">
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Connect to a Google sheet</p>
              <button className="delete" onClick={() => emitOnCancel()} />
            </header>
            <section className="modal-card-body">
              <img className={`${!connected && 'is-visible'}`} src="/static/img/connection.png" />
              <label>Sheet ID</label>
              <div className="field has-addons has-addons-right">
                <p className="control is-expanded has-icons-left">
                  <input
                    className="input"
                    value={sheetId}
                    onChange={e =>
                      this.setState({
                        sheetId: e.target.value,
                        connected: false,
                      })
                    }
                    placeholder="Enter the Sheet ID"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-table" />
                  </span>
                </p>

                {!loading ? (
                  <p className="control">
                    <a
                      className={`button ${!connected ? 'is-primary' : 'is-dark'}`}
                      onClick={() => this.connectSheet()}
                    >
                      Connect
                    </a>
                  </p>
                ) : (
                  <p className="control">
                    <a className={`button disabled`}>Loading ...</a>
                  </p>
                )}
              </div>

              {connected && (
                <div className="field">
                  <label>Description</label>
                  <p className="control is-expanded has-icons-left">
                    <input
                      className="input"
                      value={description}
                      onChange={e =>
                        this.setState({
                          description: e.target.value,
                        })
                      }
                      placeholder="Create a description"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-align-left" />
                    </span>
                  </p>
                </div>
              )}
            </section>
            <footer className="modal-card-foot">
              {connected && (
                <div className="buttons">
                  <button className={`button is-outlined is-dark`} onClick={() => emitOnCancel()}>
                    Cancel
                  </button>
                  <button
                    className={`button is-primary`}
                    onClick={() =>
                      emitOnCreate({
                        sheetId,
                        description,
                        data: connected
                      })
                    }
                  >
                    <span>Create key</span>
                    <span className="icon">
                      <i className={`fas fa-fw fa-plus`} />
                    </span>
                  </button>
                </div>
              )}
            </footer>
          </div>
        </div>
      </div>
    )
  }
}
