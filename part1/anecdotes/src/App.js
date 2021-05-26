import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])

  const [selected, setSelected] = useState(0)
  const [max, setMax] = useState(0)
  const [maxIndex, setMaxIndex] = useState(0)

  const getNewAnecdote = () => {
    const sel = Math.floor(Math.random() * 6)
    setSelected(sel)
  }

  const vote = () => {
    const newVotes = { ...votes }
    newVotes[selected] += 1
    if(newVotes[selected] > max) {
      const newMax = newVotes[selected]
      const newMaxIndex = selected
      setMax(newMax)
      setMaxIndex(newMaxIndex)
    }
    setVotes(newVotes)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br/>
      has {votes[selected]} votes
      <br/>
      <button onClick={vote}>vote</button>
      <button onClick={getNewAnecdote}>next anecdote</button>
      <h1>Anecdote with the most votes</h1>
      {anecdotes[maxIndex]}
      <br/>
      has {votes[maxIndex]} votes
      <br/>
    </div>
  )
}

export default App
