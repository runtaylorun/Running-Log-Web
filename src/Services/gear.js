import axios from 'axios'

export const getGear = async () => {
  const result = await axios.get('http://localhost:5000/gear', { withCredentials: true })

  return result
}

export const createGear = async (gear) => {
  await axios.post('http://localhost:5000/gear', { gear }, { withCredentials: true })
}
