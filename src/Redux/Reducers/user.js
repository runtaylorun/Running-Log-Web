import { SET_USER, SET_AUTHENTICATION } from '../Actions/actionTypes'

const initialState = {
  authenticated: false
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...action.payload }
    case SET_AUTHENTICATION:
      return {
        ...state,
        authenticated: action.payload
      }
    default:
      return state
  }
}

export default userReducer
