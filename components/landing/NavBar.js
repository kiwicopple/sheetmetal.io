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
    return <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src="/static/img/sheet-metal-logo.png" alt="Sheet Metal"  />
          </a>
          <a onClick={() => this.setState({
                isMobileActive: !isMobileActive,
              })} role="button" className="navbar-burger" data-target="navMenu" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div className={`navbar-menu ${isMobileActive ? 'is-active' : ''}`}>
          <div className="navbar-start" />
          <div className="navbar-end p-r-sm">
            <Link href="/#pricing">
              <a className="navbar-item">Pricing</a>
            </Link>
            <Link href="/docs">
              <a className="navbar-item">Documentation</a>
            </Link>

            {!loggedInUser ? <a href={authUrl()} className="navbar-item">
                Log in
              </a> : <Link href="/app/console" className="navbar-item">
                Console
              </Link>}
          </div>
        </div>
      </nav>
  }
}
