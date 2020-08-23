import React, { useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
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
          setType(response.data[0].activityCode)
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
        <div className={classes.pageHeader}>
          <h1>Manual Entry</h1>

        </div>
        <form onSubmit={submitHandler} className={classes.form}>
          <div className={classes.formRow1}>
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
          </div>
          <div className={classes.formRow2}>
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
          </div>
          <div className={classes.formRow3}>
            <div className={classes.inputContainer}>
              <label>Date</label>
              <input value={date} onChange={(e) => setDate(e.target.value)} type='text' />
            </div>
            <div className={classes.inputContainer}>
              <label>Elapsed Time</label>
              <input value={elapsedTime} onChange={(e) => setElapsedTime(e.target.value)} type='text' />
            </div>
          </div>
          <div className={classes.formRow4}>
            <div className={classes.inputContainer}>
              <label>Pace per Mi</label>
              <input></input>
              <label>Pace per Km</label>
              <input></input>
            </div>
            <div className={classes.inputContainer}>
              <label>Difficulty Rating</label>
              <select value={difficultyRating} onChange={(e) => setDifficultyRating(e.target.value)} type='text' >
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
                <option value='9'>9</option>
                <option value='10'>10</option>

              </select>
            </div>
          </div>
          <div className={classes.inputContainer}>
            <label>Comments</label>
            <textarea value={comments} onChange={(e) => setComments(e.target.value)} />
          </div>
          <div className={classes.inputContainer}>
            <Button as='button' type='submit'>Submit</Button>
          </div>
        </form>
      </div>
  )
}

export default ActivityForm
