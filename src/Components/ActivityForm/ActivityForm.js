import React, { useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { createActivity, getActivity, updateActivity } from '../../Services/activities'
import { getGear } from '../../Services/gear'
import { calculatePacePerMile, calculatePacePerKilometer } from '../../Lib/pace'
import { formatDateYYMMDD } from '../../Lib/time'
import { useForm } from 'react-hook-form'
import classes from './activityForm.module.css'

const ActivityForm = () => {
  const { day, month, year, activityId = 0 } = useParams()
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [gear, setGear] = useState([])
  const [pacePerMile, setPacePerMile] = useState('')
  const [pacePerKm, setPacePerKm] = useState('')

  const { register, handleSubmit, watch, errors, reset } = useForm({
    defaultValues: {
      id: 0,
      distance: 0,
      title: '',
      date: `${month}-${day}-${year}`,
      elapsedTime: '',
      comments: '',
      difficultyRating: 1,
      distanceUnit: 'Mi',
      type: 1,
      gearId: null
    }
  })

  const watchTime = watch('elapsedTime', '00:00:00')
  const watchDistance = watch('distance', 0)
  const watchDistanceUnit = watch('distanceUnit', 'Mi')

  useEffect(() => {
    const loadActivity = async () => {
      try {
        const activityResponse = await getActivity(activityId)
        let formData
        formData = { ...activityResponse?.data[0] }

        if (!formData.date) {
          formData = { ...formData, date: `${month}-${day}-${year}`, distance: 0 }
        }

        reset(formData)
      } catch (error) {
        console.log('Error getting activity for activity form', error)
      }
    }

    const loadGear = async () => {
      try {
        const gearResponse = await getGear()

        setGear(gearResponse?.data)
      } catch (error) {
        console.log('Error getting gear for activity form')
      }
    }

    loadGear()
    loadActivity()
  }, [])

  const onSubmit = async (data) => {
    const activityToSubmit = {
      activityId: activityId ?? 0,
      title: data.title,
      type: parseInt(data.type, 10),
      distanceUnit: data.distanceUnit,
      distance: parseInt(data.distance),
      date: formatDateYYMMDD(data.date),
      elapsedTime: data.elapsedTime,
      comments: data.comments,
      gearId: parseInt(data.gearId, 10),
      difficultyRating: parseInt(data.difficultyRating, 10)
    }

    activityId ? await updateActivity(activityToSubmit) : await createActivity(activityToSubmit)
    setFormSubmitted(true)
  }

  const updatePace = () => {
    setPacePerMile(calculatePacePerMile(watchTime, watchDistance, watchDistanceUnit))
    setPacePerKm(calculatePacePerKilometer(watchTime, watchDistance, watchDistanceUnit))
  }

  const resetForm = () => {
    reset()
    setPacePerKm('')
    setPacePerMile('')
  }

  return (
    formSubmitted
      ? <Redirect to='/calendar' />
      : <div className={classes.pageContainer}>
        <div className={classes.pageHeader}>
          <h1>Activity Form</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <div className={classes.formRow1}>
            <div className={classes.inputContainer}>
              <label>Activity Title</label>
              <input name='title' className={classes.textbox} ref={register} />
            </div>
            <div className={classes.inputContainer}>
              <label>Type</label>
              <select ref={register} name='type'>
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
              <input onChange={updatePace} className={classes.textbox} name='distance' ref={register} />
            </div>
            <div className={classes.inputContainer}>
              <label>Distance Unit</label>
              <select ref={register} name='distanceUnit'>
                <option value='Mi'>Mi</option>
                <option value='Km'>Km</option>
              </select>
            </div>
          </div>
          <div className={classes.formRow3}>
            <div className={classes.inputContainer}>
              <label>Date</label>
              <input className={classes.textbox} name='date' ref={register} />
            </div>
            <div className={classes.inputContainer}>
              <label>Elapsed Time</label>
              <input onChange={updatePace} placeholder="hh:mm:ss" className={classes.textbox} ref={register} name='elapsedTime' />
            </div>
          </div>
          <div className={classes.formRow4}>
            <div className={classes.inputContainer}>
              <label>Pace per Mi</label>
              <input className={classes.textbox} readOnly value={pacePerMile}></input>
              <label>Pace per Km</label>
              <input className={classes.textbox} readOnly value={pacePerKm}></input>
            </div>
            <div className={classes.inputContainer}>
              <label>Difficulty Rating</label>
              <select name='difficultyRating' ref={register} >
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
              <label>Gear</label>
              <select defaultValue={0} name='gearId' ref={register}>
                <option value={0}></option>
                {gear.map((gear) => <option key={gear.id} value={gear.id}>{`${gear.brand} ${gear.model}`}</option>)}
              </select>
            </div>
          </div>
          <div className={classes.formRow5}>
            <div className={classes.inputContainer}>
              <label>Comments</label>
              <textarea rows={5} style={{ resize: 'none' }} name='comments' ref={register} />
            </div>
          </div>
          <div style={{ marginTop: 20 }} className={classes.formButtons}>
            <button className={classes.button} type='submit'>Submit</button>
            <button onClick={resetForm} className={classes.button}>Reset</button>
          </div>
        </form>
      </div>
  )
}

export default ActivityForm
