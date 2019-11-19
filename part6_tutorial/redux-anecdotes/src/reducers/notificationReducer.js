export const messageReducer = (message) => {
    return({
        type: 'DISPLAY_MESSAGE',
        data: message
    })
}

const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'DISPLAY_MESSAGE':
            return action.data 
        default:
            return state
    }
}

export default notificationReducer