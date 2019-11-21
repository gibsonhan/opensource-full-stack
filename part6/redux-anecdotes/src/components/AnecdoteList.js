import React from 'react'
import { connect } from 'react-redux'
import { voteReducer } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Anecodote from './Anecdote'
import Filter from './Filter'

const AnecdoteList = (props) => {

    const vote = (anecdote) => {
        props.voteReducer(anecdote)
        props.setNotification(`you voted for ${anecdote.content}`, 10)
    }

    const display = (anecdotes) => {
        return anecdotes.map(anecdote =>
                <Anecodote
                    key={anecdote.id}
                    content={anecdote.content}
                    votes={anecdote.votes}
                    handleVote={() => {vote(anecdote)}}
                />
            ) 
    }

    return (
        <div>
            <Filter />
            {display(props.ancedoteToShow)}
        </div>
    )
}

const visibleAncedotes = ({anecdotes, filter}) => {
    anecdotes.sort((a, b) => b.votes - a.votes)

    return (filter.length === 0) 
        ? anecdotes
        : anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())) 
}

const mapStateToProps = (state) => {
    return {
        ancedoteToShow: visibleAncedotes(state)
    }
}

const mapDispatchToProps ={
    voteReducer,
    setNotification,
}

// Need to practice the HOF with JS
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AnecdoteList)
