/* eslint-disable no-undef */
import { getAPIData } from "../index.js";
import { simpleFetch } from "lib/simpleFetch";

const GET_USERS_URL = 'http://127.0.0.1:1337/api/read/users';

describe('Get users from API using getAPIData', () => {
  it('should get an array of users', async () => {
    const data = await getAPIData(GET_USERS_URL)
    console.log('data de getAPIData', typeof data, data)
    expect(data).not.toBeNull()
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)
  })
})

describe('Get users from API using simpleFetch', () => {
  it('should get an array of users', async () => {
    const data = await simpleFetch(GET_USERS_URL, { method: 'GET' })
    console.log('data de getAPIData', typeof data, data)
    expect(data).not.toBeNull()
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)
  })
})