import Link from 'next/link'
import Router from 'next/router'
import { logout } from '~/lib/Auth'

export default class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMobileActive: false,
    }
    this.logoutAndRedirect = this.logoutAndRedirect.bind(this)
  }

  logoutAndRedirect() {
    logout()
    Router.push('/')
  }

  render() {
    let { isMobileActive } = this.state
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src="/img/sheet-metal-logo.png" alt="Sheet Metal" />
          </a>
          <a
            onClick={() => this.setState({ isMobileActive: !isMobileActive })}
            role="button"
            className="navbar-burger"
            data-target="navMenu"
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div className={`navbar-menu ${isMobileActive ? 'is-active' : ''}`}>
          <div className="navbar-start" />
          <div className="navbar-end p-r-sm">
            <Link href="https://sheetmetal.io/docs">
              <a className="navbar-item">Docs</a>
            </Link>

            <a className="navbar-item" onClick={() => this.logoutAndRedirect()}>
              Logout
            </a>
          </div>
        </div>
      </nav>
    )
  }
}
