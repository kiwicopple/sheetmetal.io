import React, { PureComponent } from 'react'
import Page from '~/components/layouts/Landing'

class Home extends PureComponent {
  render() {
    return (
      <Page id="Home">
        <div className="hero is-large is-dark">
          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <div className="column">Details</div>
                <div className="column">Loaded</div>
              </div>
            </div>
          </div>
        </div>
      </Page>
    )
  }
}

export default Home
