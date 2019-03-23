const BASE_URL = 'https://sheetmetal.io/api/v1/sheets'

export const getSheet = key => String.raw`
curl -i \
-H "Accept: application/json" \
-X GET ${BASE_URL}/${key || 'METAL_KEY'}
`

export const createRecord = (key, tab, payload) => String.raw`
curl -i \
-H "Accept: application/json" \
-X PUT ${BASE_URL}/${key || 'METAL_KEY'}/${tab || 'TAB'}
`

export const retrieveRecords = (key, tab, range) => String.raw`
curl -i \
-H "Accept: application/json" \
-X GET ${BASE_URL}/${key || 'METAL_KEY'}/${tab || 'TAB'}/${range || 'RANGE'}
`

export const updateRecord = (key, tab, range, payload) => String.raw`
curl -i \
-H "Accept: application/json" \
-X POST ${BASE_URL}/${key || 'METAL_KEY'}/${tab || 'TAB'}/${range || 'RANGE'}
`

export const deleteRecords = (key, tab, range) =>  String.raw`
curl -i \
-H "Accept: application/json" \
-X DELETE ${BASE_URL}/${key || 'METAL_KEY'}/${tab || 'TAB'}/${range || 'RANGE'}
`