import React from 'react'
import classes from '../../CSS/Dashboard/Dashboard.module.css'

const Day = ({ day }) => {
  return (
    <div className={classes.day}>
      <h3>{day}</h3>
    </div>
  )
}

export default Day
