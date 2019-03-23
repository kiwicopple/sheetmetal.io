import '~/assets/css/styles.scss'
import React from 'react'
import Head from 'next/head'
import NavBar from '~/components/landing/NavBar'
import Footer from '~/components/landing/Footer'
import Link from 'next/link'

export default ({ id, children, classNames, title, activeLink }) => (
  <React.Fragment>
    <Head>
      <title>{title || 'SheetMetal'}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
    <div id="main-layout">
      <NavBar />
      <div id={id} className={classNames || ''}>
        <div className="section container">
          <h1 className="title is-3">Documentation</h1>
          <hr className="m-t-none" style={{ maxWidth: '100px' }} />

          <div className="columns">
            <div className="column is-3">
              <aside className="menu">
                <p className="menu-label is-hidden-tablet">Menu</p>
                <ul className="menu-list">
                  <li>
                    <Link href="/docs/">
                      <a className={`${activeLink === 'API' && 'is-active'}`}>API</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/deployment">
                      <a className={`${activeLink === 'DEPLOYMENT' && 'is-active'}`}>Deployment</a>
                    </Link>
                  </li>
                </ul>
              </aside>
            </div>
            <div className="column">{children}</div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </React.Fragment>
)
