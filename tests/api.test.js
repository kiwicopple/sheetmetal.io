require('dotenv').config()
import axios from 'axios'

const URL = process.env.TESTING_URL
const READ_ALL = `${URL}`
const READ_WITH_LIMIT = `${URL}?limit=2`
const READ_WITH_OFFSET = `${URL}?offset=1`

test('Read data', async () => {
  const { data } = await axios.get(READ_ALL)
  expect(data.length).toBe(5)
})

test('Read data with limit', async () => {
  const { data } = await axios.get(READ_WITH_LIMIT)
  expect(data.length).toBe(2)
})

test('Read data with limit', async () => {
  const { data } = await axios.get(READ_WITH_OFFSET)
  expect(data[0].NAME).toBe('Frank')
})
