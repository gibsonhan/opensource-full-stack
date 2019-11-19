
const initalState = ['Hello World']

const notificationReducer = (state = initalState, action) => {
    switch (action.type) {
        case 'MESSAGE':
            console.log(state)
        default:
            return state
    }
}

export default notificationReducer