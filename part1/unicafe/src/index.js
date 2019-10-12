import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ clickHandler, text }) => (
  <button onClick={clickHandler}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <table>
      <tbody>
        <Statistic text='good' value={good} />
        <Statistic text='neutral' value={neutral} />
        <Statistic text='bad' value={bad} />
        <Statistic text='all' value={total} />
        <Statistic text='average' value={(good * 1 + bad * -1)/total} />
        <Statistic text='positive' value={good / total * 100} textAfter='%' />
      </tbody>
    </table>
  )
}

const Statistic = ({ text, textAfter, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value} {textAfter}</td>
  </tr>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button clickHandler={() => setGood(good + 1)} text='good'/>
      <Button clickHandler={() => setNeutral(neutral + 1)} text='neutral' />
      <Button clickHandler={() => setBad(bad + 1)} text='bad' />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)