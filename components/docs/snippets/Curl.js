export const getSheet = key => String.raw`
curl -i \
-H "Accept: application/json" \
-X GET https://sheetmetal.io/api/sheets/${key || 'SHEET_KEY'}
`

export const createRecord = (key, tab, payload) => String.raw`
curl -i \
-H "Accept: application/json" \
-X PUT https://sheetmetal.io/api/sheets/${key || 'SHEET_KEY'}/${tab || 'TAB'}
`

export const retrieveRecords = (key, tab, range) => String.raw`
curl -i \
-H "Accept: application/json" \
-X GET https://sheetmetal.io/api/sheets/${key || 'SHEET_KEY'}/${tab || 'TAB'}/${range || 'RANGE'}
`

export const updateRecord = (key, tab, range, payload) => String.raw`
curl -i \
-H "Accept: application/json" \
-X POST https://sheetmetal.io/api/sheets/${key || 'SHEET_KEY'}/${tab || 'TAB'}/${range || 'RANGE'}
`

export const deleteRecords = (key, tab, range) =>  String.raw`
curl -i \
-H "Accept: application/json" \
-X DELETE https://sheetmetal.io/api/sheets/${key || 'SHEET_KEY'}/${tab || 'TAB'}/${range || 'RANGE'}
`