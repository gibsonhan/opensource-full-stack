import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'

import { initialAnecdotes } from './reducers/anecdoteReducer'

const App = (props) => {
  useEffect(() => {
    props.initialAnecdotes()
  }, [props]) 

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