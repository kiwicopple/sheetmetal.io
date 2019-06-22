require('dotenv').config()
import axios from 'axios'

const URL = process.env.TESTING_URL
const READ_ALL = `${URL}`
const READ_WITH_LIMIT = `${URL}?limit=2`
const READ_WITH_OFFSET = `${URL}?offset=1`

test.skip('Read data', async () => {
  const { data } = await axios.get(READ_ALL)
  expect(data.length).toBe(6)
})

test.skip('Read data with limit', async () => {
  const { data } = await axios.get(READ_WITH_LIMIT)
  expect(data.length).toBe(2)
})

test.skip('Read data with offset', async () => {
  const { data } = await axios.get(READ_WITH_OFFSET)
  expect(data[0].name).toBe('Frank')
})
