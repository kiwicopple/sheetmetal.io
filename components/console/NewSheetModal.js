export default class NewSheetModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMobileActive: false,
      sheetId: '',
      description: '',
    }
  }

  render() {
    let { description, sheetId } = this.state
    let { onCancel, onCreate } = this.props
    let emitOnCancel = onCancel || (() => {})
    let emitOnCreate = onCreate || (() => {})

    return (
      <div id="Modal">
        <div className="modal is-active">
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Create key</p>
              <button className="delete" onClick={() => emitOnCancel()} />
            </header>
            <section className="modal-card-body">
              <div className="field">
                <label>Sheet ID</label>
                <p className="control is-expanded has-icons-left">
                  <input
                    className="input"
                    value={sheetId}
                    onChange={e =>
                      this.setState({
                        sheetId: e.target.value,
                      })
                    }
                    placeholder="Enter the Sheet ID"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-table" />
                  </span>
                </p>
              </div>
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
                    placeholder="Create a description to identify where you are using this key"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-align-left" />
                  </span>
                </p>
              </div>
            </section>
            <footer className="modal-card-foot">
              <div className="buttons">
                <button className={`button is-outlined is-dark`} onClick={() => emitOnCancel()}>
                  Cancel
                </button>
                <button className={`button is-primary`} onClick={() => emitOnCreate({
                  sheetId, description
                })}>
                  <span>Create</span>
                  <span className="icon">
                    <i className={`fas fa-fw fa-plus`} />
                  </span>
                </button>
              </div>
            </footer>
          </div>
        </div>
      </div>
    )
  }
}
