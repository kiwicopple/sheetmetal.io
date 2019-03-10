import '~/assets/css/styles.scss'
import React from 'react'
import Head from 'next/head'
import NavBar from '~/components/NavBar'

import { Provider } from 'mobx-react'

import RootStore from '~/store'
import { ToastContainer } from 'react-toastify'

export default ({ id, children, classNames, title }) => (
  <Provider store={RootStore}>
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
  </Provider>
)
