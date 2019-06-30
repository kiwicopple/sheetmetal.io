require('dotenv').config()
import axios from 'axios'

// Set test timeout to 30 seconds
jest.setTimeout(30000)

// Common
const URL = process.env.TESTING_URL
const HTTP_SUCCESS = 200
const HTTP_CREATED = 201
const HTTP_NO_CONTENT = 204

/**
 * ---------------------------------------------------------
 * READ DATA
 * ---------------------------------------------------------
 */
const READ_ALL = `${URL}/sheets/Employees`
const READ_WITH_LIMIT = `${URL}/sheets/Employees?limit=2`
const READ_WITH_OFFSET = `${URL}/sheets/Employees?offset=1`

test('Read data', async () => {
  const { data, status } = await axios.get(READ_ALL)
  expect(status).toEqual(HTTP_SUCCESS)
  expect(data.length).toBe(6)
})

test('Read data with limit', async () => {
  const { data, status } = await axios.get(READ_WITH_LIMIT)
  expect(status).toEqual(HTTP_SUCCESS)
  expect(data.length).toBe(2)
})

test('Read data with offset', async () => {
  const { data, status } = await axios.get(READ_WITH_OFFSET)
  expect(status).toEqual(HTTP_SUCCESS)
  expect(data[0].name).toBe('Richard Hendricks')
})

/**
 * ---------------------------------------------------------
 * CREATE DATA
 * ---------------------------------------------------------
 */

const CREATE_ONE = `${URL}/sheets/Sheet2`
const CREATE_MULTIPLE = `${URL}/sheets/Sheet2`

test('Adds one row to spreadsheet', async () => {
  const payload = { id: '6', name: 'Glenn', score: '69' }
  const { data, status } = await axios.post(CREATE_ONE, payload)
  expect(status).toEqual(HTTP_CREATED)
  expect(data).toEqual(payload)
})

test('Add multiple rows in one request', async () => {
  const payload = {
    rows: [{ id: '7', name: 'Joe', score: '98' }, { id: '8', name: 'Jim', score: '101' }],
  }
  const { data, status } = await axios.post(CREATE_MULTIPLE, payload)
  expect(status).toEqual(HTTP_CREATED)
  expect(data.length).toBe(2)
  expect(data[0].name).toBe('Joe')
  expect(data[1].name).toBe('Jim')
})

/**
 * ---------------------------------------------------------
 * DELETE DATA
 * ---------------------------------------------------------
 */
const CLEAR_ROW = `${URL}/sheets/Sheet2/name/Glenn`

test('Clear all rows where name is Glenn', async () => {
  try {
    const { data, status } = await axios.delete(CLEAR_ROW)
    expect(status).toEqual(HTTP_NO_CONTENT)
  } catch (error) {
    console.log('error', error)
  }
})
