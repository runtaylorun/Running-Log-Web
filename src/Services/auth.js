import axios from 'axios'

export const authenticateUser = async (user) => {
  return await axios.post('http://localhost:5000/login', user)
}

export const signOut = async () => {
  return await axios.get('http://localhost:5000/logout')
}
