import React, { useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { postActivity, getActivity, putActivity } from '../../Services/activities'
import { getGear } from '../../Services/gear'
import { calculatePacePerMile, calculatePacePerKilometer } from '../../Lib/pace'
import { getCurrentDate, formatDateMMDD, formatDateYYMMDD } from '../../Lib/time'
import { useForm } from 'react-hook-form'
import classes from './activityForm.module.css'

const ActivityForm = () => {
  const { activityId = 0 } = useParams()
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [gear, setGear] = useState([])
  const [pacePerMile, setPacePerMile] = useState('')
  const [pacePerKm, setPacePerKm] = useState('')
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [type, setType] = useState(1)

  const NO_WORKOUT = '5'

  const defaultValues = {
    id: activityId,
    distance: '0',
    title: '',
    date: formatDateMMDD(getCurrentDate()),
    comments: '',
    difficultyRating: '1',
    distanceUnit: 'Mi',
    gearId: '0'
  }

  const distanceValidation = {
    required: 'Distance is required',
    min: {
      value: 0,
      message: 'Distance must be at least 0'
    },
    max: {
      value: 1000,
      message: 'Distance must be less than 1000'
    }
  }

  const titleValidation = {
    pattern: {
      value: /^[a-zA-Z0-9äöüÄÖÜ ]*$/,
      message: 'Title cannot contain special characters'
    },
    maxLength: {
      value: 75,
      message: 'Title must be less than 75 characters'
    }
  }

  const dateValidation = {
    required: 'Date is required',
    pattern: {
      value: /(0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])[-]((?:19|20)\d\d)/,
      message: 'Date must be formatted as MM-DD-YYYY'
    }
  }

  const commentsValidation = {
    pattern: {
      value: /^[a-zA-Z0-9äöüÄÖÜ]*$/,
      message: 'Comments cannot contain special characters'
    },
    maxLength: {
      value: 300,
      message: 'Comments must be less than 300 characters'
    }
  }

  const { register, handleSubmit, watch, errors, reset } = useForm({ defaultValues })

  const watchDistance = watch('distance', 0)
  const watchDistanceUnit = watch('distanceUnit', 'Mi')

  useEffect(() => {
    if (type === NO_WORKOUT) {
      reset(defaultValues)
    }
  }, [type])

  useEffect(() => {
    updatePace()
  }, [hours, minutes, seconds])

  useEffect(() => {
    const loadActivity = async () => {
      try {
        const activityResponse = await getActivity(activityId)
        let formData
        formData = { ...activityResponse?.data[0] }

        if (!formData.date) {
          formData = { ...formData, date: formatDateYYMMDD(getCurrentDate()), distance: 0 }
        }

        if (formData?.id) {
          reset(formData)
        }

        setHours(formData?.hours)
        setMinutes(formData?.minutes)
        setSeconds(formData?.seconds)
        setType(1)
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
      id: parseInt(activityId) ?? 0,
      title: data.title ?? '',
      type: parseInt(type ?? 1),
      distanceUnit: data?.distanceUnit ?? 'Mi',
      distance: parseInt(data?.distance ?? 0),
      date: formatDateYYMMDD(data.date),
      hours: parseInt(hours ?? 0),
      minutes: parseInt(minutes ?? 0),
      seconds: parseInt(seconds ?? 0),
      comments: data.comments ?? '',
      gearId: parseInt(data.gearId ?? 0),
      difficultyRating: parseInt(data.difficultyRating ?? 1)
    }

    activityToSubmit.id !== 0 ? await putActivity(activityToSubmit) : await postActivity(activityToSubmit)
    setFormSubmitted(true)
  }

  const updatePace = () => {
    setPacePerMile(calculatePacePerMile(hours, minutes, seconds, watchDistance, watchDistanceUnit))
    setPacePerKm(calculatePacePerKilometer(hours, minutes, seconds, watchDistance, watchDistanceUnit))
  }

  const resetHandler = () => {
    setType(1)
    setPacePerKm('')
    setPacePerMile('')
    reset(defaultValues)
  }

  const generateTimeOptions = () => {
    const nums = []
    for (let i = 0; i < 60; i++) {
      nums.push(i)
    }

    return nums.map(num => <option key={num} value={num}>{num}</option>)
  }

  const errorColor = { color: 'red' }

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
              <input name='title' className={classes.textbox} ref={register(titleValidation)} />
              <p style={errorColor}>{errors?.title?.message}</p>
            </div>
            <div className={classes.inputContainer}>
              <label>Type</label>
              <select onChange={(e) => { setType(e.target.value); setPacePerMile(''); setPacePerKm('') }} value={type} name='type'>
                <option value='1'>Running</option>
                <option value='2'>Walking</option>
                <option value='3'>Biking</option>
                <option value='4'>Swimming</option>
                <option value='5'>No Workout</option>
              </select>
            </div>
          </div>
          <div className={classes.formRow2}>
            <div className={classes.inputContainer}>
              <label>Distance</label>
              <input disabled={type === NO_WORKOUT} onChange={updatePace} className={classes.textbox} name='distance' ref={register(distanceValidation)} />
              <p style={errorColor}>{errors?.distance?.message}</p>

            </div>
            <div className={classes.inputContainer}>
              <label>Distance Unit</label>
              <select disabled={type === NO_WORKOUT} ref={register} name='distanceUnit'>
                <option value='Mi'>Mi</option>
                <option value='Km'>Km</option>
              </select>
            </div>
          </div>
          <div className={classes.formRow3}>
            <div className={classes.inputContainer}>
              <label>Date</label>
              <input placeholder='YYYY-MM-DD' className={classes.textbox} name='date' ref={register(dateValidation)} />
              <p style={errorColor}>{errors?.date?.message}</p>
            </div>
            <div className={classes.inputContainer}>
              <label>Hours - Minutes - Seconds</label>
              <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <select defaultValue={0} onChange={(e) => setHours(e.target.value)} disabled={type === NO_WORKOUT} value={hours} name='hours'>
                  {generateTimeOptions().map(option => option)}
                </select>
                <select defaultValue={0} onChange={(e) => setMinutes(e.target.value)} value={minutes} disabled={type === NO_WORKOUT} name='minutes'>
                  {generateTimeOptions().map(option => option)}
                </select>
                <select defaultValue={0} onChange={(e) => setSeconds(e.target.value)} value={seconds} disabled={type === NO_WORKOUT} name='seconds'>
                  {generateTimeOptions().map(option => option)}
                </select>
              </div>
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
              <select disabled={type === NO_WORKOUT} name='difficultyRating' ref={register} >
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
              <select disabled={type === NO_WORKOUT} defaultValue={0} name='gearId' ref={register}>
                <option value={0}></option>
                {gear.map((gear) => <option key={gear.id} value={gear.id}>{`${gear.brand} ${gear.model}`}</option>)}
              </select>
            </div>
          </div>
          <div className={classes.formRow5}>
            <div className={classes.inputContainer}>
              <label>Comments</label>
              <textarea rows={5} style={{ resize: 'none' }} name='comments' ref={register(commentsValidation)} />
              <p style={errorColor}>{errors?.comments?.message}</p>
            </div>
          </div>
          <div style={{ marginTop: 20 }} className={classes.formButtons}>
            <button className={classes.button} type='submit'>Submit</button>
            <button onClick={resetHandler} type='button' className={classes.button}>Reset</button>
          </div>
        </form>
      </div>
  )
}

export default ActivityForm
