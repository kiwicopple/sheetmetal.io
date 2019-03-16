import { copyInputValue } from '~/lib/Helpers'
import { toast } from 'react-toastify'

export default class KeyCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      apiKey: props.apiKey,
    }
    this.keyInput = React.createRef()
    this.cancel = this.cancel.bind(this)
    this.save = this.save.bind(this)
    this.modify = this.modify.bind(this)
  }
  cancel() {
    this.setState({
      isEditing: false,
      apiKey: this.props.apiKey,
    })
  }
  delete(ref) {
    if (copyInputValue(ref.current) === 'SUCCESS')
      toast('Copied', {
        type: toast.TYPE.INFO,
      })
    else
      toast(`Couldn't access your clipboard`, {
        type: toast.TYPE.ERROR,
      })
  }
  // changes the local stage, ready to save to the database
  modify(newState) {
    let apiKey = this.state.apiKey
    this.setState({ apiKey: { ...apiKey, ...newState } })
  }
  async save() {
    console.log('this.state.apiKey', this.state.apiKey)
    this.setState({ isEditing: false })
  }
  render() {
    let { apiKey, isEditing } = this.state
    return (
      <div className="KeyCard box">
        {!isEditing && (
          <React.Fragment>
            <h5 className="title is-6 m-b-sm" />
            <div className="field has-addons">
              <p className="control is-expanded has-icons-left">
                <input className="input" ref={this.keyInput} value={apiKey.key} readOnly />
                <span className="icon is-small is-left">
                  <i className="fas fa-key" />
                </span>
              </p>
              <p className="control">
                <a
                  className="button"
                  onClick={() =>
                    copyInputValue(
                      this.keyInput.current,
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
                </a>
              </p>
            </div>
            <div className="buttons is-right">
              <button className="button" onClick={() => this.setState({ isEditing: true })}>
                Edit
              </button>
              <button className="button">
                <span>Docs</span>
                <span className="icon">
                  <i className="fas fa-arrow-right" />
                </span>
              </button>
            </div>
          </React.Fragment>
        )}

        {!!isEditing && (
          <React.Fragment>
            <div className="field">
              <p className="control is-expanded has-icons-left">
                <input
                  className="input"
                  value={apiKey.description || ''}
                  onChange={e => this.modify({ description: e.target.value })}
                  placeholder="Create a description to identify where you are using this key"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-align-left" />
                </span>
              </p>
            </div>
            <div className="buttons is-right">
              <button className="button is-outlined">Delete</button>
              <button className="button is-outlined" onClick={() => this.cancel()}>
                Cancel
              </button>
              <button className="button is-outlined" onClick={() => this.save()}>
                Save
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    )
  }
}
