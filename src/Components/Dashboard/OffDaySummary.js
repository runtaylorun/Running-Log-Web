import React from 'react'
import classes from './dashboard.module.css'

import Moment from 'moment'

const OffDaySummary = ({offDay}) => {

  const calculateOffDay = () => {
    const currentDate = Moment()
    const diffInDays = currentDate.diff(offDay?.date, 'days')

    return diffInDays
  }
  return (
        <div className={classes.offDayContainer}>
            <h2 style={{ fontWeight: 400 }}>Off Day Summary</h2>
            <p>Days since last off day</p>
            <h1>{calculateOffDay()}</h1>
        </div>
  )
}

export default OffDaySummary
