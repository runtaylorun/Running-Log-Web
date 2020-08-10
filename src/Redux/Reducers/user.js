import { SET_USER } from '../Actions/actionTypes';

const initialState = {
	authenticated: false,
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER:
			return { ...action.payload };
		default:
			return state;
	}
};

export default userReducer;
