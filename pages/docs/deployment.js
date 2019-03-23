import Page from '~/components/layouts/Docs'
import ReactMarkdown from 'react-markdown'

const MARKDOWN = `
Will update this later. Too busy shipping.

## Step 1

Deploy the app

## Step 2

Profit

`

export default class ApiPage extends React.Component {
  render() {
    return (
      <Page id="Deployment" activeLink="DEPLOYMENT">
        <div>
          <h3 className="title is-3">Deployment</h3>
          <hr className="m-t-none is-hidden-tablet" style={{ maxWidth: '100px' }} />
          <div className="content">
          <ReactMarkdown source={MARKDOWN} />
          </div>
        </div>
      </Page>
    )
  }
}
