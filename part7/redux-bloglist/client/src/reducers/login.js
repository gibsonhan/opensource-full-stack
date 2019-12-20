export const loginUser = (user) => {
	console.log('login dispatch', user)
	return {
		type: 'LOGIN_USER',
		payload: user
	}
}

export const logoutUser = () => {
	return ({
		type: 'LOGOUT_USER',
		paylaod: ''
	})
}

const loginReducer = (state = {}, action) => {
	console.log('reducer', action.type)
	switch(action.type) {
		case 'LOGIN_USER':
			console.log(action.payload)
			return action.payload;
		case 'LOGOUT_USER':
			console.log(state)
			return ''
		default:
			return state;
	}
}

export default loginReducer