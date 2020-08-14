import { SET_USER } from '../Actions/actionTypes'

const initialState = {
  authenticated: false,
  userId: 0
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...action.payload }
    default:
      return state
  }
}

export default userReducer
