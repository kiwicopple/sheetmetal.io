import Page from '~/components/layouts/Docs'
import ApiDocs from '~/components/docs/Api'
import LanguageSelector from '~/components/docs/LanguageSelector'

const DEFAULT_LANGUAGE = 'CURL'

export default class ApiPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedLanguage: DEFAULT_LANGUAGE,
      range: '',
    }
  }
  render() {
    let { selectedLanguage } = this.state
    return (
      <Page id="API Docs" activeLink="API">
        <div>
          <nav className="level">
            <div className="level-left">
              <div className="level-item">
                <h3 className="title is-4">API</h3>
                <hr className="m-t-none is-hidden-tablet" style={{ maxWidth: '100px' }} />
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <LanguageSelector
                  onLanguageUpdated={selectedLanguage => this.setState({ selectedLanguage })}
                  hasMenuRight={true}
                />
              </div>
            </div>
          </nav>

          <ApiDocs language={selectedLanguage} />
        </div>
      </Page>
    )
  }
}
