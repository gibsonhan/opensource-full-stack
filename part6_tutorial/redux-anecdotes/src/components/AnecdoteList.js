import React from 'react'
import { voteReducer } from '../reducers/anecdoteReducer'
import { messageReducer } from '../reducers/notificationReducer'
import Filter from './Filter'
import AnecdoteForm from './AnecdoteForm'

const AnecdoteList = (props) => {
    const anecdotes = props.store.getState().anecdotes
    anecdotes.sort((a, b) => b.votes - a.votes)
    
    const vote = (id, anecdote) => {
        props.store.dispatch(voteReducer(id))
        props.store.dispatch(messageReducer(anecdote))
    }

    const create = (array) => {
        return array.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            ) 
    }

    const display = (anecdotes) => {
        return (props.store.getState().filters.length === 0)
            ? create(anecdotes)
            : filtering(anecdotes)
    }

    const filtering = (array) => {
       const filter = props.store.getState().filters
       const filtered = array.filter(anecdotes => anecdotes.content.toLowerCase().includes(filter.toLowerCase()))
       return create(filtered) 
    }
    return (
        <div>
            <h2>Anecdotes</h2>
            <Filter store={props.store} />
            <AnecdoteForm store={props.store} />
            {display(anecdotes)}
        </div>
    )
}

export default AnecdoteList