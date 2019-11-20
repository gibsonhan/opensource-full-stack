import React from 'react';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification'

const App = () => {
  return(
    <div>
      <Notification />
      <AnecdoteList />
    </div>
  )
}

export default App