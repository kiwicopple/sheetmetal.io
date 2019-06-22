require('dotenv').config()
import axios from 'axios'

const URL = process.env.TESTING_URL
const CREATE_ONE = `${URL}`
const CREATE_MULTIPLE = `${URL}`
const CREATE_NEW_SHEET = `${URL}/sheets/Sheet2`

test.skip('Adds one row to spreadsheet', async () => {
  const payload = { id: '6', name: 'Glenn', score: '69' }
  const { data } = await axios.post(CREATE_ONE, payload)
  expect(data).toEqual(payload)
})

test.skip('Add multiple rows in one request', async () => {
  const payload = {
    rows: [{ id: '7', name: 'Joe', score: '98' }, { id: '8', name: 'Jim', score: '101' }],
  }
  const { data } = await axios.post(CREATE_MULTIPLE, payload)
  expect(data.length).toBe(2)
  expect(data[0].name).toBe('Joe')
  expect(data[1].name).toBe('Jim')
})

test.skip('Adds single row to sheet named "Sheet2"', async () => {
  const payload = { foo: '6', 'another column': 'quux' }
  const { data } = await axios.post(CREATE_NEW_SHEET, payload)
  expect(data).toEqual(payload)
})
