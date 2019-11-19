import React from 'react'
import { voteReducer } from '../reducers/anecdoteReducer'
import { messageReducer, resetMessage } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const anecdotes = props.store.getState().anecdotes
    anecdotes.sort((a, b) => b.votes - a.votes)
    
    const vote = (id, anecdote) => {
        props.store.dispatch(voteReducer(id))
        props.store.dispatch(messageReducer(anecdote))
        setTimeout(() => {
            props.store.dispatch(messageReducer(''))
        }, 5000)
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList