import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Redirect, useParams } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { getCurrentDate, formatDateYYMMDD } from '../../Lib/time'
import { useForm } from 'react-hook-form'
import { postGear, getGearById, updateGear } from '../../Services/gear'
import classes from './gear.module.css'

const GearForm = () => {
  const { gearId = 0 } = useParams()
  const [gearDateAdded, setGearDateAdded] = useState(formatDateYYMMDD(getCurrentDate()))
  const [formSubmitted, setFormSubmitted] = useState(false)

  const errorStyle = { color: 'red' }

  const defaultValues = {
    id: gearId,
    brand: '',
    model: '',
    colorway: '',
    miles: 0,
    maxMiles: 0,
    dateAdded: gearDateAdded
  }

  console.log(gearId)
  const { register, handleSubmit, errors, reset } = useForm({ defaultValues })

  const textValidation = {
    required: 'Field required',
    pattern: {
      value: /^[a-zA-Z0-9äöüÄÖÜ ]*$/,
      message: 'Field cannot contain special characters'
    },
    maxLength: {
      value: 75,
      message: 'Field must be less than 75 characters'
    }
  }

  const numberValidation = {
    required: 'Field required',
    min: {
      value: 0,
      message: 'Field must be at least 0'
    },
    max: {
      value: 50000,
      message: 'Field must be less than 50000'
    }
  }

  useEffect(() => {
    const loadGear = async () => {
      try {
        const gearResponse = await getGearById(gearId)
        console.log(gearResponse)
        const formData = { ...gearResponse?.data[0] }

        if (formData?.id) {
          setGearDateAdded(formData?.dateAdded)
          reset(formData)
        }
      } catch (error) {
        console.log('Error fetching gear', error)
      }
    }
    loadGear()
  }, [])

  const onSubmit = async (data) => {
    const gearToCreate = {
      id: parseInt(gearId),
      brand: data?.brand ?? '',
      model: data?.model ?? '',
      colorway: data?.colorway ?? '',
      miles: data?.miles ?? 0,
      maxMiles: data?.maxMiles ?? 0,
      dateAdded: data?.dateAdded ?? formatDateYYMMDD(getCurrentDate())
    }

    try {
      const result = gearToCreate.id === 0 ? await postGear(gearToCreate) : await updateGear(gearToCreate)

      if (result) {
        setFormSubmitted(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    formSubmitted
      ? <Redirect to='/gear' />
      : <div className={classes.pageContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <div className={classes.formRow1}>
          <div className={classes.inputContainer}>
            <label>Brand</label>
            <input ref={register(textValidation)} name='brand' type='text' />
            <p style={errorStyle}>{errors?.brand?.message}</p>
          </div>
          <div className={classes.inputContainer}>
            <label>Model</label>
            <input ref={register(textValidation)} name='model' type='text' />
            <p style={errorStyle}>{errors?.model?.message}</p>
          </div>
        </div>
        <div className={classes.formRow2}>
          <div className={classes.inputContainer}>
            <label>Colorway</label>
            <input ref={register(textValidation)} name='colorway' type='text' />
            <p style={errorStyle}>{errors?.colorway?.message}</p>
          </div>
          <div className={classes.inputContainer}>
            <label>Miles</label>
            <input ref={register(numberValidation)} name='miles' type='text' />
            <p style={errorStyle}>{errors?.miles?.message}</p>
          </div>
        </div>
        <div className={classes.formRow3}>
          <div className={classes.inputContainer}>
            <label>Max Miles</label>
            <input ref={register(numberValidation)} name='maxMiles' type='text' />
            <p style={errorStyle}>{errors?.maxMiles?.message}</p>
          </div>
        </div>
        <div style={{ marginTop: 20 }} className={classes.formButtons}>
          <Button style={{ color: 'white', backgroundColor: '#1F6FDD' }} as='button' type='submit'>Submit</Button>
          <Button style={{ color: 'white', backgroundColor: '#1F6FDD' }} as='button' type='button' onClick={() => reset(defaultValues)}>Clear</Button>
        </div>
      </form>
        </div>
  )
}

GearForm.propTypes = {
  gearId: PropTypes.number
}

export default GearForm
