import { SET_USER, SET_AUTHENTICATION } from './actionTypes'

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  }
}

export const setAuthentication = (isAuthenticated) => {
  return {
    type: SET_AUTHENTICATION,
    payload: isAuthenticated
  }
}
