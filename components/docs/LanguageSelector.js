const DEFAULT_LANGUAGE = 'CURL'

export default function LanguageSelector({
  onLanguageUpdated = () => {},
  selectedLanguage = DEFAULT_LANGUAGE,
  hasMenuRight = false,
}) {
  return (
    <div className={`dropdown is-hoverable ${hasMenuRight && 'is-right'}`}>
      <div className="dropdown-trigger">
        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
          <span>{selectedLanguage}</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" />
          </span>
        </button>
      </div>
      <div className="dropdown-menu">
        <div className="dropdown-content ">
          <a className="dropdown-item" onClick={() => onLanguageUpdated('CURL')}>
            CURL
          </a>
          <hr className="dropdown-divider" />
          <a className="dropdown-item" onClick={() => onLanguageUpdated('Javascript')}>
            Javascript
          </a>
        </div>
      </div>
    </div>
  )
}
