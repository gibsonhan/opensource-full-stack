import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import anecdoteService from './services/anecdote'

import { initialAnecdotes } from './reducers/anecdoteReducer'

const App = (props) => {
  useEffect(() => {
    anecdoteService
      .getAll()
      .then(anecdotes => props.initialAnecdotes(anecdotes)) 
  }, [props]) // unsure why this solve the prop dependency issue

  return(
    <div>
      <h1>Anecdote</h1>
      <Notification />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}
  

export default connect (
  null,
  {initialAnecdotes})(App)