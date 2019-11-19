import React from 'react'
import { voteReducer } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
    const anecdotes = props.store.getState().anecdotes
    anecdotes.sort((a, b) => b.votes - a.votes)
    
    const vote = (id) => {
        props.store.dispatch(voteReducer(id))
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
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList