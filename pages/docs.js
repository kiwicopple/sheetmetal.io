import Page from '~/components/layouts/Docs'
import * as docs from '~/docs/index.js'

export default ({ url }) => {
  const { query } = url
  let doc = query.page ? docs[query.page] : docs.getting_started
  let metadata = doc.metadata || {}
  let Content = doc.default
  return (
    <Page id="Deployment" activeLink="HOSTING">
      <div className="docs">
        <h2 className="title is-3">{metadata.title || 'Documentation'}</h2>
        <hr className="m-t-none is-hidden-tablet" style={{ maxWidth: '100px' }} />
        <div className="content">
          <Content />
        </div>
      </div>
    </Page>
  )
}
