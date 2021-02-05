import axios from 'axios'

export const authenticateUser = async (user) => {
  return await axios.post('http://localhost:5000/login', user, { withCredentials: true })
}

export const sendPasswordResetEmail = async (email) => {
  return await axios.post('http://localhost:5000/reset', { email })
}

export const resetPassword = async (token, password) => {
  return await axios.post(`http://localhost:5000/reset/${token}`, { password })
}

export const checkResetToken = async (token) => {
  return await axios.get(`http://localhost:5000/reset/${token}`)
}

export const createUser = async (user) => {
  return await axios.post('http://localhost:5000/sign-up', user)
}

export const checkAuthentication = async () => {
  return await axios.get('http://localhost:5000/auth', { withCredentials: true })
}

export const signOut = async () => {
  return await axios.get('http://localhost:5000/logout', { withCredentials: true })
}
