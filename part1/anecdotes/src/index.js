import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ clickHandler, text }) => (
    <button onClick={clickHandler}>
      {text}
    </button>
)

const DailyAnecdote = (props) => {
  const { anecdotes, votes, selected, setVotes, setSelected } = props

  const handleVoteClick = () => {
    const copy = [...votes]
    copy[selected]++
    setVotes(copy)
  }

  const handleNextClick = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button clickHandler={handleVoteClick} text='vote' />
      <Button clickHandler={handleNextClick} text='next anecdote' />
    </div>
  )
}

const MostVotesAnecdote = ({ anecdotes, votes }) => {
  // returns index of element in votes with max value (returns first if more than 1)
  const getMostVotesIndex = () => {
    let maxIndex = 0
    let maxValue = 0
    votes.forEach((vote, index) => {
      if (vote > maxValue) {
        maxIndex = index
        maxValue = vote
      }
    })
    return maxIndex
  }

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[getMostVotesIndex()]}
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  return (
    <div>
      <DailyAnecdote 
        anecdotes={anecdotes} 
        votes={votes} 
        selected={selected} 
        setVotes={setVotes} 
        setSelected={setSelected} 
      />
      <MostVotesAnecdote 
        anecdotes={anecdotes} 
        votes={votes} 
      />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)