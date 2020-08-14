import axios from 'axios'

export const authenticateUser = async (user) => {
  return await axios.post('http://localhost:5000/login', user)
}
