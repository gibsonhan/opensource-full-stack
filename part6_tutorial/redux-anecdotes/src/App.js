import React from 'react';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm';

const App = () => {
  return(
    <div>
      <h1>Anecdote</h1>
      <Notification />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App