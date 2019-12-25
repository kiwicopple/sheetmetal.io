import React from 'react'
import Page from '~/components/layouts/Landing'

export default class ErrorPage extends React.Component {
  render() {
    return (
      <Page id="Hmmm..">
        <div className="section container">
          <div className="columns is-centered">
            <div className="column is-8 has-text-centered">
              <h3 className="title is-3">Hmmm..</h3>
              <p>Something went wrong. Something always goes wrong ¯\_(ツ)_/¯</p>
              <p>
                <img src="/img/fatal-error.png" />
              </p>
            </div>
          </div>
        </div>
      </Page>
    )
  }
}
