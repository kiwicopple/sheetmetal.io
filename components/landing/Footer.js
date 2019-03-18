import Link from 'next/link'

export default class NavBar extends React.PureComponent {
  render() {
    return <footer className="footer">
        <div className="container">
          <div className="columns">
            <div className="column">
              <img src="/static/img/sheet-metal-logo.png" alt="Sheet Metal" style={{ width: '80%' }} />
            </div>
            <div className="column has-text">
              <h5 className="heading">About</h5>
              <p>
                <a href="#">Pricing</a>
              </p>
              <p>
                <a href="https://github.com/kiwicopple/sheetmetal.io">Github</a>
              </p>
              <p>
                <a href="/static/humans.txt">Humans</a>
              </p>
            </div>
            <div className="column">
              <h5 className="heading">Credits</h5>

              <p>
                Various images from <a href="https://icons8.com">Icons8</a>
              </p>
              <p>
              Opensource <a href="https://rsms.me/inter/">Inter</a> font
              </p>
              <p>
                Icons from <a href="#">Font Awesome</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
  }
}
