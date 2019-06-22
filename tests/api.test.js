require('dotenv').config()
import axios from 'axios'

const URL = process.env.TESTING_URL
const READ = URL

test('Basic read data', async () => {
  const { data } = await axios.get(READ)
  expect(data.length).toBe(5)
})
