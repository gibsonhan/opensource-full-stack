import React from 'react'
import { connect } from 'react-redux'
import { createReducer } from '../reducers/anecdoteReducer'
import { messageReducer } from '../reducers/notificationReducer'
const AnecdoteForm = (props) => {
    const create = (e) => {
        e.preventDefault()
        const newAnecdote = e.target.anecdote.value
        props.messageReducer(newAnecdote)
        props.createReducer(newAnecdote)
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

const mapDispatchToProps = {
    messageReducer,
    createReducer
}

export default connect(
    null,
    mapDispatchToProps,
)(AnecdoteForm)