import React, { useState, useEffect } from 'react'
import { Button } from 'semantic-ui-react'
import classes from '../../CSS/Gear/Gear.module.css'

const GearForm = ({ gearId }) => {
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [colorway, setColorway] = useState('')
  const [miles, setMiles] = useState(0)

  useEffect(() => {
    const getGear = async () => {

    }

    if (gearId) {
      // get gear from API
    }
  })

  return (
    <div className={classes.pageContainer}>
      <div className={classes.pageHeader}>
        <h1>Gear Form</h1>
      </div>
      <form className={classes.form}>
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
        <div style={{ marginTop: 20 }} className={classes.formButtons}>
          <Button style={{ color: 'white', backgroundColor: '#1F6FDD' }} as='button' type='submit'>Submit</Button>
          <Button style={{ color: 'white', backgroundColor: '#1F6FDD' }} as='button' type='reset'>Reset</Button>
        </div>
      </form>
    </div>
  )
}

export default GearForm
