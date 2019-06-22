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
