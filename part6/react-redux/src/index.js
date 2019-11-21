import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

//reducer
const counterReducer = (state = 0, action) => {
    switch(action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT': 
            return state -1
        case 'ZERO':
            return 0
        default: //if action typ not valid return state
            return state
    }
}

const store = createStore(counterReducer)
console.log(store.getState())
store.dispatch({type: 'INCREMENT'})
store.dispatch({type: 'INCREMENT'})
store.dispatch({type: 'INCREMENT'})
console.log(store.getState())
store.dispatch({type: 'ZERO'})
store.dispatch({type: 'DECREMENT'})
console.log(store.getState())


const App = () => {
    return (
        <div>
            <h1>Hello</h1>
        </div>
    )
}
/**
 *  Action -> are object -> contain atleast one type of action
 *         -> if data is involved  more field
 * 
 *  Reducer -> impact/outcome of action -> fcn -> returns the curr state as param
 *          -> returns a new state
 *          -> never call reducer directly from app code
 *          -> only given as param to createSotre function
 * 
 * Stores -> use reducers to handle action,
 *        -> dispatch method :: which are dispatch/sent to store w/ dispath method
 *        -> getState method :: finding the state of the store with
 *        -> subsribe method :: reacll fcn used by store -> when state is changed
 * {
 *      type: 'INCREMENT'
 *  }
 */
const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)


