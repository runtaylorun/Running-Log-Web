import React from 'react'
import classes from './dashboard.module.css'

const OffDaySummary = () => {
  return (
        <div className={classes.offDayContainer}>
            <h2 style={{ fontWeight: 400 }}>Off Day Summary</h2>
            <p>Days since last off day</p>
            <h1>12</h1>
        </div>
  )
}

export default OffDaySummary
