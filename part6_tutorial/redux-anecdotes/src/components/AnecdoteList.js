import React from 'react'
import { connect } from 'react-redux'
import { voteReducer } from '../reducers/anecdoteReducer'
import { messageReducer } from '../reducers/notificationReducer'
import Filter from './Filter'
import AnecdoteForm from './AnecdoteForm'

const AnecdoteList = (props) => {
    const anecdotes = props.anecdotes
    anecdotes.sort((a, b) => b.votes - a.votes)
    
    const vote = (id, anecdote) => {
        props.voteReducer(id)
        props.messageReducer(anecdote)
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
        return (props.filter === 0)
            ? create(anecdotes)
            : filtering(anecdotes)
    }

    const filtering = (array) => {
       const newFilter = props.filter
       const filtered = array.filter(anecdotes => 
            anecdotes.content.toLowerCase().includes(newFilter.toLowerCase())
        )
       return create(filtered) 
    }
    return (
        <div>
            <h2>Anecdotes</h2>
            <Filter />
            <AnecdoteForm />
            {display(anecdotes)}
        </div>
    )
}

/**
 * Components needs list of ancedotes and value of the filter and notification from redux store 
 *  connect accepts a so called mapStateTo Prop function as first paramer
 *  -> used for defining the props of the connected compnents that are based on the state of the redux
 */

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter,
    }
}

const mapDispatchToProps ={
    voteReducer,
    messageReducer
}

// Need to practice the HOF with JS
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AnecdoteList)
