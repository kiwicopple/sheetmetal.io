import * as Curl from './snippets/Curl'

const wrapCode = codeString => (
  <div className="code-snippet">
    <pre>
      <button className="button is-dark">Copy</button>
      <code>{codeString}</code>
    </pre>
  </div>
)

export const getSheet = ({ language, sheetKey }) => {
  switch (language) {
    case 'CURL':
      return wrapCode(Curl.getSheet(sheetKey))
    default:
      return <div />
  }
}

export const createRecord = ({ language, sheetKey, tab }) => {
  switch (language) {
    case 'CURL':
      return wrapCode(Curl.createRecord(sheetKey, tab))
    default:
      return <div />
  }
}

export const retrieveRecords = ({ language, sheetKey, tab, range }) => {
  switch (language) {
    case 'CURL':
      return wrapCode(Curl.retrieveRecords(sheetKey, tab, range))
    default:
      return <div />
  }
}

export const retrieveRecordRange = ({ language, sheetKey, tab, range }) => {
  switch (language) {
    case 'CURL':
      return wrapCode(Curl.retrieveRecordRange(sheetKey, tab, range))
    default:
      return <div />
  }
}

export const retrieveFormattedRecordRange = ({ language, sheetKey, tab, range }) => {
  switch (language) {
    case 'CURL':
      return wrapCode(Curl.retrieveFormattedRecordRange(sheetKey, tab, range))
    default:
      return <div />
  }
}

export const updateRecord = ({ language, sheetKey, tab, range }) => {
  switch (language) {
    case 'CURL':
      return wrapCode(Curl.updateRecord(sheetKey, tab, range))
    default:
      return <div />
  }
}

export const deleteRecords = ({ language, sheetKey, tab, range }) => {
  switch (language) {
    case 'CURL':
      return wrapCode(Curl.deleteRecords(sheetKey, tab, range))
    default:
      return <div />
  }
}
