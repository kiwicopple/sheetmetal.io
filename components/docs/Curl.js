
const wrapCode = codeString => (
  <div className="code-snippet">
    <pre >
      <button className="button is-dark">Copy</button>
      <code>
        {codeString}
      </code>
    </pre>
  </div>
)

export const getRecords = props => {
  return wrapCode(String.raw`
curl -i \
-H "Accept: application/json" \
-H "metal-user: ${props.userId || 'METAL_USER_ID'}" \
-H "metal-key: ${props.key || 'METAL_KEY'}" \
-X GET https://sheetmetal.io/api/sheets/
  `)
}
