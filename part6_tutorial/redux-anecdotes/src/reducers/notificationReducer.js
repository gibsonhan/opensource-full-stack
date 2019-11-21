export const messageReducer = (message) => {
    return({
        type: 'DISPLAY_MESSAGE',
        data: message
    })
}

export const clearNotification = () => {
    return ({
        type: 'CLEAR_MESSAGE'
    })
}
export const setNotification = (message, time) => {
    return async dispatch => {
        await setTimeout(() => {
           clearNotification() // this is intersting because you can call a reducer with a reducer?
        }, time*1000);

        dispatch ({
            type: 'DISPLAY_MESSAGE',
            data: message
        })
   }
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