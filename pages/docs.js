import Page from '~/components/layouts/Docs'
import ApiDocs from '~/components/docs/Api'
import LanguageSelector from '~/components/docs/LanguageSelector'
import * as docs from '~/docs/index.js'

const DEFAULT_LANGUAGE = 'CURL'

// export default class ApiPage extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       selectedLanguage: DEFAULT_LANGUAGE,
//       range: '',
//     }
//   }
//   render() {
//     let { selectedLanguage } = this.state
//     return (
//       <Page id="API Docs" activeLink="API">
//         <div>
//           <nav className="level">
//             <div className="level-left">
//               <div className="level-item">
//                 <h3 className="title is-4">API</h3>
//                 <hr className="m-t-none is-hidden-tablet" style={{ maxWidth: '100px' }} />
//               </div>
//             </div>
//             <div className="level-right">
//               <div className="level-item">
//                 <LanguageSelector
//                   onLanguageUpdated={selectedLanguage => this.setState({ selectedLanguage })}
//                   hasMenuRight={true}
//                 />
//               </div>
//             </div>
//           </nav>

//           <ApiDocs language={selectedLanguage} />
//         </div>
//       </Page>
//     )
//   }
// }

export default ({ url }) => {
  const { query } = url
  console.log('query', query)
  let Doc = query.page ? docs[query.page] : docs.getting_started
  console.log('Doc', Doc)
  return (
    <Page id="Deployment" activeLink="HOSTING">
      <div>
        <h3 className="title is-3">Read</h3>
        <hr className="m-t-none is-hidden-tablet" style={{ maxWidth: '100px' }} />
        <div className="content">
          {/* <MDXDocument /> */}
          <Doc />
        </div>
      </div>
    </Page>
  )
}
