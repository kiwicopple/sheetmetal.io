require('dotenv').config()
import axios from 'axios'

const URL = process.env.TESTING_URL
const CLEAR_ROW = `${URL}/name/Glenn`

jest.setTimeout(30000)

test('Clear all rows where name is Glenn', async () => {
  try {
    const { data } = await axios.delete(CLEAR_ROW)
    console.log('DELETE: data', data)
    expect(data).toEqual(payload)
  } catch (error) {
    console.log('error', error)
  }
})
