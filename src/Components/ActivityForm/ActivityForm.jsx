import React, { useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { createActivity } from '../../Services/activities'
import classes from '../../CSS/ActivityForm/ActivityForm.module.css'

const ActivityForm = () => {
  const { day, month, year } = useParams()
  const [distance, setDistance] = useState(0)
  const [date, setDate] = useState(`${day}/${month}/${year}`)
  const [elapsedTime, setElapsedTime] = useState('')
  const [comments, setComments] = useState('')
  const [difficultyRating, setDifficultyRating] = useState(0)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const submitHandler = async (event) => {
    event.preventDefault()

    const activity = {
      distance,
      date,
      elapsedTime,
      comments,
      difficultyRating,
      userId: 1
    }

    await createActivity(activity)

    setFormSubmitted(true)
  }

  return (
	  formSubmitted ? <Redirect to='/dashboard' />
      : <div className={classes.pageContainer}>
        <form onSubmit={submitHandler} className={classes.form}>
          <div className={classes.inputContainer}>
            <label>Distance</label>
            <input value={distance} onChange={(e) => setDistance(e.target.value)} type='text' />
          </div>
          <div className={classes.inputContainer}>
            <label>Date</label>
            <input value={date} onChange={(e) => setDate(e.target.value)} type='text' />
          </div>
          <div className={classes.inputContainer}>
            <label>Elapsed Time</label>
            <input value={elapsedTime} onChange={(e) => setElapsedTime(e.target.value)} type='text' />
          </div>
          <div className={classes.inputContainer}>
            <label>Comments</label>
            <input value={comments} onChange={(e) => setComments(e.target.value)} type='text' />
          </div>
          <div className={classes.inputContainer}>
            <label>Difficulty Rating</label>
            <input value={difficultyRating} onChange={(e) => setDifficultyRating(e.target.value)} type='text' />
          </div>
          <div className={classes.inputContainer}>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
  )
}

export default ActivityForm
