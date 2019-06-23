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
                <h3 className="title is-3 m-b-sm">Turn Google Sheets into a database.</h3>
                <p className="is-size-5 m-b-lg">
                  SheetMetal lets you update any Google spreadsheet via a RESTful API.
                </p>
                {/* <div id="Video">
                  <p>Video here</p>
                </div> */}
                <img src="/static/img/hero.png" alt="Sheet Metal" />
              </div>
            </div>
          </div>
        </div>

        <div className="has-text-centered section">
          <Link href="/docs">
            <a className="button is-medium has-text-weight-bold m-r-md">Learn more</a>
          </Link>
          <a
            className="button is-primary is-medium has-text-weight-bold has-shadow"
            href={authUrl()}
          >
            <span>Get Started</span>
            <span className="icon">
              <i className="fas fa-arrow-right" />
            </span>
          </a>
        </div>
        {/* How it works */}
        <div className="section container m-b-lg">
          <h5 className="title is-3">Use Cases</h5>
          <hr className="m-t-none" style={{ maxWidth: '100px' }} />
          <div className="columns">
            <div className="column ">
              <div className="box">
                <div className="">
                  <img src="/static/img/use-prototype.png" alt="Use for prototyping" width="50" />
                </div>
                <h5 className="title is-5 m-b-sm">Prototyping</h5>
                <p>
                  Don't worry about setting up a database. Use a Google Sheets for rapid
                  prototyping.
                </p>
              </div>
            </div>
            <div className="column ">
              <div className="box">
                <div className="">
                  <img src="/static/img/use-crm.png" alt="Use as CRM" width="50" />
                </div>
                <h5 className="title is-5 m-b-sm">Custom forms</h5>
                <p>
                  Put a custom form on your website and collect leads and responses in Google
                  Sheets.
                </p>
              </div>
            </div>
            <div className="column ">
              <div className="box">
                <div className="">
                  <img src="/static/img/use-mobile.png" alt="Use for mobile" width="50" />
                </div>
                <h5 className="title is-5 m-b-sm">Mobile development</h5>
                <p>Deploy a mobile app without deploying any other backend infrastructure.</p>
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="section container m-b-lg">
          <h5 className="title is-3">How it Works</h5>
          <hr className="m-t-none" style={{ maxWidth: '100px' }} />
          <div className="columns">
            <div className="column">
              <div className="title is-1">1.</div>
              <h5 className="title is-5 m-b-sm">Create a Google Sheet</h5>
              <p>
                Create a Google Sheet which you can use as a database. Every tab within the sheet
                can represent a database table.
              </p>
            </div>
            <div className="column">
              <div className="title is-1">2.</div>
              <h5 className="title is-5 m-b-sm">Connect SheetMetal</h5>
              <p>Login to SheetMetal in just 2 clicks to allow access to your Google Sheets.</p>
            </div>
            <div className="column">
              <div className="title is-1">3.</div>
              <h5 className="title is-5 m-b-sm">Use your Sheet like a database</h5>
              <p>
                SheetMetal gives you full access to update with your spreadsheet via a RESTful API.
              </p>
            </div>
          </div>
        </div>

        {/* TODO. Ship first */}
        {/* <div className="section container">Code Demo</div> */}

        <div className="section container m-b-lg">
          <a name="pricing" id="pricing" />
          <h5 className="title is-3 ">Pricing</h5>
          <hr className="m-t-none" style={{ maxWidth: '100px' }} />
          <div className="columns has-text-centered">
            <div className="column">
              <Link href="/docs/hosting">
                <a className="box">
                  <div className="title is-3">Self hosted</div>
                  <ul>
                    <li>Unlimited API calls</li>
                    <li>Unlimited API keys</li>
                  </ul>
                </a>
              </Link>
            </div>
            <div className="column">
              <a className="box" href={authUrl()}>
                <div className="title is-3">Free</div>
                <ul>
                  <li>One connected Sheet</li>
                  <li>30 API calls per day</li>
                </ul>
              </a>
            </div>
            <div className="column">
              <a className="box">
                <div className="title is-3">$5/month</div>
                <ul>
                  <li>Unlimited connected Sheets</li>
                  <li>Unlimited API calls</li>
                </ul>
              </a>
            </div>
          </div>
        </div>

        <div className="section has-background-dark">
          <div className="container ">
            <div className="columns is-mobile">
              <div
                className="column"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
              >
                <strong className="is-size-4 has-text-white m-r-md">Try SheetMetal for free</strong>
                <a
                  className="button is-medium is-primary has-text-weight-bold is-rounded"
                  href={authUrl()}
                >
                  <span>Go</span>
                  <span className="icon">
                    <i className="fas fa-arrow-right" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Page>
    )
  }
}

export default Home
