import * as Snippets from '~/components/docs/Snippets'

export default class ApiDocs extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      tabName: '',
      range: '',
    }
  }

  render() {
    let { language = 'CURL', sheetKey } = this.props
    let { tabName, range } = this.state
    return (
      <div>
        <div className="m-b-md">
          <p>Use these fields to prefill the docs. Makes it easier to copy and paste!</p>
        </div>
        <div className="field">
          <label className="label">Tab</label>
          <p className="control is-expanded ">
            <input
              className="input"
              placeholder="Enter the name of the tab within your sheet"
              value={tabName}
              onChange={e => this.setState({ tabName: e.target.value })}
            />
          </p>
        </div>
        <div className="field">
          <label className="label">Range</label>
          <p className="control is-expanded ">
            <input
              className="input"
              placeholder="eg: A:Z or A0:Z100"
              value={range}
              onChange={e => this.setState({ range: e.target.value })}
            />
          </p>
        </div>
        <hr />
        <div>
          <h5 className="title is-5">Get Sheet info</h5>
          <Snippets.getSheet language={language} sheetKey={sheetKey} tab={tabName} range={range} />
  
          <h5 className="title is-5">Create new row</h5>
          <Snippets.createRecord
            language={language}
            sheetKey={sheetKey}
            tab={tabName}
            range={range}
          />
  
          <h5 className="title is-5">Retrieve data</h5>
          <Snippets.retrieveRecords
            language={language}
            sheetKey={sheetKey}
            tab={tabName}
            range={range}
          />
  
          <h5 className="title is-5">Update a row</h5>
          <Snippets.updateRecord
            language={language}
            sheetKey={sheetKey}
            tab={tabName}
            range={range}
          />
  
          <h5 className="title is-5">Delete a row</h5>
          <Snippets.deleteRecords
            language={language}
            sheetKey={sheetKey}
            tab={tabName}
            range={range}
          />
        </div>
      </div>
    )
  }
  
}
