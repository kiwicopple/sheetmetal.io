import Link from 'next/link'
import { profile, authUrl } from '~/lib/Auth'

export default class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMobileActive: false,
      loggedInUser: null,
    }
  }

  async componentDidMount() {
    try {
      let loggedInUser = await profile()
      if (loggedInUser) this.setState({ loggedInUser })
    } catch (error) {
      console.log('componentDidMount: error', error)
    }
  }

  render() {
    let { isMobileActive, loggedInUser } = this.state
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
            <Link href="/#pricing">
              <a className="navbar-item">Pricing</a>
            </Link>
            <Link href="/docs">
              <a className="navbar-item">Documentation</a>
            </Link>

            {!loggedInUser ? (
              <a href={authUrl()}>
                <span className="navbar-item">
                  <span className="button">Log in</span>
                </span>
              </a>
            ) : (
              <Link href="/app/">
                <span className="navbar-item">
                  <span className="button">Console</span>
                </span>
              </Link>
            )}
          </div>
        </div>
      </nav>
    )
  }
}
