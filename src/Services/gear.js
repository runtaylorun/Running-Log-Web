import axios from 'axios'

export const getUserGear = async (userId) => {
  const result = await axios.get(`http://localhost:5000/gear/${userId}`)

  return result
}
