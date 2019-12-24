export const loginUser = (user) => {
	return {
		type: 'LOGIN_USER',
		payload: {
			token: user.token,
			username: user.username,
			name: user.name
		}
	}
}

export const logoutUser = () => {
	return ({
		type: 'LOGOUT_USER',
		paylaod: ''
	})
}

const loginReducer = (state = {}, action) => {
	switch(action.type) {
		case 'LOGIN_USER':
			return action.payload;
		case 'LOGOUT_USER':
			return ''
		default:
			return state;
	}
}

export default loginReducer