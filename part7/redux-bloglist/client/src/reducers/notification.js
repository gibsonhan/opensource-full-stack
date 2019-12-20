export const clearMessage = () => {
	return async dispatch => {
		await setTimeout(() => {
			dispatch({
				type: 'CLEAR_MESSAGE'
			})
		}, 5000)
	}
}

export const sendMessage = (message, color) => {
	return ({
		type: 'CREATE_MESSAGE',
			payload: {
				message,
				color
			}
	})
}

const messageReducer = (state = '', action) => {
	console.log(action.type)
	switch(action.type) {
		case 'CREATE_MESSAGE':
			return action.payload 
		case 'CLEAR_MESSAGE':
			return '';
		default:
			return state
 }
}

export default messageReducer;