import React from 'react'
import { useParams } from 'react-router-dom'
import classes from '../../CSS/ActivityForm/ActivityForm.module.css'

const ActivityForm = () => {
  const onSubmit = (event) => {
    event.preventDefault()
  }

  const { day, month, year } = useParams()

  return (
    <div className={classes.pageContainer}>
      <form onSubmit={onSubmit} className={classes.form}>
        <div className={classes.inputContainer}>
          <label>Distance</label>
          <input type='text' name='Distance' />
        </div>
        <div className={classes.inputContainer}>
          <label>Date</label>
          <input type='text' value={`${day}/${month}/${year}`}/>
        </div>
        <div className={classes.inputContainer}>
          <label>Elapsed Time</label>
          <input type='text' />
        </div>
        <div className={classes.inputContainer}>
          <label>Comments</label>
          <input type='text' />
        </div>
        <div className={classes.inputContainer}>
          <label>Difficulty Rating</label>
          <input type='text' />
        </div>
        <div className={classes.inputContainer}>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default ActivityForm
