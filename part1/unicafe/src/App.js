import React, { useState } from 'react'

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  if(all > 0) {
    return(
      <table>
        <tbody>
          <Statistic text="good" value = {props.good}/>
          <Statistic text="neutral" value = {props.neutral} />
          <Statistic text="bad" value = {props.bad} />
          <Statistic text="all" value = {all} />
          <Statistic text="average" value = {(props.good - props.bad) / all} />
          <Statistic text="positive" value = {100 * props.good / all} percent = {"%"}/>
        </tbody>
      </table>
    )
  }
  else {
    return(<p>No feedback given</p>)
  }
}

const Statistic = (props) => (
    <tr>
      <td>{props.text}</td>
      <td>{props.value} {props.percent}</td>
    </tr>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => {
    const newGood = good + 1
    setGood(newGood)
  }
  const handleClickNeutral = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
  }
  const handleClickBad = () => {
     const newBad = bad + 1
     setBad(newBad)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleClickGood} text = "good" />
      <Button handleClick={handleClickNeutral} text = "neutral" />
      <Button handleClick={handleClickBad} text = "bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
