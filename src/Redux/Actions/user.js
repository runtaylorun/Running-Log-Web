import { SET_USER, SET_AUTHENTICATION, SET_MEASUREMENT_SYSTEM } from './actionTypes'

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

export const setMeasurementSystem = (measurementSystem) => {
  return {
    type: SET_MEASUREMENT_SYSTEM,
    payload: measurementSystem
  }
}
