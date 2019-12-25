import React, { PureComponent } from 'react'
import Link from 'next/link'
import Page from '~/components/layouts/Landing'
import { authUrl } from '~/lib/Auth'

class Home extends PureComponent {
  render() {
    return (
      <Page id="Home">
        <div id="Teaser" className="section has-shadow">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-8 has-text-centered">
                <h3 className="title is-3 m-b-sm">Turn any Google Sheet into a database.</h3>
                <p className="is-size-5 m-b-lg">
                  SheetMetal lets you read and update any Google spreadsheet via a RESTful API.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="has-text-centered section">
          <a
            className="button is-primary is-medium has-text-weight-bold has-shadow is-outlined"
            href={authUrl()}
          >
            <span>Get Started</span>
            <span className="icon">
              <i className="fas fa-arrow-right" />
            </span>
          </a>
        </div>
      </Page>
    )
  }
}

export default Home
