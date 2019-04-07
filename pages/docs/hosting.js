import Page from '~/components/layouts/Docs'
import MDXDocument from '~/docs/hosting.mdx'


export default class ApiPage extends React.Component {
  render() {
    return (
      <Page id="Deployment" activeLink="HOSTING">
        <div>
          <h3 className="title is-3">Self Hosting</h3>
          <hr className="m-t-none is-hidden-tablet" style={{ maxWidth: '100px' }} />
          <div className="content">
          <MDXDocument />
          </div>
        </div>
      </Page>
    )
  }
}
