import { client } from './client'

export const getCountries = async () => {
  const res = await client.query(`SELECT * FROM countries`)
  return res.rows
}
