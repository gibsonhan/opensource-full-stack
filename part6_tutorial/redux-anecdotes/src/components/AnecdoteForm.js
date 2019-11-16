import React from 'react'
import { createReducer } from '../reducers/anecdoteReducer'
const AnecdoteForm = (props) => {

    const create = (e) => {
        e.preventDefault()
        const newAnecdote = e.target.anecdote.value
        props.store.dispatch(createReducer(newAnecdote))
        e.target.anecdote.value = ''
    }

    return (
        <div>
            <div>Create New</div>
            <form onSubmit={create}>
                <div><input name="anecdote" /></div>
                <button type="submite">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm