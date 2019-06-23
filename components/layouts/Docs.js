import '~/assets/css/styles.scss'
import React from 'react'
import Head from 'next/head'
import NavBar from '~/components/landing/NavBar'
import Footer from '~/components/landing/Footer'
import ActiveLink from '~/components/common/ActiveLink'
import Link from 'next/link'

export default ({ id, children, classNames, title, activeLink }) => (
  <React.Fragment>
    <Head>
      <title>{title || 'SheetMetal'}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      {/* Favicon */}
      <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
    <div id="main-layout">
      <NavBar />
      <div id={id} className={classNames || ''}>
        <div className="section container">
          <h1 className="title is-2">Documentation</h1>
          <hr className="m-t-none" style={{ maxWidth: '100px' }} />

          <div className="columns">
            <div className="column is-3">
              <aside className="menu">
                <p className="menu-label is-hidden-tablet">Menu</p>
                <ul className="menu-list">
                  <ActiveLink href="/docs">Getting started</ActiveLink>
                  <ActiveLink href="/docs?page=read">Read</ActiveLink>
                  <ActiveLink href="/docs?page=create">Create</ActiveLink>
                  <ActiveLink href="/docs?page=update">Update</ActiveLink>
                  <ActiveLink href="/docs?page=del">Delete</ActiveLink>
                  <ActiveLink href="/docs?page=hosting">Self Hosting</ActiveLink>
                  <ActiveLink href="/docs?page=faq">FAQ</ActiveLink>
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
