export default class KeyCard extends React.PureComponent {
  render() {
    return (
      <div className="TokenCard box">
        <div className="field has-addons">
          <p className="control is-expanded has-icons-left">
            <input className="input" value={key} readonly />
            <span className="icon is-small is-left">
              <i className="fas fa-key" />
            </span>
          </p>
          <p className="control">
            <a className="button" onClick={() => this.copyKey()}>
              <span className="icon is-small">
                <i className="fas fa-trash" />
              </span>
            </a>
          </p>
          <p className="control">
            <a className="button" onClick={() => this.copyKey()}>
              <span className="icon is-small">
                <i className="fas fa-copy" />
              </span>
            </a>
          </p>
        </div>
        <div className="field is-grouped is-grouped-multiline">
          <div className="control">
            <div className="tags has-addons">
              <span className="tag">Tag 1</span>
              <a className="tag is-delete" />
            </div>
          </div>
          <div className="control">
            <div className="tags has-addons">
              <span className="tag">Tag 2</span>
              <a className="tag is-delete" />
            </div>
          </div>
          <div className="control has-icons-right">
            <input className="input is-small" placeholder="Tag this token" />
          </div>
        </div>
      </div>
    )
  }
}
