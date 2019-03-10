import '~/assets/css/styles.scss'
import React from 'react'
import Head from 'next/head'
import NavBar from '~/components/landing/NavBar'
import Footer from '~/components/landing/Footer'

export default ({ id, children, classNames, title }) => (
  <React.Fragment>
    <Head>
      <title>{title || 'SheetMetal'}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
    <div id="main-layout">
      <NavBar />
      <div id={id} className={classNames || ''}>
        {children}
      </div>
    </div>
    <Footer />
  </React.Fragment>
)
