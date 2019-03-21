import React, { PureComponent } from 'react'
import Page from '~/components/layouts/Landing'

export default class Docs extends PureComponent {
  render() {
    return (
      <Page id="Home">
        <div className="section container">
          <h1 className="title is-3">Documentation</h1>
          <hr className="m-t-none" style={{ maxWidth: '100px' }} />

          <div className="columns">
            <div className="column is-3">
              <aside className="menu">
                <p className="menu-label is-hidden-tablet">Menu</p>
                <ul className="menu-list">
                  <li>
                    <a className="is-active">API</a>
                  </li>
                  <li>
                    <a>Deployment</a>
                  </li>
                </ul>
              </aside>
            </div>
            <div className="column">
              <h3 className="title is-4">API</h3>
              <hr className="m-t-none is-hidden-tablet" style={{ maxWidth: '100px' }} />
              <p>Some docs</p>
            </div>
          </div>
        </div>
      </Page>
    )
  }
}
