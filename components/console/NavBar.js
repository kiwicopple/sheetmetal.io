import Link from 'next/link'

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
          <a className="navbar-item" href="/">
            <h3 className="title is-4">SM</h3>
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
            <Link href="/docs">
              <a className="navbar-item">Documentation</a>
            </Link>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">Account</a>
              <div className="navbar-dropdown is-right">
                <Link href="/app/">
                  <a className="navbar-item">Settings</a>
                </Link>
                <Link href="/app/">
                  <a className="navbar-item">Logout</a>
                </Link>
              </div>
            </div>


          </div>
        </div>
      </nav>
    )
  }
}
