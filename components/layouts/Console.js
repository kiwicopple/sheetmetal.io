import '~/assets/css/styles.scss'
import React from 'react'
import Head from 'next/head'
import NavBar from '~/components/console/NavBar'
import Footer from '~/components/landing/Footer'
import { ToastContainer } from 'react-toastify'

export default ({ id, children, classNames, title }) => (
  <React.Fragment>
    <Head>
      <title>{title || 'SheetMetal'}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="stylesheet" href="/static/css/ReactToastify.min.css" />
    </Head>
    <div id="main-layout">
      <NavBar />
      <ToastContainer />
      <div id={id} className={classNames || ''}>
        {children}
        <div id="modal" />
      </div>
    </div>
  </React.Fragment>
)
