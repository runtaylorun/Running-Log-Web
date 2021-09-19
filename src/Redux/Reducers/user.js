import { SET_USER, SET_AUTHENTICATION, SET_MEASUREMENT_SYSTEM } from '../Actions/actionTypes'

const initialState = {
	authenticated: false,
	measurementSystem: 'Metric'
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
	case SET_MEASUREMENT_SYSTEM:
		return {
			...state,
			measurementSystem: action.payload
		}
	default:
		return state
	}
}

export default userReducer
