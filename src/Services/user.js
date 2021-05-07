import axios from 'axios'

export const getUserDetails = async () => {
  return await axios.get('http://localhost:5000/users/userDetails', { withCredentials: true })
}

export const updateUserDetail = async (changes) => {
  return await axios.patch('http://localhost:5000/users/userDetails', {changes}, { withCredentials: true })
}
