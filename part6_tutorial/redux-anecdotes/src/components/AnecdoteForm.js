import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdote'

const AnecdoteForm = (props) => {
    const create = async (e) => {
        e.preventDefault()
        const object = e.target.anecdote.value
        e.target.anecdote.value = ' '
        const newAnecdote = await anecdoteService.create(object)
        props.setNotification(newAnecdote.content + 'was created', 10)
        props.createAnecdote(newAnecdote)
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
    setNotification,
    createAnecdote,
}

export default connect(
    null,
    mapDispatchToProps,
)(AnecdoteForm)