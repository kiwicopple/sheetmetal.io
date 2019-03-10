import Link from 'next/link'

export default class NavBar extends React.PureComponent {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="columns">
            <div className="column">Brand</div>
            <div className="column has-text">
              <h5 className="heading">About</h5>
              <p>Links</p>
            </div>
            <div className="column">
              <h5 className="heading">Credits</h5>

              <p>
                Various images from <a href="https://icons8.com/ouch/style/eastwood-1">Icons8</a>
              </p>
              <p>
                Icons from <a href="#">Font awesome</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}
