import Link from 'next/link'

export default class NavBar extends React.PureComponent {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="columns">
            <div className="column">
              <img
                src="/static/img/sheet-metal-logo.png"
                alt="Sheet Metal"
                style={{ width: '80%' }}
              />
            </div>
            <div className="column">
              <h5 className="heading">About</h5>
              <p>
                <a href="/#pricing">Pricing</a>
              </p>
              <p>
                <a href="/docs">Documentation</a>
              </p>
              <p>
                <a href="https://github.com/kiwicopple/sheetmetal.io">Github</a>
              </p>
            </div>
            <div className="column">
              <h5 className="heading">Info</h5>
              <p>
                <a href="/static/humans.txt">Humans</a>
              </p>
              <p>
                <a href="/static/privacy.txt">Privacy Policy</a>
              </p>
              <p>
                <a href="/static/tos.txt">Terms of Service</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}
