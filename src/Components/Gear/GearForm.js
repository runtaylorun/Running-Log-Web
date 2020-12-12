import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'
import { getCurrentDate } from '../../Lib/time'
import { createNewGear } from '../../Services/gear'
import classes from './gear.module.css'

const GearForm = ({ gearId }) => {
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [colorway, setColorway] = useState('')
  const [miles, setMiles] = useState(0)
  const [maxMiles, setMaxMiles] = useState(0)

  useEffect(() => {
    const getGear = async () => {

    }

    if (gearId) {
      // get gear from API if editing existing gear
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const gearToCreate = {
      brand,
      model,
      colorway,
      miles,
      maxMiles,
      dateAdded: getCurrentDate()
    }

    try {
      await createNewGear(sessionStorage.getItem('id'), gearToCreate)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={classes.pageContainer}>
      <div className={classes.gearFormPageHeader}>
        <h1>Gear Form</h1>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className={classes.form}>
        <div className={classes.formRow1}>
          <div className={classes.inputContainer}>
            <label>Brand</label>
            <input value={brand} onChange={(e) => setBrand(e.target.value)} type='text'/>
          </div>
          <div className={classes.inputContainer}>
            <label>Model</label>
            <input value={model} onChange={(e) => setModel(e.target.value)} type='text'/>

          </div>
        </div>
        <div className={classes.formRow2}>
          <div className={classes.inputContainer}>
            <label>Colorway</label>
            <input value={colorway} onChange={(e) => setColorway(e.target.value)} type='text'/>

          </div>
          <div className={classes.inputContainer}>
            <label>Miles</label>
            <input value={miles} onChange={(e) => setMiles(e.target.value)} type='text'/>
          </div>
        </div>
        <div className={classes.formRow3}>
          <div className={classes.inputContainer}>
            <label>Max Miles</label>
            <input value={maxMiles} onChange={(e) => setMaxMiles(e.target.value)} type='text'/>
          </div>
        </div>
        <div style={{ marginTop: 20 }} className={classes.formButtons}>
          <Button style={{ color: 'white', backgroundColor: '#1F6FDD' }} as='button' type='submit'>Submit</Button>
          <Button style={{ color: 'white', backgroundColor: '#1F6FDD' }} as='button' type='reset'>Reset</Button>
        </div>
      </form>
    </div>
  )
}

GearForm.propTypes = {
  gearId: PropTypes.number
}

export default GearForm
