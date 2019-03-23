import * as Snippets from '~/components/docs/Snippets'

export default class ApiDocs extends React.Component {
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
        <div className="content m-t-xl">
          <h5 className="title is-4">Get Sheet info</h5>
          <hr className="is-title-accent" />
          <p>Retrieve all the metadata for your sheet:</p>
          <Snippets.getSheet language={language} sheetKey={sheetKey} tab={tabName} range={range} />

          <h5 className="title is-4">Retrieve data</h5>
          <hr className="is-title-accent" />
          <p>Get all the values on a particular sheet:</p>
          <Snippets.retrieveRecords
            language={language}
            sheetKey={sheetKey}
            tab={tabName}
          />

          <p>
            Or, if you only want to get a certain range of values then you can specify which cells
            you want:
          </p>
          <Snippets.retrieveRecordRange
            language={language}
            sheetKey={sheetKey}
            tab={tabName}
            range={range}
          />
          <h6 className="title is-5">Formatting the response</h6>
          <p>
            The response from Google gives all the values in an Array. If your first row contains 
            table headers, you can get SheetMetal to format the response by passing "formatted=true"
          </p>
          <Snippets.retrieveFormattedRecordRange
            language={language}
            sheetKey={sheetKey}
            tab={tabName}
            range={range}
          />

          <h5 className="title is-4">Create new row</h5>
          <hr className="is-title-accent" />
          <Snippets.createRecord
            language={language}
            sheetKey={sheetKey}
            tab={tabName}
            range={range}
          />

          <h5 className="title is-4">Update a row</h5>
          <hr className="is-title-accent" />
          <Snippets.updateRecord
            language={language}
            sheetKey={sheetKey}
            tab={tabName}
            range={range}
          />

          <h5 className="title is-4">Delete a row</h5>
          <hr className="is-title-accent" />
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
