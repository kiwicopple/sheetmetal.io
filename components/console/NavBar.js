import Link from 'next/link'

import Router from 'next/router'
import Cookies from 'js-cookie'

const logout = () => {
  try {
    Cookies.remove('accessToken')
    Router.push('/')
  } catch (error) {
    console.log('error', error)
  }
  //   .catch(e => console.log(e)) // you would show/hide error messages with component state here
}

export default class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMobileActive: false,
    }
  }

  render() {
    let { isMobileActive } = this.state
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/app/map">
            <h3 className="title is-4">HQ</h3>
            {/* <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" /> */}
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
          <div className="navbar-end">
            <Link href="/app/map">
              <a className="navbar-item">Map</a>
            </Link>
            <Link href="/app/fleet">
              <a className="navbar-item">Fleet</a>
            </Link>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">Accounts</a>
              <div className="navbar-dropdown">
                {/* <p className="heading is-size-7 dropdown-item has-text-grey m-b-none">Accounts</p> */}
                <Link href="/app/accounts/list">
                  <a className="navbar-item">Accounts</a>
                </Link>
                <Link href="/app/accounts/locations">
                  <a className="navbar-item">Locations</a>
                </Link>
              </div>
            </div>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">Crew</a>
              <div className="navbar-dropdown">
                {/* <p className="heading is-size-7 dropdown-item has-text-grey m-b-none">Accounts</p> */}
                <Link href="/app/crew/employees">
                  <a className="navbar-item">Employees</a>
                </Link>
                <Link href="/app/crew/timesheets">
                  <a className="navbar-item">Timesheets</a>
                </Link>
              </div>
            </div>

            <Link href="/app/chat">
              <a className="navbar-item">Chat</a>
            </Link>

            <Link href="/app/users">
              <a className="navbar-item">Users</a>
            </Link>

            <div className="navbar-item">
              <div className="buttons">
                <a className="button" onClick={() => logout()}>
                  <strong>Log out</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
