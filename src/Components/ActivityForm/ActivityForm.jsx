import React, { useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { createActivity, getActivityByActivityId, updateActivity } from '../../Services/activities'
import classes from '../../CSS/ActivityForm/ActivityForm.module.css'

const ActivityForm = () => {
  const { day, month, year, activityId } = useParams()
  const [distance, setDistance] = useState(0)
  const [activityTitle, setActivityTitle] = useState('')

  const [date, setDate] = useState('')
  const [elapsedTime, setElapsedTime] = useState('')
  const [comments, setComments] = useState('')
  const [difficultyRating, setDifficultyRating] = useState(0)
  const [distanceUnit, setDistanceUnit] = useState('Mi')
  const [type, setType] = useState(1)
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    const getActivity = async () => {
      try {
        const response = await getActivityByActivityId(sessionStorage.getItem('id'), activityId)

        if (response) {
          setDistance(response.data[0].distance)
          setActivityTitle(response.data[0].activityTitle)
          setDate(response.data[0].date)
          setElapsedTime(response.data[0].elapsedTime)
          setComments(response.data[0].comments)
          setDifficultyRating(response.data[0].difficultyRating)
          setDistanceUnit(response.data[0].distanceUnit)
          setType(response.data[0].type)
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (activityId) {
      getActivity()
    } else {
      setDate(`${year}-${month}-${day}`)
    }
  }, [])

  const submitHandler = async (event) => {
    event.preventDefault()

    const activity = {
      activityTitle,
      type,
      distanceUnit,
      distance: parseInt(distance, 10),
      date,
      elapsedTime,
      comments,
      difficultyRating: parseInt(difficultyRating, 10),
      userId: sessionStorage.getItem('id')
    }

    if (activityId) {
      activity.activityId = activityId
      await updateActivity(activity)
    } else {
      await createActivity(activity)
    }

    setFormSubmitted(true)
  }

  return (
	  formSubmitted ? <Redirect to='/calendar' />
      : <div className={classes.pageContainer}>
        <form onSubmit={submitHandler} className={classes.form}>
          <div className={classes.inputContainer}>
            <label>Activity Title</label>
            <input value={activityTitle} onChange={(e) => setActivityTitle(e.target.value)} type='text' />
          </div>
          <div className={classes.inputContainer}>
            <label>Type</label>
            <select onChange={(e) => setType(e.target.value)} value={type}>
              <option value='1'>Running</option>
              <option value='2'>Walking</option>
              <option value='3'>Biking</option>
              <option value='4'>Swimming</option>
            </select>
          </div>
          <div className={classes.inputContainer}>
            <label>Distance</label>
            <input value={distance} onChange={(e) => setDistance(e.target.value)} type='text' />
          </div>
          <div className={classes.inputContainer}>
            <label>Distance Unit</label>
            <select onChange={(e) => setDistanceUnit(e.target.value)} value={distanceUnit}>
              <option value='Mi'>Mi</option>
              <option value='Km'>Km</option>
            </select>
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
